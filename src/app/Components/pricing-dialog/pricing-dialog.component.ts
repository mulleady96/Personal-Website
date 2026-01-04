
import { Component, inject } from "@angular/core";
import { Functions, httpsCallable } from "@angular/fire/functions";
import { MatBadgeModule } from "@angular/material/badge";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatError } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { loadStripe, Stripe } from "@stripe/stripe-js";
import { environment } from "src/environments/environment";
import { AppMaterialModule } from "src/app/app-material.module";

@Component({
    selector: "app-pricing-dialog",
    imports: [
    MatBadgeModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatError,
    AppMaterialModule
],
    templateUrl: "./pricing-dialog.component.html",
    styleUrls: ["./pricing-dialog.component.css"]
})
export class PricingDialogComponent {
  isLoading = false;
  error: string | null = null;
  private functions: Functions = inject(Functions);
  private stripePromise: Promise<Stripe | null>;

  constructor() {
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
