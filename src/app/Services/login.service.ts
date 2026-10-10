import { Injectable, signal, inject } from "@angular/core";
import { Firestore, doc, getDoc, setDoc, updateDoc } from "@angular/fire/firestore";

export interface SnapUser {
  externalId?: string;
  displayName: string;
  bitmojiUrl: string;
  rewardsPoints?: number;
  dailyChallenges?: any[];
}

@Injectable({
  providedIn: "root",
})
export class LoginService {
  snapUser = signal<SnapUser | null>(null);
  private firestore = inject(Firestore);

  constructor() {
    // Load from local storage if available
    const storedUser = localStorage.getItem('snapUser');
    if (storedUser) {
      this.snapUser.set(JSON.parse(storedUser));
    }
  }

  handleTokenCallback() {
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    const accessToken = params.get("access_token");

    if (accessToken) {
      this.fetchSnapchatUser(accessToken);
      // Clean up the URL
      window.history.replaceState({}, document.title, window.location.pathname);
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
        const bitmojiUrl = result.data.me.bitmoji.avatar;
        
        let rewardsPoints = 50;
        let dailyChallenges: any[] = [];

        // 1. Immediately show the user in the UI (optimistic update)
        this.snapUser.set({
          externalId,
          displayName,
          bitmojiUrl,
          rewardsPoints,
          dailyChallenges
        });

        // 2. Try to sync with Firestore
        try {
          const userDocRef = doc(this.firestore, `users/${externalId}`);
          const userSnapshot = await getDoc(userDocRef);

          if (userSnapshot.exists()) {
            const userData = userSnapshot.data() as SnapUser;
            rewardsPoints = userData.rewardsPoints ?? 0;
            dailyChallenges = userData.dailyChallenges ?? [];
            
            // Update UI with their true existing points
            const updatedUser = {
              externalId,
              displayName,
              bitmojiUrl,
              rewardsPoints,
              dailyChallenges
            };
            this.snapUser.set(updatedUser);
            localStorage.setItem('snapUser', JSON.stringify(updatedUser));
          } else {
            // New user gets 50 welcome points
            await setDoc(userDocRef, {
              externalId,
              displayName,
              bitmojiUrl,
              rewardsPoints,
              dailyChallenges
            });
            
            const newUser = {
              externalId,
              displayName,
              bitmojiUrl,
              rewardsPoints,
              dailyChallenges
            };
            this.snapUser.set(newUser);
            localStorage.setItem('snapUser', JSON.stringify(newUser));
          }
        } catch (dbError) {
          console.error("Error communicating with Firestore (Check your Database Rules!):", dbError);
        }
      }
    } catch (e) {
      console.error("Error fetching snapchat user", e);
    }
  }

  loginWithSnapchat() {
    const publicClientId = "82960528-533c-49a2-a59c-be449a40a3cb";
    // Using exactly the string you whitelisted to ensure it matches perfectly:
    const redirectUri = "http://localhost:4200/";
    const scope =
      "https://auth.snapchat.com/oauth2/api/user.display_name https://auth.snapchat.com/oauth2/api/user.bitmoji.avatar";


    // Notice response_type=token for Implicit Grant Flow
    const authUrl = `https://accounts.snapchat.com/accounts/oauth2/auth?client_id=${publicClientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=token&scope=${encodeURIComponent(scope)}`;
    window.location.href = authUrl;
  }

  logout() {
    this.snapUser.set(null);
    localStorage.removeItem('snapUser');
  }
}
