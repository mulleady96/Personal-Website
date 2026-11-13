import { signal } from "@angular/core";
import { TestBed } from "@angular/core/testing";
import { Functions } from "@angular/fire/functions";
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  provideRouter,
  Router,
  RouterStateSnapshot,
} from "@angular/router";
import { paymentSuccessGuard } from "@app/Guards/payment-success.guard";
import { AppUser, LoginService } from "@Services/login.service";
import { beforeEach, describe, expect, it, vi } from "vitest";

class MockLoginService {
  currentUser = signal<AppUser | null>(null);
}

describe("paymentSuccessGuard", () => {
  let loginService: MockLoginService;
  let router: Router;

  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() =>
      paymentSuccessGuard(...guardParameters),
    );

  beforeEach(() => {
    loginService = new MockLoginService();

    TestBed.configureTestingModule({
      providers: [
        provideRouter([]),
        { provide: Functions, useValue: {} },
        { provide: LoginService, useValue: loginService },
      ],
    });

    router = TestBed.inject(Router);
  });

  it("should be created", () => {
    expect(executeGuard).toBeTruthy();
  });

  it("should allow access when a user is signed in without a Stripe session_id", async () => {
    loginService.currentUser.set({
      provider: "google",
      email: "user@example.com",
      photoUrl: "https://example.com/avatar.png",
    });

    const route = { queryParams: {} } as unknown as ActivatedRouteSnapshot;
    const state = { url: "/payment-success" } as RouterStateSnapshot;

    const result = await executeGuard(route, state);
    expect(result).toBe(true);
  });

  it("should redirect to root when logged out and session_id is missing", async () => {
    const navigateSpy = vi.spyOn(router, "navigate").mockResolvedValue(true);

    const route = { queryParams: {} } as unknown as ActivatedRouteSnapshot;
    const state = { url: "/payment-success" } as RouterStateSnapshot;

    const result = await executeGuard(route, state);
    expect(result).toBe(false);
    expect(navigateSpy).toHaveBeenCalledWith(["/"]);
  });
});
