import { CommonModule } from "@angular/common";
import { Component, computed, inject, input } from "@angular/core";
import { MatBadgeModule } from "@angular/material/badge";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { RouterModule } from "@angular/router";
import {
  FaIconLibrary,
  FontAwesomeModule,
} from "@fortawesome/angular-fontawesome";
import { faGoogle, faSnapchat } from "@fortawesome/free-brands-svg-icons";
import { ChallengeService } from "@Services/challenge.service";
import { LoginService } from "@Services/login.service";

@Component({
  selector: "app-login",
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatBadgeModule,
    MatButtonModule,
    MatIconModule,
    FontAwesomeModule,
  ],
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent {
  public loginService = inject(LoginService);
  public challengeService = inject(ChallengeService);
  public showChallenges = input<boolean>(true);
  public postLoginRedirect = input<string | null>(null);
  public isVerified = computed<boolean>(() =>
    this.challengeService.isPrizeClaimed("badge-supporter"),
  );

  public readonly faGoogle = faGoogle;
  public readonly faSnapchat = faSnapchat;

  constructor() {
    const library = inject(FaIconLibrary);
    library.addIcons(faGoogle, faSnapchat);
  }

  onSnapchatLogin(): void {
    this.loginService.loginWithSnapchat(this.postLoginRedirect() ?? undefined);
  }

  onAvatarError(event: Event) {
    const target = event.target as HTMLImageElement | null;
    if (target) {
      target.src = "assets/AM NEW Logo 2020.png";
    }
  }
}
