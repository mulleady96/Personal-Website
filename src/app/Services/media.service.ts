import { inject, Injectable } from "@angular/core";
import { Functions, httpsCallableData } from "@angular/fire/functions";
import { Observable } from "rxjs";

export interface ZipCreationResponse {
  downloadUrl: string;
  fileName: string;
}

@Injectable({
  providedIn: "root",
})
export class MediaService {
  private functions: Functions = inject(Functions);

  getMediaZipUrl(): Observable<ZipCreationResponse> {
    const getUrl = httpsCallableData<void, ZipCreationResponse>(
      this.functions,
      "getArchiveDownloadUrl",
    );
    return getUrl();
  }
  /**
   * Creates a text file in the browser and triggers a download.
   *
   * @param content The string content to be placed inside the file.
   * @param filename The desired name for the downloaded file (e.g., "report.txt").
   */
  createAndDownloadTextFile = (content: string, filename: string): void => {
    try {
      // Create a "Blob" from the text content. A Blob is a file-like object of immutable, raw data.
      const blob = new Blob([content], { type: "text/plain;charset=utf-8" });

      // Create a temporary anchor (<a>) element to act as a download link.
      const link = document.createElement("a");

      // Create a URL that points to the Blob object in the browser's memory.
      const url = URL.createObjectURL(blob);

      // Set the anchor's href attribute to the Blob's URL.
      link.href = url;

      // Set the anchor's 'download' attribute. This attribute tells the browser
      // to download the linked URL's content instead of navigating to it.
      link.download = filename;

      // The link must be in the document to be clickable, especially in Firefox.
      // We can make it invisible so it doesn't affect the layout.
      link.style.display = "none";
      document.body.appendChild(link);

      // Programmatically click the link to start the download.
      link.click();

      // Clean up by removing the temporary anchor element from the document.
      document.body.removeChild(link);

      // Revoke the object URL to free up browser memory. This is important!
      URL.revokeObjectURL(url);

      console.log(`Successfully triggered download for: ${filename}`);
    } catch (error) {
      console.error("Failed to create or download the file:", error);
    }
  };

  // --- Example Usage ---
}
