import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { loadStripe } from "@stripe/stripe-js";
import { environment } from "src/environments/environment.prod";

export const paymentSuccessGuard: CanActivateFn = async (route, state) => {
  const router = inject(Router);
  const sessionId = route.queryParams["session_id"];

  // Check if sessionId exists, if not redirect to home page.
  if (!sessionId) {
    await router.navigate(["/"]);
    return false;
  }

  // Call the checkPaymentSuccess method and return the result
  return checkPaymentSuccess(sessionId, router);
};

// Implement your logic to check payment success.
async function checkPaymentSuccess(sessionId: string, router: Router): Promise<boolean> {
  // Replace this with your actual payment success check logic.
  // This could involve checking local storage, a service, etc.
  // Make a call to stripe to check the session status and make sure the payment was completed

  const stripe = await loadStripe(environment.stripe.publishable_key);
  // @ts-ignore - retrieveOrder might be missing from types or custom
  const session = await stripe?.retrieveOrder(sessionId);

  if (session?.order?.payment.status === "succeeded") {
    return true;
  } else {
    await router.navigate(["/"]);
    return false;
  }
}
