
import { Component, inject, OnInit } from "@angular/core";

import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

import { MediaService } from "../../Services/media.service"; // Adjust path if needed
import { Analytics, logEvent } from "@angular/fire/analytics";
import { environment } from "../../../environments/environment";

@Component({
    selector: "app-payment-success",
    imports: [RouterModule, MatButtonModule, MatIconModule, MatCardModule],
    templateUrl: "./payment-success.component.html",
    styleUrl: "./payment-success.component.scss"
})
export class PaymentSuccessComponent implements OnInit {
  private mediaService = inject(MediaService);
  private analytics = inject(Analytics);
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

  ngOnInit(): void {
    this.downloadReceipt();
    logEvent(this.analytics, 'payment_success', { page: 'payment-success' });
  }

  downloadReceipt(): void {
    this.mediaService.createAndDownloadTextFile(
      this.myFileContent,
      this.myDatedFilename,
    );
  }
}
  