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

 
  return checkPaymentSuccess(sessionId, router);
};

async function checkPaymentSuccess(sessionId: string, router: Router): Promise<boolean> {
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
