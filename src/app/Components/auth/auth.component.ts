import { Component } from "@angular/core";

import { AuthService } from "../../Services/auth.service";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html",
  styleUrls: ["./auth.component.css"],
})
export class AuthComponent {
  currentUser: string | null | undefined;

  constructor(private authService: AuthService) {
    this.authService.getCurrentUser().then((currentUser) => {
      this.currentUser = currentUser?.displayName;
    });
  }

  googleSignIn() {
    this.authService.loginWithGoogle().then((user) => {
      this.currentUser = user.displayName;
    });
  }

  signOut() {
    this.authService.signOut();
    this.currentUser = "";
  }
}
