import { CommonModule } from "@angular/common";
import { Component, inject, OnInit } from "@angular/core";

import { MediaService } from "../../Services/media.service"; // Adjust path if needed
@Component({
  selector: "app-payment-success",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./payment-success.component.html",
  styleUrl: "./payment-success.component.scss",
})
export class PaymentSuccessComponent implements OnInit {
  private mediaService = inject(MediaService);

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
  myFileContent =
    "Photo Album link: https://photos.app.goo.gl/5YHLsNhjDtEwYMba6.\n\n" +
    "Receipt generated on: " +
    new Date().toUTCString();

  // 2. Define a filename, using the helper function to include today's date.
  myDatedFilename = `receipt-photo-album-${this.getTodaysDateFormatted()}.txt`;

  ngOnInit(): void {
    this.mediaService.createAndDownloadTextFile(
      this.myFileContent,
      this.myDatedFilename,
    );
  }
}
