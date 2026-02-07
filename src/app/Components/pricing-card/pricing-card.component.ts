import {
  animate,
  state,
  style,
  transition,
  trigger,
} from "@angular/animations";

import { Component, inject } from "@angular/core";
import { Functions, httpsCallable } from "@angular/fire/functions";
import { MatBadgeModule } from "@angular/material/badge";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { loadStripe, Stripe } from "@stripe/stripe-js";
import { environment } from "src/environments/environment";

import { PricingDialogComponent } from "../pricing-dialog/pricing-dialog.component"; // Adjust the path as needed

@Component({
    selector: "app-pricing-card",
    imports: [
    MatBadgeModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule
],
    templateUrl: "./pricing-card.component.html",
    styleUrl: "./pricing-card.component.css",
    animations: [
        trigger("slideUp", [
            state("hidden", style({
                transform: "translateY(100%)", // Start offscreen (below)
                opacity: 0,
            })),
            state("visible", style({
                transform: "translateY(0)", // End at its original position
                opacity: 1,
            })),
            transition("hidden => visible", [
                animate("300ms ease-out"), // Animation duration and easing
            ]),
            transition("visible => hidden", [animate("300ms ease-in")]),
        ]),
    ]
})
export class PricingCardComponent {
  private functions: Functions = inject(Functions);

  isLoading = false;
  error: string | null = null;

  constructor(public dialog: MatDialog) {
  }

  openPricingDialog(): void {
    this.dialog.open(PricingDialogComponent, {
      width: "360px", // Set a width for the dialog
    });
  }
}
