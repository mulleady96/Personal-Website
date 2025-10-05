import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from "@angular/router";
import { loadStripe } from "@stripe/stripe-js";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment.prod";

@Injectable({
  providedIn: "root",
})
export class PaymentSuccessGuard implements CanActivate {
  constructor(private router: Router) {} // Inject the Router service

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean> | Promise<boolean> | boolean {
    // Get the sessionId from the route params
    const sessionId = next.queryParams["session_id"];

    // Check if sessionId exists, if not redirect to home page.
    if (!sessionId) {
      this.router.navigate(["/"]);
      return false;
    }

    // Call the checkPaymentSuccess method and return the result
    return new Observable<boolean>((observer) => {
      this.checkPaymentSuccess(sessionId).then((paymentSuccessful: boolean) => {
        if (paymentSuccessful) {
          observer.next(true);
        } else {
          this.router.navigate(["/"]);
          observer.next(false);
        }
        observer.complete();
      });
    });
  }

  // Implement your logic to check payment success.
  async checkPaymentSuccess(sessionId: string): Promise<boolean> {
    // Replace this with your actual payment success check logic.
    // This could involve checking local storage, a service, etc.
    // Make a call to stripe to check the session status and make sure the payment was completed

    const stripe = await loadStripe(environment.stripe.publishable_key);
    const session = await stripe?.retrieveOrder(sessionId);

    if (session?.order?.payment.status === "succeeded") {
      return true;
    } else {
      return false;
    }
  }
}
