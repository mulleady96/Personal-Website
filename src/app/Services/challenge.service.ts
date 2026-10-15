import { Injectable, inject, signal, computed } from "@angular/core";
import {
  LoginService,
  UserChallengeRecord,
  AppUser,
} from "@Services/login.service";
import { GravitaService } from "@Services/gravita.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Firestore, doc, updateDoc } from "@angular/fire/firestore";

export interface Challenge {
  id: string;
  title: string;
  duration: "daily" | "weekly" | "monthly" | string;
  rewardsPoints: number;
  actionTrigger?: string;
}

export interface Prize {
  id: string;
  title: string;
  description: string;
  pointsRequired: number;
  icon: string;
  category: "Digital Perk" | "Merch" | "Experience" | "VIP";
  badge?: string;
}

export const DEFAULT_PRIZES: Prize[] = [
  {
    id: "badge-supporter",
    title: "Gravita Supporter Badge",
    description:
      "Unlock an exclusive verified supporter badge on your profile and avatar flair.",
    pointsRequired: 100,
    icon: "verified",
    category: "Digital Perk",
    badge: "Level 1",
  },
  {
    id: "custom-lens-feature",
    title: "Feature Your Company in a lens on Snap",
    description:
      "Collaborate to have your custom card, sound bite, or character featured in a lens on Snap.",
    pointsRequired: 150,
    icon: "sports_esports",
    category: "VIP",
    badge: "Exclusive",
  },
  {
    id: "unlock-premium-photo-collection",
    title: "Unlock Premium Photo Collection",
    description: "Unlock a premium photo collection for use in your own snaps.",
    pointsRequired: 500,
    icon: "loyalty",
    category: "Digital Perk",
    badge: "Physical",
  },
];

@Injectable({
  providedIn: "root",
})
export class ChallengeService {
  private loginService = inject(LoginService);
  private gravitaService = inject(GravitaService);
  private snackBar = inject(MatSnackBar);
  private firestore = inject(Firestore);

  challenges = signal<Challenge[]>([]);
  prizes = signal<Prize[]>(DEFAULT_PRIZES);

  liveChallengesCount = computed<number>(() => {
    const user = this.loginService.snapUser();
    if (!user) return 0;
    return this.challenges().filter(
      (c: Challenge) => !this.isChallengeCompleted(c),
    ).length;
  });

  unlockedPrizesCount = computed<number>(() => {
    const user = this.loginService.currentUser();
    const currentPoints = user?.rewardsPoints ?? 0;
    return this.prizes().filter((p: Prize) => currentPoints >= p.pointsRequired)
      .length;
  });

  constructor() {
    this.loadChallenges();
  }

  async loadChallenges(): Promise<Challenge[]> {
    try {
      const data = await this.gravitaService.getChallenges();
      this.challenges.set(data as Challenge[]);
      return data as Challenge[];
    } catch (e) {
      console.error("Error loading challenges", e);
      return [];
    }
  }

  isChallengeCompleted(challenge: Challenge): boolean {
    const user = this.loginService.snapUser();
    if (!user || !user.dailyChallenges) return false;

    const record = user.dailyChallenges.find(
      (c: UserChallengeRecord | string) =>
        typeof c === "string" ? c === challenge.id : c.id === challenge.id,
    );

    if (!record) return false;
    if (typeof record === "string") return false; // Legacy string format resets immediately to upgrade

    const diff = Date.now() - record.completedAt;
    const duration = challenge.duration?.toLowerCase();

    if (duration === "daily") return diff < 24 * 60 * 60 * 1000;
    if (duration === "weekly") return diff < 7 * 24 * 60 * 60 * 1000;
    if (duration === "monthly") return diff < 30 * 24 * 60 * 60 * 1000;

    return true;
  }

