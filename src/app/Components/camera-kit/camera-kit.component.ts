import {
  Component,
  OnInit,
  OnDestroy,
  ElementRef,
  viewChild,
  AfterViewInit,
  signal,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { MatSelectModule } from "@angular/material/select";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import {
  bootstrapCameraKit,
  CameraKit,
  Lens,
  CameraKitSession,
  createMediaStreamSource,
} from "@snap/camera-kit";
import { environment } from "../../../environments/environment";

const API_TOKEN = environment.cameraKit.apiToken;
const LENS_GROUP_ID = environment.cameraKit.lensGroupId;
const snapLenses = environment.cameraKit.snapLenses;

@Component({
  selector: "app-camera-kit",
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: "./camera-kit.component.html",
  styleUrls: ["./camera-kit.component.scss"],
})
export class CameraKitComponent implements OnInit, OnDestroy, AfterViewInit {
  cameraContainer = viewChild<ElementRef<HTMLDivElement>>("cameraContainer");

  sdkStatus = signal<"loading" | "ready" | "error">("loading");
  lenses = signal<Lens[]>([]);
  selectedLensId = signal<string>("");
  facingMode = signal<"user" | "environment">("user");

  private cameraKit: CameraKit | null = null;
  private session: CameraKitSession | null = null;
  private mediaStream: MediaStream | null = null;

  async ngOnInit() {
    try {
      this.cameraKit = await bootstrapCameraKit({ apiToken: API_TOKEN });
      this.sdkStatus.set("ready");
      await this.loadLenses();
    } catch (error) {
      console.error("Failed to initialize Camera Kit:", error);
      this.sdkStatus.set("error");
    }
  }

  async ngAfterViewInit() {
    if (this.cameraKit && this.cameraContainer()) {
      await this.initSession();
    } else {
      const checkInterval = setInterval(async () => {
        if (this.cameraKit && this.cameraContainer()) {
          clearInterval(checkInterval);
          await this.initSession();
        }
      }, 100);
    }
  }

  ngOnDestroy() {
    if (this.session) {
      this.session.pause();
    }
    if (this.mediaStream) {
      this.mediaStream.getTracks().forEach((track) => track.stop());
    }
  }

  private async loadLenses() {
    if (!this.cameraKit) return;

    const loadedLenses: Lens[] = [];
    for (const id of snapLenses) {
      try {
        const lens = await this.cameraKit.lensRepository.loadLens(
          id,
          LENS_GROUP_ID,
        );
        loadedLenses.push(lens);
      } catch (error) {
        console.warn(`Failed to load lens ${id}:`, error);
      }
    }

    this.lenses.set(loadedLenses);

    if (loadedLenses.length > 0) {
      this.selectedLensId.set(loadedLenses[0].id);
      await this.applySelectedLens();
    } else {
      console.error(
        "No lenses could be loaded. Ensure they are published to Production.",
      );
    }
  }

  private async initSession() {
    if (!this.cameraKit || !this.cameraContainer()) return;
    try {
      this.session = await this.cameraKit.createSession();

      await this.restartCamera();

      this.cameraContainer()!.nativeElement.appendChild(
        this.session.output.live,
      );

      await this.applySelectedLens();
    } catch (err) {
      console.error("Error initializing session:", err);
    }
  }

  async toggleCamera() {
    this.facingMode.set(this.facingMode() === "user" ? "environment" : "user");
    await this.restartCamera();
  }

  private async restartCamera() {
    if (this.mediaStream) {
      this.mediaStream.getTracks().forEach((track) => track.stop());
    }

    this.mediaStream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: this.facingMode() },
    });

    const source = createMediaStreamSource(this.mediaStream, {
      cameraType: this.facingMode() === "user" ? "user" : "environment",
    });

    if (this.session) {
      await this.session.setSource(source);
      this.session.play();
    }
  }

  async onLensSelect() {
    await this.applySelectedLens();
  }

  private async applySelectedLens() {
    if (!this.session || !this.selectedLensId() || !this.lenses().length)
      return;
    const lens = this.lenses().find((l) => l.id === this.selectedLensId());
    if (lens) {
      try {
        await this.session.applyLens(lens);
      } catch (err) {
        console.error("Error applying lens:", err);
      }
    }
  }
}
