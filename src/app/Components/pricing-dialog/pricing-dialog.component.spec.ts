import { signal } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { Functions } from "@angular/fire/functions";
import { MatDialogRef } from "@angular/material/dialog";
import { provideNoopAnimations } from "@angular/platform-browser/animations";
import { provideRouter, Router } from "@angular/router";
import { PricingDialogComponent } from "@Components/pricing-dialog/pricing-dialog.component";
import {
  ChallengeService,
  DEFAULT_PRIZES,
  PHOTO_ALBUM_PRIZE_ID,
  Prize,
} from "@Services/challenge.service";
import { AppUser, LoginService } from "@Services/login.service";
import { beforeEach, describe, expect, it, vi } from "vitest";

class MockLoginService {
  currentUser = signal<AppUser | null>(null);
  loginWithGoogle = vi.fn().mockResolvedValue(null);
  loginWithSnapchat = vi.fn();
}

class MockChallengeService {
  prizes = signal<Prize[]>(DEFAULT_PRIZES);
  liveChallengesCount = signal<number>(0);
  isPrizeClaimed = vi.fn().mockReturnValue(false);
  markPrizeClaimed = vi.fn().mockResolvedValue(true);
}

describe("PricingDialogComponent", () => {
  let component: PricingDialogComponent;
  let fixture: ComponentFixture<PricingDialogComponent>;
  let loginService: MockLoginService;
  let challengeService: MockChallengeService;
  let dialogRefMock: { close: ReturnType<typeof vi.fn> };
  let router: Router;

  beforeEach(async () => {
    loginService = new MockLoginService();
    challengeService = new MockChallengeService();
    dialogRefMock = { close: vi.fn() };

    await TestBed.configureTestingModule({
      imports: [PricingDialogComponent],
      providers: [
        provideRouter([]),
        provideNoopAnimations(),
        { provide: Functions, useValue: {} },
        { provide: LoginService, useValue: loginService },
        { provide: ChallengeService, useValue: challengeService },
        { provide: MatDialogRef, useValue: dialogRefMock },
      ],
    }).compileComponents();

    router = TestBed.inject(Router);
  });

  it("should create and show 'Sign in to receive the photo album for free' when logged out", () => {
    fixture = TestBed.createComponent(PricingDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;

    expect(component).toBeTruthy();
    expect(compiled.textContent).toContain("€5");
    expect(compiled.textContent).toContain("Buy Now");
    expect(compiled.textContent).toContain(
      "Sign in to receive the photo album for free",
    );
    expect(
      compiled.querySelector('button[aria-label="Sign in with Google"]'),
    ).toBeTruthy();
    expect(
      compiled.querySelector('button[aria-label="Login with Snapchat"]'),
    ).toBeTruthy();
  });

  it("should close the dialog and redirect to /payment-success when user signs in", () => {
    const navigateSpy = vi.spyOn(router, "navigate").mockResolvedValue(true);

    fixture = TestBed.createComponent(PricingDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    loginService.currentUser.set({
      provider: "google",
      externalId: "user-1",
      displayName: "Test User",
      email: "test@example.com",
      photoUrl: "https://example.com/photo.png",
    });
    fixture.detectChanges();

    expect(challengeService.markPrizeClaimed).toHaveBeenCalledWith(
      PHOTO_ALBUM_PRIZE_ID,
    );
    expect(dialogRefMock.close).toHaveBeenCalled();
    expect(navigateSpy).toHaveBeenCalledWith(["/payment-success"]);
  });

  it("should pass /payment-success as postLoginRedirect when clicking Snapchat login", () => {
    fixture = TestBed.createComponent(PricingDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    const snapBtn = (fixture.nativeElement as HTMLElement).querySelector(
      'button[aria-label="Login with Snapchat"]',
    ) as HTMLButtonElement | null;
    expect(snapBtn).toBeTruthy();

    snapBtn?.click();
    expect(loginService.loginWithSnapchat).toHaveBeenCalledWith(
      "/payment-success",
    );
  });

  it("should show Free option and direct to /payment-success when already signed in", () => {
    const navigateSpy = vi.spyOn(router, "navigate").mockResolvedValue(true);

    loginService.currentUser.set({
      provider: "snapchat",
      externalId: "snap-1",
      displayName: "Snap User",
      photoUrl: "https://example.com/bitmoji.png",
    });

    fixture = TestBed.createComponent(PricingDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain("Free");
    expect(compiled.textContent).toContain("Get Free Photo Album");

    component.navigateToPaymentSuccess();
    expect(challengeService.markPrizeClaimed).toHaveBeenCalledWith(
      PHOTO_ALBUM_PRIZE_ID,
    );
    expect(dialogRefMock.close).toHaveBeenCalled();
    expect(navigateSpy).toHaveBeenCalledWith(["/payment-success"]);
  });
});
