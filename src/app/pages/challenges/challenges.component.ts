import { Component, inject, signal, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { GravitaService } from "../../Services/gravita.service";
import { LoginService } from "../../Services/login.service";
import { ChallengeService } from "../../Services/challenge.service";
import { MatSnackBar, MatSnackBarModule } from "@angular/material/snack-bar";

@Component({
  selector: "app-challenges",
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
  ],
  template: `
    <div class="challenges-container text-center">
      <h1>Daily Challenges</h1>
      <p class="subtitle">Complete these tasks to earn rewards points!</p>

      @if (!loginService.snapUser()) {
        <mat-card class="login-warning">
          <mat-card-content
            class="flex-center"
            style="flex-direction: column; text-align: center;"
          >
            <mat-icon color="accent">lock</mat-icon>
            <p>
              Please log in with Snapchat to view and track your challenges.
            </p>
          </mat-card-content>
        </mat-card>
      } @else {
        <div class="challenges-grid">
          @for (challenge of challenges(); track challenge.id) {
            <mat-card class="challenge-card">
              <mat-card-header>
                <div
                  mat-card-avatar
                  style="position: relative; width: 44px; height: 44px; overflow: visible;"
                >
                  <mat-progress-spinner
                    mode="determinate"
                    [value]="isCompleted(challenge) ? 100 : 0"
                    color="accent"
                    diameter="48"
                    style="position: absolute; top: -2px; left: -2px; z-index: 1;"
                  ></mat-progress-spinner>
                  <div
                    class="challenge-icon flex-center"
                    style="flex-direction: column; width: 44px; height: 44px; position: absolute; top: 0; left: 0; z-index: 2;"
                  >
                    <span
                      style="font-weight: bold; font-size: 0.9rem; line-height: 1;"
                      >+{{ challenge.rewardsPoints }}</span
                    >
                  </div>
                </div>
                <mat-card-title>{{ challenge.title }}</mat-card-title>
              </mat-card-header>
              <mat-card-actions
                style="justify-content: space-between;  padding: 0 16px 16px;"
              >
                <mat-card-subtitle
                  >{{
                    challenge.duration | titlecase
                  }}
                  Challenge</mat-card-subtitle
                >
                @if (isCompleted(challenge)) {
                  <div
                    style="color: #4caf50; display: flex; align-items: center; gap: 5px; font-weight: 500;"
                  >
                    <mat-icon>check_circle</mat-icon> Completed
                  </div>
                } @else {
                  <div
                    style="color: #999; display: flex; align-items: center; gap: 5px;"
                  >
                    <mat-icon>radio_button_unchecked</mat-icon> Incomplete
                  </div>
                }
              </mat-card-actions>
            </mat-card>
          }

          @if (challenges().length === 0) {
            <p>No active challenges at the moment. Check back later!</p>
          }
        </div>
      }
    </div>
  `,
  styles: [
    `
      .challenges-container {
        padding: 40px 20px;
        max-width: 1200px;
        margin: 0 auto;
      }
      h1 {
        font-size: 2.5rem;
        font-weight: bold;
        margin-bottom: 8px;
      }
      .subtitle {
        margin-bottom: 30px;
      }
      .challenges-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 20px;
      }
      .challenge-card {
        display: flex;
        flex-direction: column;
        border-radius: 12px;
        transition: transform 0.2s;
      }
      .challenge-card:hover {
        transform: translateY(-5px);
      }
      .challenge-icon {
        border-radius: 50%;
      }
      .rewards-badge {
        display: inline-block;
        background: #4caf50;
        color: white;
        padding: 4px 12px;
        border-radius: 20px;
        font-weight: bold;
        margin: 15px 0;
      }
      .action-text {
        font-size: 0.9rem;
      }
      .progress-section {
        margin-top: 20px;
      }
      .progress-label {
        display: flex;
        justify-content: space-between;
        font-size: 0.8rem;
        margin-bottom: 5px;
        color: #777;
      }
      .login-warning {
        padding: 40px;
        background: rgba(0, 0, 0, 0.02);
        border-radius: 12px;
      }
      .login-warning mat-icon {
        font-size: 48px;
        width: 48px;
        height: 48px;
        margin-bottom: 15px;
      }
    `,
  ],
})
export class ChallengesComponent implements OnInit {
  gravita = inject(GravitaService);
  loginService = inject(LoginService);
  challengeService = inject(ChallengeService);
  snackBar = inject(MatSnackBar);

  challenges = signal<any[]>([]);

  ngOnInit() {
    this.loadChallenges();
  }

  async loadChallenges() {
    try {
      const data = await this.gravita.getChallenges();
      this.challenges.set(data);
    } catch (e) {
      console.error("Error loading challenges", e);
    }
  }

  isCompleted(challenge: any): boolean {
    return this.challengeService.isChallengeCompleted(challenge);
  }
}
