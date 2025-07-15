import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { Functions, httpsCallable } from "@angular/fire/functions";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { loadStripe, Stripe } from "@stripe/stripe-js";
import { environment } from "src/environments/environment";
@Component({
  selector: "app-payment-cancel",
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: "./payment-cancel.component.html",
  styleUrl: "./payment-cancel.component.scss",
})
export class PaymentCancelComponent {
  private functions: Functions = inject(Functions);
  private stripePromise: Promise<Stripe | null>;

  isLoading = false;
  error: string | null = null;

  constructor() {
    // Initialize Stripe.js with your publishable key
    this.stripePromise = loadStripe(environment.stripe.publishable_key);
  }

  async redirectToCheckout(): Promise<void> {
    this.isLoading = true;
    this.error = null;

    // 1. Call our new Firebase Function to create the checkout session
    const createSession = httpsCallable(
      this.functions,
      "createStripeCheckoutSession",
    );
    try {
      const result = (await createSession()) as { data: { id: string } };
      const sessionId = result.data.id;

      // 2. Redirect to Stripe's hosted checkout page
      const stripe = await this.stripePromise;
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