  async completeChallenge(challenge: Challenge) {
    const user = this.loginService.snapUser();
    if (!user || !user.externalId) throw new Error("Not logged in");
    if (this.isChallengeCompleted(challenge)) {
      throw new Error("Already completed within the time limit");
    }

    const newPoints = (user.rewardsPoints ?? 0) + challenge.rewardsPoints;

    // Filter out old records of this challenge
    const filteredChallenges = (user.dailyChallenges ?? []).filter(
      (c: UserChallengeRecord | string) =>
        typeof c === "string" ? c !== challenge.id : c.id !== challenge.id,
    );
    const newChallengeRecord: UserChallengeRecord = {
      id: challenge.id,
      completedAt: Date.now(),
    };
    const newChallenges = [...filteredChallenges, newChallengeRecord];

    // Update Firestore
    const userDocRef = doc(this.firestore, `users/${user.externalId}`);
    await updateDoc(userDocRef, {
      rewardsPoints: newPoints,
      dailyChallenges: newChallenges,
    });

    // Update Local State
    const updatedUser = {
      ...user,
      rewardsPoints: newPoints,
      dailyChallenges: newChallenges,
    };
    this.loginService.currentUser.set(updatedUser);
    localStorage.setItem("appUser", JSON.stringify(updatedUser));
    localStorage.setItem("snapUser", JSON.stringify(updatedUser));
  }

  async triggerAction(actionTrigger: string) {
    const user = this.loginService.snapUser();
    if (user) {
      try {
        const challenges =
          this.challenges().length > 0
            ? this.challenges()
            : await this.loadChallenges();
        const actionChallenge = challenges.find(
          (c: Challenge) => c.actionTrigger === actionTrigger,
        );
        if (actionChallenge && !this.isChallengeCompleted(actionChallenge)) {
          await this.completeChallenge(actionChallenge);
          setTimeout(() => {
            this.snackBar.open(
              `Completed ${actionChallenge.title}! +${actionChallenge.rewardsPoints} Points`,
              "Awesome!",
              { duration: 3000 },
            );
          }, 1500); // Wait a tiny bit so previous snackbars can be seen first
        }
      } catch (err) {
        console.error(
          `Error completing challenge for action ${actionTrigger}`,
          err,
        );
      }
    }
  }

  isPrizeClaimed(prizeId: string): boolean {
    const user = this.loginService.currentUser();
    return !!user?.claimedPrizes?.includes(prizeId);
  }

  async claimPrize(prize: Prize): Promise<boolean> {
    const user = this.loginService.currentUser();
    if (!user || !user.externalId) {
      this.snackBar.open("Please sign in to claim prizes!", "Close", {
        duration: 3000,
      });
      return false;
    }

    const currentPoints = user.rewardsPoints ?? 0;
    if (currentPoints < prize.pointsRequired) {
      this.snackBar.open(
        `You need ${prize.pointsRequired - currentPoints} more points to unlock this reward!`,
        "Got it",
        { duration: 3000 },
      );
      return false;
    }

    const currentClaimed = user.claimedPrizes ?? [];
    if (currentClaimed.includes(prize.id)) {
      this.snackBar.open("You have already claimed this reward!", "Close", {
        duration: 3000,
      });
      return false;
    }

    const newClaimed = [...currentClaimed, prize.id];

    try {
      const userDocRef = doc(this.firestore, `users/${user.externalId}`);
      await updateDoc(userDocRef, {
        claimedPrizes: newClaimed,
      });
    } catch (e) {
      console.warn(
        "Could not sync claimed prize to Firestore, saving locally",
        e,
      );
    }

    const updatedUser: AppUser = {
      ...user,
      claimedPrizes: newClaimed,
    };
    this.loginService.currentUser.set(updatedUser);
    localStorage.setItem("appUser", JSON.stringify(updatedUser));
    localStorage.setItem("snapUser", JSON.stringify(updatedUser));

    this.snackBar.open(
      `🎉 Congratulations! You unlocked "${prize.title}"!`,
      "Awesome!",
      {
        duration: 4000,
      },
    );
    return true;
  }
}
