import {
  Component,
  inject,
  OnInit,
  signal,
  ViewChild,
  ElementRef,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { Router, RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatSnackBar, MatSnackBarModule } from "@angular/material/snack-bar";
import { MatTabsModule } from "@angular/material/tabs";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatSelectModule } from "@angular/material/select";
import { GravitaService, MediaItem } from "../../Services/gravita.service";
import { AuthService } from "../../Services/auth.service";
import imageCompression from "browser-image-compression";

@Component({
  selector: "app-admin-dashboard",
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    RouterModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatTabsModule,
    MatExpansionModule,
    MatSelectModule,
  ],
  template: `
    <div class="container">
      <h1>Admin Dashboard</h1>
      <div class="actions">
        <button mat-raised-button color="primary" routerLink="/admin/new">
          <mat-icon>add</mat-icon> Create New Article
        </button>
        <button mat-button (click)="logout()">
          <mat-icon>logout</mat-icon> Logout
        </button>
      </div>

      <mat-tab-group>
        <mat-tab label="Articles">
          <mat-card class="mt-4">
            <mat-card-header>
              <mat-card-title>Articles</mat-card-title>
            </mat-card-header>
            <mat-list>
              <mat-list-item
                *ngFor="let article of articles()"
                (click)="editArticle(article.docId)"
              >
                <mat-icon matListItemIcon>article</mat-icon>
                <div matListItemTitle>{{ article.prompt || "Untitled" }}</div>
                <div matListItemLine>
                  {{ article.status?.startTime | date: "medium" }}
                </div>
                <button mat-icon-button matListItemMeta>
                  <mat-icon>edit</mat-icon>
                </button>
              </mat-list-item>
            </mat-list>
          </mat-card>
        </mat-tab>

        <mat-tab label="Customer Enquiries">
          @if (enquiries().length === 0) {
            <div class="mt-8 text-center">
              <p>No customer enquiries found.</p>
            </div>
          } @else {
            <mat-accordion class="mt-4 d-block">
              <mat-expansion-panel *ngFor="let eq of enquiries()">
                <mat-expansion-panel-header>
                  <mat-panel-title>
                    {{ eq.enquiry?.firstStep?.name || "Unknown" }}
                  </mat-panel-title>
                  <mat-panel-description>
                    {{ eq.enquiry?.secondStep?.email || "No Email" }}
                  </mat-panel-description>
                </mat-expansion-panel-header>
                <p>
                  <strong>Query:</strong>
                  {{ eq.enquiry?.thirdStep?.query || "No query provided" }}
                </p>
              </mat-expansion-panel>
            </mat-accordion>
          }
        </mat-tab>

        <mat-tab label="Upload Media">
          <mat-card class="mt-4">
            <mat-card-header>
              <mat-card-title>Upload Media</mat-card-title>
            </mat-card-header>
            <mat-card-content>
              <form (ngSubmit)="onUploadMedia()">
                <div class="flex-col-gap-10 mt-15">
                  <input
                    #fileInput
                    type="file"
                    (change)="onFileSelected($event)"
                    accept="image/*,video/*"
                  />
                  <mat-form-field>
                    <mat-label>Title</mat-label>
                    <input
                      matInput
                      [(ngModel)]="uploadMetadata.title"
                      name="title"
                    />
                  </mat-form-field>
                  <mat-form-field>
                    <mat-label>Description</mat-label>
                    <input
                      matInput
                      [(ngModel)]="uploadMetadata.description"
                      name="description"
                    />
                  </mat-form-field>
                  <button
                    mat-raised-button
                    color="accent"
                    type="submit"
                    [disabled]="!selectedFile || isUploading()"
                  >
                    @if (!isUploading()) {
                      <mat-icon>cloud_upload</mat-icon>
                    } @else {
                      <mat-spinner
                        diameter="20"
                        class="d-inline-block mr-8"
                      ></mat-spinner>
                    }
                    {{ isUploading() ? "Uploading..." : "Upload to Gallery" }}
                  </button>
                </div>
              </form>
            </mat-card-content>
          </mat-card>
        </mat-tab>

        <mat-tab label="Challenges">
          <mat-card class="mt-4">
            <mat-card-header>
              <mat-card-title>Create New Challenge</mat-card-title>
            </mat-card-header>
            <mat-card-content>
              <form (ngSubmit)="onCreateChallenge()">
                <div class="flex-col-gap-10 mt-15">
                  <mat-form-field>
                    <mat-label>Challenge Title</mat-label>
                    <input matInput [(ngModel)]="newChallenge.title" name="c_title" required />
                  </mat-form-field>

                  <mat-form-field>
                    <mat-label>Duration</mat-label>
                    <mat-select [(ngModel)]="newChallenge.duration" name="c_duration" required>
                      <mat-option value="daily">Daily</mat-option>
                      <mat-option value="weekly">Weekly</mat-option>
                      <mat-option value="monthly">Monthly</mat-option>
                    </mat-select>
                  </mat-form-field>

                  <mat-form-field>
                    <mat-label>Action Trigger (e.g., 'upload_photo')</mat-label>
                    <input matInput [(ngModel)]="newChallenge.actionTrigger" name="c_actionTrigger" required />
                  </mat-form-field>

                  <mat-form-field>
                    <mat-label>Rewards Points</mat-label>
                    <input matInput type="number" [(ngModel)]="newChallenge.rewardsPoints" name="c_rewardsPoints" required />
                  </mat-form-field>

                  <button
                    mat-raised-button
                    color="accent"
                    type="submit"
                    [disabled]="isCreatingChallenge() || !newChallenge.title || !newChallenge.actionTrigger || !newChallenge.rewardsPoints"
                  >
                    @if (isCreatingChallenge()) {
                      <mat-spinner diameter="20" class="d-inline-block mr-8"></mat-spinner>
                      Creating...
                    } @else {
                      <mat-icon>emoji_events</mat-icon> Create Challenge
                    }
                  </button>
                </div>
              </form>
            </mat-card-content>
          </mat-card>
        </mat-tab>
      </mat-tab-group>
    </div>
  `,
  styles: [
    `
      .container {
        padding: 50px;
        max-width: 800px;
        margin: 0 auto;
      }
      .actions {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
      }
      .mt-4 {
        margin-top: 1rem;
      }
      mat-list-item {
        cursor: pointer;
      }
      mat-list-item:hover {
        background-color: rgba(0, 0, 0, 0.04);
      }
    `,
  ],
})
export class AdminDashboardComponent implements OnInit {
  gravita = inject(GravitaService);
  auth = inject(AuthService);
  articles = signal<any[]>([]);
  enquiries = signal<any[]>([]);
  router = inject(Router);
  snackBar = inject(MatSnackBar);

