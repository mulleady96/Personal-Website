import { CommonModule } from "@angular/common";
import {
  AfterViewInit,
  Component,
  computed,
  ElementRef,
  inject,
  OnDestroy,
  OnInit,
  signal,
  viewChild,
} from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatSelectModule } from "@angular/material/select";
import { ActivatedRoute } from "@angular/router";
import { SnapcodeDialogComponent } from "@Components/snapcode-dialog/snapcode-dialog.component";
import { environment } from "@environments/environment";
import { ChallengeService } from "@Services/challenge.service";
import {
  bootstrapCameraKit,
  CameraKit,
  CameraKitSession,
  createMediaStreamSource,
  Lens,
} from "@snap/camera-kit";

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
    MatDialogModule,
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
  isProduction = environment.production;

  // Map of lens IDs to their respective snapcode image URLs
  snapcodes: Record<string, string> = {
    "29297842-a25e-4af8-b054-2be90bcd29c6": "assets/snapcode-dobble.png",
    "29b63f02-cce2-42d3-9c01-127443776680": "assets/snapcode-matrix.png",
    "6fbb0c75-29db-4642-ba52-c9a24cebdbdd": "assets/snapcode-apple-catcher.png",
    "6f148acd-47f2-40c2-8489-ce9e79f2dbd9": "assets/snapcode-pirelli-cap.png",
    "50c27549-dcb6-4317-b893-c57ffa65bd06": "assets/snapcode-lights-out.png",
    "c3d0885f-4b0e-4f68-a540-61fbfc894d01": "assets/snapcode-shootout.png",
  };

  selectedSnapcode = computed(() => {
    const id = this.selectedLensId();
    return id && this.snapcodes[id] ? this.snapcodes[id] : "";
  });

  private route = inject(ActivatedRoute);
  private dialog = inject(MatDialog);
  private challengeService = inject(ChallengeService);

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
      const queryLensId = this.route.snapshot.queryParamMap.get("lensId");
      if (queryLensId && loadedLenses.find((l) => l.id === queryLensId)) {
        this.selectedLensId.set(queryLensId);
      } else {
        this.selectedLensId.set(loadedLenses[0].id);
      }
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

  onSnapcodeScan(): void {
    const snapcodeSrc = this.selectedSnapcode();
    if (!snapcodeSrc) return;

    const currentLens = this.lenses().find(
      (l) => l.id === this.selectedLensId(),
    );
    this.dialog.open(SnapcodeDialogComponent, {
      width: "320px",
      data: {
        snapcodeSrc,
        title: currentLens?.name || "Snap AR Lens",
      },
    });

    this.challengeService.triggerAction("AR_scan");
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
