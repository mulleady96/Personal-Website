import { CommonModule, TitleCasePipe } from "@angular/common";
import {
  Component,
  computed,
  inject,
  OnDestroy,
  OnInit,
  signal,
} from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatSnackBar, MatSnackBarModule } from "@angular/material/snack-bar";
import { MatTabsModule } from "@angular/material/tabs";
import { LoginComponent } from "@Components/login/login.component";
import {
  Challenge,
  ChallengeService,
  Prize,
} from "@Services/challenge.service";
import { GravitaService } from "@Services/gravita.service";
import { LoginService, UserChallengeRecord } from "@Services/login.service";

export interface UserTier {
  name: string;
  icon: string;
  badgeClass: string;
}

@Component({
  selector: "app-challenges",
  standalone: true,
  imports: [
    CommonModule,
    TitleCasePipe,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatTabsModule,
    LoginComponent,
  ],
  templateUrl: "./challenges.component.html",
  styleUrls: ["./challenges.component.scss"],
})
export class ChallengesComponent implements OnInit, OnDestroy {
  gravita = inject(GravitaService);
  loginService = inject(LoginService);
  challengeService = inject(ChallengeService);
  snackBar = inject(MatSnackBar);

  challenges = signal<Challenge[]>([]);
  prizes = computed<Prize[]>(() => this.challengeService.prizes());
  currentTime = signal<number>(Date.now());
  activeTabIndex = signal<number>(0);

  currentPoints = computed<number>(
    () => this.loginService.currentUser()?.rewardsPoints ?? 0,
  );

  activeChallengesCount = computed<number>(
    () =>
      this.challenges().filter((c: Challenge) => !this.isCompleted(c)).length,
  );

  unlockedPrizesCount = computed<number>(() => {
    const pts = this.currentPoints();
    return this.prizes().filter((p: Prize) => pts >= p.pointsRequired).length;
  });

  nextPrize = computed<Prize | null>(() => {
    const pts = this.currentPoints();
    const locked = this.prizes().filter((p: Prize) => pts < p.pointsRequired);
    if (locked.length === 0) return null;
    return locked.reduce(
      (min: Prize, curr: Prize) =>
        curr.pointsRequired < min.pointsRequired ? curr : min,
      locked[0],
    );
  });

  nextPrizeProgress = computed<number>(() => {
    const next = this.nextPrize();
    if (!next || next.pointsRequired <= 0) return 100;
    return Math.min(
      100,
      Math.round((this.currentPoints() / next.pointsRequired) * 100),
    );
  });

  userTier = computed<UserTier>(() => {
    const pts = this.currentPoints();
    if (pts < 250) {
      return {
        name: "Bronze Explorer",
        icon: "stars",
        badgeClass: "tier-bronze",
      };
    } else if (pts < 750) {
      return {
        name: "Silver Challenger",
        icon: "shield",
        badgeClass: "tier-silver",
      };
    } else if (pts < 1500) {
      return {
        name: "Gold Champion",
        icon: "workspace_premium",
        badgeClass: "tier-gold",
      };
    } else {
      return {
        name: "Platinum Legend",
        icon: "diamond",
        badgeClass: "tier-platinum",
      };
    }
  });

  private timer: ReturnType<typeof setInterval> | undefined;

  ngOnInit() {
    this.loadChallenges();
    this.timer = setInterval(() => {
      this.currentTime.set(Date.now());
    }, 1000);
  }

  ngOnDestroy() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  async loadChallenges() {
    try {
      const data = await this.challengeService.loadChallenges();
      this.challenges.set(data);
    } catch (e) {
      console.error("Error loading challenges", e);
    }
  }

  selectTab(index: number) {
    this.activeTabIndex.set(index);
  }

  getRewardProgress(prize: Prize): number {
    if (prize.pointsRequired <= 0) return 100;
    return Math.min(
      100,
      Math.round((this.currentPoints() / prize.pointsRequired) * 100),
    );
  }

  getPointsNeeded(prize: Prize): number {
    return Math.max(0, prize.pointsRequired - this.currentPoints());
  }

  isUnlocked(prize: Prize): boolean {
    return this.currentPoints() >= prize.pointsRequired;
  }

  isClaimed(prize: Prize): boolean {
    return this.challengeService.isPrizeClaimed(prize.id);
  }

  async claimPrize(prize: Prize): Promise<void> {
    await this.challengeService.claimPrize(prize);
  }

  isCompleted(challenge: Challenge): boolean {
    return this.challengeService.isChallengeCompleted(challenge);
  }

  getTimeRemaining(challenge: Challenge): string | null {
    const user = this.loginService.currentUser();
    if (!user || !user.dailyChallenges) return null;

    const record = user.dailyChallenges.find(
      (c: UserChallengeRecord | string) =>
        typeof c === "string" ? c === challenge.id : c.id === challenge.id,
    );

    if (!record || typeof record === "string") return null;

    let durationMs = 0;
    if (challenge.duration === "daily") durationMs = 24 * 60 * 60 * 1000;
    else if (challenge.duration === "weekly")
      durationMs = 7 * 24 * 60 * 60 * 1000;
    else if (challenge.duration === "monthly")
      durationMs = 30 * 24 * 60 * 60 * 1000;

    const expiryTime = record.completedAt + durationMs;
    const diff = expiryTime - this.currentTime();

    if (diff <= 0) return null;

    const h = Math.floor(diff / (1000 * 60 * 60));
    const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((diff % (1000 * 60)) / 1000);

    return `${h}h ${m}m ${s}s`;
  }
}
