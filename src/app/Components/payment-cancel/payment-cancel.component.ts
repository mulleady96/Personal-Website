
import { Component, inject } from "@angular/core";
import { Functions, httpsCallable } from "@angular/fire/functions";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { loadStripe } from "@stripe/stripe-js";
import { environment } from "src/environments/environment";
@Component({
    selector: "app-payment-cancel",
    imports: [
    MatCardModule,
    MatListModule,
    MatIconModule,
    MatButtonModule
],
    templateUrl: "./payment-cancel.component.html",
    styleUrl: "./payment-cancel.component.scss"
})
export class PaymentCancelComponent {
  private functions: Functions = inject(Functions);

  isLoading = false;
  error: string | null = null;

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