  ngOnInit() {
    this.loadData();
  }

  async loadData() {
    this.articles.set(await this.gravita.getArticles());
    this.enquiries.set(await this.gravita.getEnquiries());
  }

  logout() {
    this.auth.signOut();
    this.router.navigate(["/"]);
  }

  editArticle(id: string) {
    this.router.navigate(["/admin/edit", id]);
  }

  @ViewChild("fileInput") fileInput!: ElementRef<HTMLInputElement>;
  selectedFile: File | null = null;
  isUploading = signal(false);
  uploadMetadata: Partial<MediaItem> = {
    title: "",
    description: "",
  };

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  newChallenge = {
    title: "",
    duration: "daily",
    actionTrigger: "",
    rewardsPoints: 50,
  };
  isCreatingChallenge = signal(false);

  async onCreateChallenge() {
    this.isCreatingChallenge.set(true);
    try {
      await this.gravita.createChallenge(this.newChallenge);
      this.snackBar.open("Challenge created successfully!", "Close", { duration: 3000 });
      this.newChallenge = {
        title: "",
        duration: "daily",
        actionTrigger: "",
        rewardsPoints: 50,
      };
    } catch (err: any) {
      this.snackBar.open("Failed to create challenge: " + err.message, "Close", { duration: 3000 });
    } finally {
      this.isCreatingChallenge.set(false);
    }
  }

  async onUploadMedia() {
    if (!this.selectedFile) return;
    this.isUploading.set(true);
    try {
      let fileToUpload = this.selectedFile;

      if (this.selectedFile.type.startsWith("image/")) {
        const options = {
          maxSizeMB: 1,
          maxWidthOrHeight: 1920,
          useWebWorker: true,
        };
        fileToUpload = await imageCompression(this.selectedFile, options);
      }

      await this.gravita.uploadMedia(fileToUpload, this.uploadMetadata);
      this.snackBar.open("Media uploaded successfully!", "Close", {
        duration: 3000,
      });
      this.selectedFile = null;
      this.uploadMetadata = { title: "", description: "" };
      if (this.fileInput) {
        this.fileInput.nativeElement.value = "";
      }
    } catch (error) {
      this.snackBar.open("Upload failed: " + error, "Close", {
        duration: 3000,
      });
    } finally {
      this.isUploading.set(false);
    }
  }
}
