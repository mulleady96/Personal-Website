import { Component, effect, inject, OnInit } from "@angular/core";
import { Analytics, logEvent } from "@angular/fire/analytics";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { RouterModule } from "@angular/router";
import { environment } from "@environments/environment";
import {
  ChallengeService,
  PHOTO_ALBUM_PRIZE_ID,
} from "@Services/challenge.service";
import { LoginService } from "@Services/login.service";
import { MediaService } from "@Services/media.service";

@Component({
  selector: "app-payment-success",
  imports: [RouterModule, MatButtonModule, MatIconModule, MatCardModule],
  templateUrl: "./payment-success.component.html",
  styleUrl: "./payment-success.component.scss",
})
export class PaymentSuccessComponent implements OnInit {
  private mediaService = inject(MediaService);
  private loginService = inject(LoginService);
  private challengeService = inject(ChallengeService);
  private analytics = inject(Analytics, { optional: true });
  isDownloading = false;
  downloadComplete = false;
  error: string | null = null;

  getTodaysDateFormatted = (): string => {
    const today = new Date();
    const year = today.getFullYear();
    // Pad month and day with a leading zero if they are single-digit.
    const month = String(today.getMonth() + 1).padStart(2, "0"); // JS months are 0-11
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  albumLink = environment.photoAlbumLink;

  myFileContent =
    `Photo Album link: ${this.albumLink}.\n\n` +
    "Receipt generated on: " +
    new Date().toUTCString();

  // 2. Define a filename, using the helper function to include today's date.
  myDatedFilename = `receipt-photo-album-${this.getTodaysDateFormatted()}.txt`;

  constructor() {
    effect(() => {
      if (this.loginService.currentUser()) {
        void this.challengeService.markPrizeClaimed(PHOTO_ALBUM_PRIZE_ID);
      }
    });
  }

  ngOnInit(): void {
    if (this.analytics) {
      logEvent(this.analytics, "payment_success", { page: "payment-success" });
    }
  }

  downloadReceipt(): void {
    this.mediaService.createAndDownloadTextFile(
      this.myFileContent,
      this.myDatedFilename,
    );
  }
}
