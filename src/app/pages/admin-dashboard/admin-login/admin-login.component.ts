import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { AuthService } from '../../../Services/auth.service';
import { ADMIN_EMAILS } from '../../../credentials';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule
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
  styles: [`
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
  `]
})
export class AdminLoginComponent {
  authService = inject(AuthService);
  router = inject(Router);
  snackBar = inject(MatSnackBar);

  login() {
    this.authService.loginWithGoogle().then((user) => {
      if (user && user.email && ADMIN_EMAILS.includes(user.email)) {
        this.router.navigate(['/admin']);
      } else {
        this.snackBar.open('Access Denied: Uncleared Email Address', 'Close', {
          duration: 3000,
        });
        if (user) {
           this.authService.signOut();
        }
      }
    }).catch(error => {
      console.error("Login failed", error);
       this.snackBar.open('Login failed. Please try again.', 'Close', {
          duration: 3000,
        });
    });
  }
}
