import { provideHttpClient } from "@angular/common/http";
import { signal } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MatSnackBar } from "@angular/material/snack-bar";
import { provideNoopAnimations } from "@angular/platform-browser/animations";
import { provideRouter } from "@angular/router";
import { ChallengesComponent } from "@app/pages/challenges/challenges.component";
import {
  ChallengeService,
  DEFAULT_PRIZES,
  PHOTO_ALBUM_PRIZE_ID,
  Prize,
} from "@Services/challenge.service";
import { GravitaService } from "@Services/gravita.service";
import { AppUser, LoginService } from "@Services/login.service";

class MockLoginService {
  currentUser = signal<AppUser | null>(null);
  get snapUser() {
    return this.currentUser;
  }
}

class MockChallengeService {
  prizes = signal<Prize[]>(DEFAULT_PRIZES);
  challenges = signal([]);
  loadChallenges = vi.fn().mockResolvedValue([]);
  isChallengeCompleted = vi.fn().mockReturnValue(false);
  isPrizeClaimed = vi.fn().mockReturnValue(false);
  claimPrize = vi.fn().mockResolvedValue(true);
}

describe("ChallengesComponent", () => {
  let component: ChallengesComponent;
  let fixture: ComponentFixture<ChallengesComponent>;
  let loginService: MockLoginService;
  let challengeService: MockChallengeService;

  beforeEach(async () => {
    loginService = new MockLoginService();
    challengeService = new MockChallengeService();

    await TestBed.configureTestingModule({
      imports: [ChallengesComponent],
      providers: [
        provideRouter([]),
        provideNoopAnimations(),
        provideHttpClient(),
        { provide: LoginService, useValue: loginService },
        { provide: ChallengeService, useValue: challengeService },
        { provide: GravitaService, useValue: { getChallenges: vi.fn().mockResolvedValue([]) } },
        { provide: MatSnackBar, useValue: { open: vi.fn() } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ChallengesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create the challenges component", () => {
    expect(component).toBeTruthy();
  });

  it("should default activeTabIndex to 0 (Challenges tab)", () => {
    expect(component.activeTabIndex()).toBe(0);
  });

  it("should switch to Prizes tab when selectTab(1) is called", () => {
    component.selectTab(1);
    expect(component.activeTabIndex()).toBe(1);
  });

  it("should calculate reward progress correctly based on user points", () => {
    const testUser: AppUser = {
      provider: "google",
      externalId: "user-123",
      displayName: "Jane Doe",
      email: "jane@example.com",
      photoUrl: "https://example.com/avatar.png",
      rewardsPoints: 250,
      dailyChallenges: [],
    };
    loginService.currentUser.set(testUser);
    fixture.detectChanges();

    const samplePrize: Prize = {
      id: "test-prize",
      title: "Test Prize",
      description: "A prize for testing",
      pointsRequired: 500,
      icon: "star",
      category: "Digital Perk",
    };

    expect(component.currentPoints()).toBe(250);
    expect(component.getRewardProgress(samplePrize)).toBe(50);
    expect(component.getPointsNeeded(samplePrize)).toBe(250);
    expect(component.isUnlocked(samplePrize)).toBe(false);

    // Give user 500 points
    loginService.currentUser.set({
      ...testUser,
      rewardsPoints: 500,
    });
    fixture.detectChanges();

    expect(component.currentPoints()).toBe(500);
    expect(component.getRewardProgress(samplePrize)).toBe(100);
    expect(component.getPointsNeeded(samplePrize)).toBe(0);
    expect(component.isUnlocked(samplePrize)).toBe(true);
  });

  it("should calculate userTier accurately according to points milestone", () => {
    const baseUser: AppUser = {
      provider: "google",
      photoUrl: "",
      rewardsPoints: 100,
    };
    loginService.currentUser.set(baseUser);
    expect(component.userTier().name).toBe("Bronze Explorer");

    loginService.currentUser.set({ ...baseUser, rewardsPoints: 300 });
    expect(component.userTier().name).toBe("Silver Challenger");

    loginService.currentUser.set({ ...baseUser, rewardsPoints: 1000 });
    expect(component.userTier().name).toBe("Gold Champion");

    loginService.currentUser.set({ ...baseUser, rewardsPoints: 2000 });
    expect(component.userTier().name).toBe("Platinum Legend");
  });

  it("should treat the photo album prize as unlocked and 100% claimed even below 500 points", () => {
    challengeService.isPrizeClaimed.mockImplementation(
      (id: string) => id === PHOTO_ALBUM_PRIZE_ID,
    );
    loginService.currentUser.set({
      provider: "google",
      externalId: "user-album",
      email: "album@example.com",
      photoUrl: "",
      rewardsPoints: 50,
      claimedPrizes: [PHOTO_ALBUM_PRIZE_ID],
    });
    fixture.detectChanges();

    const albumPrize = DEFAULT_PRIZES.find(
      (p: Prize) => p.id === PHOTO_ALBUM_PRIZE_ID,
    ) as Prize;

    expect(component.isClaimed(albumPrize)).toBe(true);
    expect(component.isUnlocked(albumPrize)).toBe(true);
    expect(component.getRewardProgress(albumPrize)).toBe(100);
    expect(component.getPointsNeeded(albumPrize)).toBe(0);
    expect(component.unlockedPrizesCount()).toBe(1);
  });
});
