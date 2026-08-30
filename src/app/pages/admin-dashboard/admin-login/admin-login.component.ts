import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { Router } from "@angular/router";
import { AuthService } from "../../../Services/auth.service";
import { MatSnackBar, MatSnackBarModule } from "@angular/material/snack-bar";
import { Functions, httpsCallable } from "@angular/fire/functions";

@Component({
  selector: "app-admin-login",
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
  ],
  template: `
    <div class="login-container">
      <mat-card class="login-card">
        <mat-card-header>
          <mat-card-title>Admin Login</mat-card-title>
          <mat-card-subtitle>Restricted Access</mat-card-subtitle>
        </mat-card-header>
        <mat-card-content>
          <p>Please sign in with your authorized Google account to continue.</p>
        </mat-card-content>
        <mat-card-actions align="end">
          <button mat-raised-button color="primary" (click)="login()">
            <mat-icon>login</mat-icon> Sign in with Google
          </button>
        </mat-card-actions>
      </mat-card>
    </div>
  `,
  styles: [
    `
      .login-container {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 80vh;
        background-color: transparent;
      }
      .login-card {
        max-width: 400px;
        width: 100%;
        padding: 20px;
      }
      mat-card-content {
        padding: 20px 0;
      }
    `,
  ],
})
export class AdminLoginComponent {
  authService = inject(AuthService);
  router = inject(Router);
  snackBar = inject(MatSnackBar);
  functions = inject(Functions);

  login() {
    this.authService
      .loginWithGoogle()
      .then(async (user) => {
        if (user) {
          // Call the Cloud Function to assign custom claims securely
          const checkAdminFn = httpsCallable(
            this.functions,
            "checkAndSetAdmin",
          );
          try {
            await checkAdminFn();

            // Force refresh the user ID token to fetch the newly assigned claims
            await user.getIdToken(true);

            const isAdmin = await this.authService.checkIfAdmin(user);
            if (isAdmin) {
              this.router.navigate(["/admin"]);
            } else {
              this.snackBar.open(
                "Access Denied: Uncleared Email Address",
                "Close",
                {
                  duration: 3000,
                },
              );
              this.authService.signOut();
            }
          } catch (fnError) {
            console.error("Function verification failed", fnError);
            this.snackBar.open("Access Denied: Verification failed", "Close", {
              duration: 3000,
            });
            this.authService.signOut();
          }
        } else {
          this.snackBar.open("Login failed. No user found.", "Close", {
            duration: 3000,
          });
        }
      })
      .catch((error) => {
        console.error("Login failed", error);
        this.snackBar.open("Login failed. Please try again.", "Close", {
          duration: 3000,
        });
      });
  }
}
