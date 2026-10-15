import { Component, inject, input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { MatBadgeModule } from "@angular/material/badge";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import {
  FontAwesomeModule,
  FaIconLibrary,
} from "@fortawesome/angular-fontawesome";
import { faSnapchat, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { LoginService } from "../../Services/login.service";
import { ChallengeService } from "../../Services/challenge.service";

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

  public readonly faGoogle = faGoogle;
  public readonly faSnapchat = faSnapchat;

  constructor() {
    const library = inject(FaIconLibrary);
    library.addIcons(faGoogle, faSnapchat);
  }

  onAvatarError(event: Event) {
    const target = event.target as HTMLImageElement | null;
    if (target) {
      target.src = "assets/AM NEW Logo 2020.png";
    }
  }
}
