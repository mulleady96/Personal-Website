import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { environment } from "@environments/environment";
import { LoginService } from "@Services/login.service";
import { loadStripe } from "@stripe/stripe-js";

interface StripeWithRetrieveOrder {
  retrieveOrder?: (
    sessionId: string,
  ) => Promise<{ order?: { payment?: { status?: string } } }>;
}

export const paymentSuccessGuard: CanActivateFn = async (route) => {
  const router = inject(Router);
  const loginService = inject(LoginService);

  if (loginService.currentUser()) {
    return true;
  }

  const sessionId = route.queryParams["session_id"] as string | undefined;

  // Check if sessionId exists, if not redirect to home page.
  if (!sessionId) {
    await router.navigate(["/"]);
    return false;
  }

  return checkPaymentSuccess(sessionId, router);
};

async function checkPaymentSuccess(
  sessionId: string,
  router: Router,
): Promise<boolean> {
  const stripe = (await loadStripe(
    environment.stripe.publishable_key,
  )) as StripeWithRetrieveOrder | null;
  const session = await stripe?.retrieveOrder?.(sessionId);

  if (session?.order?.payment?.status === "succeeded") {
    return true;
  } else {
    await router.navigate(["/"]);
    return false;
  }
}
