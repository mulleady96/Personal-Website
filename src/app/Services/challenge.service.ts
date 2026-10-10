import { Injectable, inject } from '@angular/core';
import { LoginService } from './login.service';
import { GravitaService } from './gravita.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Firestore, doc, updateDoc } from "@angular/fire/firestore";

@Injectable({
  providedIn: 'root'
})
export class ChallengeService {
  private loginService = inject(LoginService);
  private gravitaService = inject(GravitaService);
  private snackBar = inject(MatSnackBar);
  private firestore = inject(Firestore);

  isChallengeCompleted(challenge: any): boolean {
    const user = this.loginService.snapUser();
    if (!user || !user.dailyChallenges) return false;

    const record = user.dailyChallenges.find((c: any) => 
      typeof c === 'string' ? c === challenge.id : c.id === challenge.id
    );

    if (!record) return false;
    if (typeof record === 'string') return false; // Legacy string format resets immediately to upgrade

    const diff = Date.now() - record.completedAt;
    
    if (challenge.duration === 'daily') return diff < 24 * 60 * 60 * 1000;
    if (challenge.duration === 'weekly') return diff < 7 * 24 * 60 * 60 * 1000;
    if (challenge.duration === 'monthly') return diff < 30 * 24 * 60 * 60 * 1000;

    return true;
  }

  async completeChallenge(challenge: any) {
    const user = this.loginService.snapUser();
    if (!user || !user.externalId) throw new Error("Not logged in");
    if (this.isChallengeCompleted(challenge)) {
      throw new Error("Already completed within the time limit");
    }

    const newPoints = (user.rewardsPoints ?? 0) + challenge.rewardsPoints;
    
    // Filter out old records of this challenge
    const filteredChallenges = (user.dailyChallenges ?? []).filter((c: any) => 
      typeof c === 'string' ? c !== challenge.id : c.id !== challenge.id
    );
    const newChallengeRecord = { id: challenge.id, completedAt: Date.now() };
    const newChallenges = [...filteredChallenges, newChallengeRecord];

    // Update Firestore
    const userDocRef = doc(this.firestore, `users/${user.externalId}`);
    await updateDoc(userDocRef, {
      rewardsPoints: newPoints,
      dailyChallenges: newChallenges
    });

    // Update Local State
    const updatedUser = { ...user, rewardsPoints: newPoints, dailyChallenges: newChallenges };
    this.loginService.snapUser.set(updatedUser);
    localStorage.setItem('snapUser', JSON.stringify(updatedUser));
  }

  async triggerAction(actionTrigger: string) {
    const user = this.loginService.snapUser();
    if (user) {
      try {
        const challenges = await this.gravitaService.getChallenges();
        const actionChallenge = challenges.find((c: any) => c.actionTrigger === actionTrigger);
        if (actionChallenge && !this.isChallengeCompleted(actionChallenge)) {
          await this.completeChallenge(actionChallenge);
          setTimeout(() => {
            this.snackBar.open(
              `Completed ${actionChallenge.title}! +${actionChallenge.rewardsPoints} Points`, 
              "Awesome!", 
              { duration: 3000 }
            );
          }, 1500); // Wait a tiny bit so previous snackbars can be seen first
        }
      } catch (err) {
        console.error(`Error completing challenge for action ${actionTrigger}`, err);
      }
    }
  }
}
