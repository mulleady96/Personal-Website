import { Component, inject, input, OnInit } from "@angular/core";
import { Router, RouterLink } from "@angular/router";
import {
  MatCard,
  MatCardContent,
  MatCardActions,
} from "@angular/material/card";
import { NgClass, NgOptimizedImage } from "@angular/common";

import { MatButton, MatMiniFabButton } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import { ChallengeService } from "@Services/challenge.service";
import { SnapcodeDialogComponent } from "@Components/snapcode-dialog/snapcode-dialog.component";

export interface CardItem {
  id: number;
  title: string;
  description: string;
  link?: string;
  image?: string | undefined;
  buttonText?: string;
  externalLink?: boolean;
  type?: string;
  queryParams?: Record<string, string>;
}

@Component({
  selector: "app-card",
  templateUrl: "./card.component.html",
  styleUrl: "./card.component.scss",
  imports: [
    MatCard,
    NgClass,
    NgOptimizedImage,
    MatCardContent,
    MatCardActions,
    RouterLink,
    MatButton,
    MatMiniFabButton,
    MatIcon,
    MatDialogModule,
  ],
})
export class CardComponent implements OnInit {
  cardList = input<CardItem[]>([]);
  public currentIndex: number = 0;

  private dialog = inject(MatDialog);
  private challengeService = inject(ChallengeService);

  constructor(private router: Router) {}

  ngOnInit(): void {}

  leftArrow(currentIndex: number): void {
    if (currentIndex > 0) {
      this.currentIndex--;
    }
  }

  rightArrow(currentIndex: number): void {
    if (currentIndex < this.cardList().length - 1) {
      this.currentIndex++;
    }
  }

  onCardImageClick(card: CardItem): void {
    if (card.type === "snap" && card.image) {
      this.dialog.open(SnapcodeDialogComponent, {
        width: "320px",
        data: {
          snapcodeSrc: card.image,
          title: card.title,
        },
      });
      this.challengeService.triggerAction("AR_scan");
    }
  }

  navigate(card: CardItem): void {
    if (card.externalLink) {
      window.open(card.link, "_blank");
    }
  }
}
