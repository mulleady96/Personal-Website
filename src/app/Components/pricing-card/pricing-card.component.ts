import { Component, inject } from "@angular/core";
import { Functions, httpsCallable } from "@angular/fire/functions";
import { MatBadgeModule } from "@angular/material/badge";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { PricingDialogComponent } from "../pricing-dialog/pricing-dialog.component";

@Component({
  selector: "app-pricing-card",
  imports: [
    MatBadgeModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
  ],
  templateUrl: "./pricing-card.component.html",
  styleUrl: "./pricing-card.component.css",
})
export class PricingCardComponent {
  constructor(public dialog: MatDialog) {}

  openPricingDialog(): void {
    this.dialog.open(PricingDialogComponent, {
      width: "360px", // Set a width for the dialog
    });
  }
}
