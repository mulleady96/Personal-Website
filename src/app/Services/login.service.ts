import { inject, Injectable, signal } from "@angular/core";
import {
  Auth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  User,
} from "@angular/fire/auth";
import { doc, Firestore, getDoc, setDoc } from "@angular/fire/firestore";
import { Router } from "@angular/router";

export interface UserChallengeRecord {
  id: string;
  completedAt: number;
}

export type AuthProviderType = "snapchat" | "google";

export interface AppUser {
  provider: AuthProviderType;
  externalId?: string;
  displayName?: string;
  email?: string;
  photoUrl: string;
  bitmojiUrl?: string;
  rewardsPoints?: number;
  dailyChallenges?: (UserChallengeRecord | string)[];
  claimedPrizes?: string[];
}

export type SnapUser = AppUser;

@Injectable({
  providedIn: "root",
})
export class LoginService {
  currentUser = signal<AppUser | null>(null);

  // Backward compatibility alias for existing references
  get snapUser() {
    return this.currentUser;
  }

  private firestore = inject(Firestore);
  private auth = inject(Auth);
  private router = inject(Router);

  constructor() {
    // 1. Load from local storage if available
    const storedUser = localStorage.getItem("appUser") || localStorage.getItem("snapUser");
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser) as AppUser;
        if (!parsed.photoUrl && parsed.bitmojiUrl) {
          parsed.photoUrl = parsed.bitmojiUrl;
        }
        if (!parsed.bitmojiUrl && parsed.photoUrl) {
          parsed.bitmojiUrl = parsed.photoUrl;
        }
        if (!parsed.provider) {
          parsed.provider = "snapchat";
        }
        this.currentUser.set(parsed);
      } catch (err) {
        console.error("Error parsing stored user", err);
      }
    }

    // 2. Listen to Firebase Auth state for Google sign-in
    onAuthStateChanged(this.auth, async (fbUser: User | null) => {
      if (fbUser) {
        const current = this.currentUser();
        if (!current || current.provider === "google") {
          await this.syncGoogleUser(fbUser);
        }
      } else {
        if (this.currentUser()?.provider === "google") {
          this.currentUser.set(null);
          localStorage.removeItem("appUser");
        }
      }
    });
  }

  async syncGoogleUser(fbUser: User): Promise<AppUser> {
    const externalId = fbUser.uid;
    const displayName = fbUser.displayName ?? "";
    const email = fbUser.email ?? "";
    const photoUrl = fbUser.photoURL ?? "";

    let rewardsPoints = 50;
    let dailyChallenges: (UserChallengeRecord | string)[] = [];

    const initialUser: AppUser = {
      provider: "google",
      externalId,
      displayName,
      email,
      photoUrl,
      rewardsPoints,
      dailyChallenges,
    };

    if (!this.currentUser()) {
      this.currentUser.set(initialUser);
      localStorage.setItem("appUser", JSON.stringify(initialUser));
    }

    try {
      const userDocRef = doc(this.firestore, `users/${externalId}`);
      const userSnapshot = await getDoc(userDocRef);

      const localClaimed =
        this.currentUser()?.externalId === externalId
          ? (this.currentUser()?.claimedPrizes ?? [])
          : [];

      if (userSnapshot.exists()) {
        const userData = userSnapshot.data() as Partial<AppUser>;
        rewardsPoints = userData.rewardsPoints ?? 0;
        dailyChallenges = userData.dailyChallenges ?? [];
        const claimedPrizes = Array.from(
          new Set([...(userData.claimedPrizes ?? []), ...localClaimed]),
        );

        const updatedUser: AppUser = {
          provider: "google",
          externalId,
          displayName,
          email,
          photoUrl,
          rewardsPoints,
          dailyChallenges,
          claimedPrizes,
        };
        this.currentUser.set(updatedUser);
        localStorage.setItem("appUser", JSON.stringify(updatedUser));
        return updatedUser;
      } else {
        const claimedPrizes = [...localClaimed];
        const newUser: AppUser = {
          ...initialUser,
          claimedPrizes,
        };
        await setDoc(
          userDocRef,
          {
            provider: "google",
            externalId,
            displayName,
            email,
            photoUrl,
            rewardsPoints: 50,
            dailyChallenges: [],
            claimedPrizes,
          },
          { merge: true },
        );
        this.currentUser.set(newUser);
        localStorage.setItem("appUser", JSON.stringify(newUser));
        return newUser;
      }
    } catch (dbError) {
      console.error("Error communicating with Firestore for Google user:", dbError);
      return initialUser;
    }
  }

  async loginWithGoogle(): Promise<AppUser | null> {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(this.auth, provider);
      if (result.user) {
        return await this.syncGoogleUser(result.user);
      }
      return null;
    } catch (error) {
      console.error("Error signing in with Google:", error);
      return null;
    }
  }

  async handleTokenCallback(): Promise<void> {
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    const accessToken = params.get("access_token");

    if (accessToken) {
      // Clean up the URL
      window.history.replaceState({}, document.title, window.location.pathname);
      await this.fetchSnapchatUser(accessToken);

      const redirectUrl = sessionStorage.getItem("postLoginRedirect");
      if (redirectUrl) {
        sessionStorage.removeItem("postLoginRedirect");
        await this.router.navigateByUrl(redirectUrl);
      }
    }
  }

  async fetchSnapchatUser(accessToken: string) {
    try {
      const response = await fetch("https://kit.snapchat.com/v1/me", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          query: "{me{displayName bitmoji{avatar} externalId}}",
        }),
      });
      const result = await response.json();
      if (result.data?.me) {
        const externalId = result.data.me.externalId;
        const displayName = result.data.me.displayName;
        const bitmojiUrl = result.data.me.bitmoji?.avatar || result.data.me.bitmojiUrl || "";

        let rewardsPoints = 50;
        let dailyChallenges: (UserChallengeRecord | string)[] = [];

        // 1. Immediately show the user in the UI (optimistic update)
        const optimisticUser: AppUser = {
          provider: "snapchat",
          externalId,
          displayName,
          photoUrl: bitmojiUrl,
          bitmojiUrl,
          rewardsPoints,
          dailyChallenges,
        };
        this.currentUser.set(optimisticUser);

        // 2. Try to sync with Firestore
        try {
          const userDocRef = doc(this.firestore, `users/${externalId}`);
          const userSnapshot = await getDoc(userDocRef);

          const localClaimed =
            this.currentUser()?.externalId === externalId
              ? (this.currentUser()?.claimedPrizes ?? [])
              : [];

          if (userSnapshot.exists()) {
            const userData = userSnapshot.data() as Partial<AppUser>;
            rewardsPoints = userData.rewardsPoints ?? 0;
            dailyChallenges = userData.dailyChallenges ?? [];
            const claimedPrizes = Array.from(
              new Set([...(userData.claimedPrizes ?? []), ...localClaimed]),
            );
            const resolvedBitmoji = bitmojiUrl || userData.bitmojiUrl || userData.photoUrl || "";

            const updatedUser: AppUser = {
              provider: "snapchat",
              externalId,
              displayName,
              photoUrl: resolvedBitmoji,
              bitmojiUrl: resolvedBitmoji,
              rewardsPoints,
              dailyChallenges,
              claimedPrizes,
            };
            this.currentUser.set(updatedUser);
            localStorage.setItem("appUser", JSON.stringify(updatedUser));
            localStorage.setItem("snapUser", JSON.stringify(updatedUser));
          } else {
            const claimedPrizes = [...localClaimed];
            await setDoc(
              userDocRef,
              {
                provider: "snapchat",
                externalId,
                displayName,
                photoUrl: bitmojiUrl,
                bitmojiUrl,
                rewardsPoints,
                dailyChallenges,
                claimedPrizes,
              },
              { merge: true },
            );

            const newUser: AppUser = {
              provider: "snapchat",
              externalId,
              displayName,
              photoUrl: bitmojiUrl,
              bitmojiUrl,
              rewardsPoints,
              dailyChallenges,
              claimedPrizes,
            };
            this.currentUser.set(newUser);
            localStorage.setItem("appUser", JSON.stringify(newUser));
            localStorage.setItem("snapUser", JSON.stringify(newUser));
          }
        } catch (dbError) {
          console.error("Error communicating with Firestore (Check your Database Rules!):", dbError);
        }
      }
    } catch (e) {
      console.error("Error fetching snapchat user", e);
    }
  }

  loginWithSnapchat(redirectAfterLogin?: string): void {
    if (redirectAfterLogin) {
      sessionStorage.setItem("postLoginRedirect", redirectAfterLogin);
    }
    const publicClientId = "82960528-533c-49a2-a59c-be449a40a3cb";
    const redirectUri = "http://localhost:4200/";
    const scope =
      "https://auth.snapchat.com/oauth2/api/user.display_name https://auth.snapchat.com/oauth2/api/user.bitmoji.avatar";

    const authUrl = `https://accounts.snapchat.com/accounts/oauth2/auth?client_id=${publicClientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=token&scope=${encodeURIComponent(scope)}`;
    window.location.href = authUrl;
  }

  async logout(): Promise<void> {
    try {
      await signOut(this.auth);
    } catch (err) {
      console.error("Error signing out of Firebase Auth:", err);
    }
    this.currentUser.set(null);
    localStorage.removeItem("appUser");
    localStorage.removeItem("snapUser");
  }
}
