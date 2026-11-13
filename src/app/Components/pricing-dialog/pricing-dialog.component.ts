import { Component, effect, inject } from "@angular/core";
import { Functions, httpsCallable } from "@angular/fire/functions";
import { MatBadgeModule } from "@angular/material/badge";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { MatError, MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { Router } from "@angular/router";
import { LoginComponent } from "@Components/login/login.component";
import { environment } from "@environments/environment";
import {
  ChallengeService,
  PHOTO_ALBUM_PRIZE_ID,
} from "@Services/challenge.service";
import { LoginService } from "@Services/login.service";
import { loadStripe } from "@stripe/stripe-js";

@Component({
  selector: "app-pricing-dialog",
  standalone: true,
  imports: [
    MatBadgeModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatError,
    MatDialogModule,
    MatFormFieldModule,
    LoginComponent,
  ],
  templateUrl: "./pricing-dialog.component.html",
  styleUrls: ["./pricing-dialog.component.scss"],
})
export class PricingDialogComponent {
  public loginService = inject(LoginService);
  private challengeService = inject(ChallengeService);
  private functions: Functions = inject(Functions);
  private router = inject(Router);
  private dialogRef = inject(MatDialogRef<PricingDialogComponent>, {
    optional: true,
  });
  private readonly wasLoggedInInitially = Boolean(
    this.loginService.currentUser(),
  );

  isLoading = false;
  error: string | null = null;

  constructor() {
    effect(() => {
      const user = this.loginService.currentUser();
      if (!this.wasLoggedInInitially && user) {
        this.navigateToPaymentSuccess();
      }
    });
  }

  navigateToPaymentSuccess(): void {
    void this.challengeService.markPrizeClaimed(PHOTO_ALBUM_PRIZE_ID);
    this.dialogRef?.close();
    void this.router.navigate(["/payment-success"]);
  }

  async redirectToCheckout(): Promise<void> {
    this.isLoading = true;
    this.error = null;

    // 1. Call our new Firebase Function to create the checkout session
    const createSession = httpsCallable<void, { id: string }>(
      this.functions,
      "createStripeCheckoutSession",
    );
    try {
      const result = await createSession();
      const sessionId = result.data.id;

      // 2. Redirect to Stripe's hosted checkout page
      const stripe = await loadStripe(environment.stripe.publishable_key);
      if (stripe) {
        await stripe.redirectToCheckout({ sessionId });
      }
    } catch (err) {
      console.error(err);
      this.error = "Failed to initiate payment. Please try again.";
    } finally {
      this.isLoading = false;
    }
  }
}
