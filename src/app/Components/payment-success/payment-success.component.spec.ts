import { signal } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { Analytics } from "@angular/fire/analytics";
import { Functions } from "@angular/fire/functions";
import { provideRouter } from "@angular/router";
import { PaymentSuccessComponent } from "@Components/payment-success/payment-success.component";
import {
  ChallengeService,
  PHOTO_ALBUM_PRIZE_ID,
} from "@Services/challenge.service";
import { AppUser, LoginService } from "@Services/login.service";
import { beforeEach, describe, expect, it, vi } from "vitest";

class MockLoginService {
  currentUser = signal<AppUser | null>(null);
}

class MockChallengeService {
  markPrizeClaimed = vi.fn().mockResolvedValue(true);
}

describe("PaymentSuccessComponent", () => {
  let component: PaymentSuccessComponent;
  let fixture: ComponentFixture<PaymentSuccessComponent>;
  let loginService: MockLoginService;
  let challengeService: MockChallengeService;

  beforeEach(async () => {
    loginService = new MockLoginService();
    challengeService = new MockChallengeService();

    await TestBed.configureTestingModule({
      imports: [PaymentSuccessComponent],
      providers: [
        provideRouter([]),
        { provide: Analytics, useValue: { app: { options: {} } } },
        { provide: Functions, useValue: {} },
        { provide: LoginService, useValue: loginService },
        { provide: ChallengeService, useValue: challengeService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PaymentSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should mark the photo album prize as claimed when a user is signed in", () => {
    loginService.currentUser.set({
      provider: "google",
      externalId: "user-1",
      email: "user@example.com",
      photoUrl: "https://example.com/photo.png",
    });
    fixture.detectChanges();

    expect(challengeService.markPrizeClaimed).toHaveBeenCalledWith(
      PHOTO_ALBUM_PRIZE_ID,
    );
  });
});
