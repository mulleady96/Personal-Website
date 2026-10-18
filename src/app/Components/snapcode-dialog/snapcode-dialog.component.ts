import { Component, inject } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MAT_DIALOG_DATA, MatDialogModule } from "@angular/material/dialog";
import { MatIconModule } from "@angular/material/icon";

export interface SnapcodeDialogData {
  snapcodeSrc: string;
  title: string;
}

@Component({
  selector: "app-snapcode-dialog",
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatIconModule],
  templateUrl: "./snapcode-dialog.component.html",
  styleUrl: "./snapcode-dialog.component.scss",
})
export class SnapcodeDialogComponent {
  public readonly data = inject<SnapcodeDialogData>(MAT_DIALOG_DATA);
}
