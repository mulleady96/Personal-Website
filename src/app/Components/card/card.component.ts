import { Component, input, OnInit, computed } from "@angular/core";
import { Router, RouterLink } from "@angular/router";
import {
  MatCard,
  MatCardContent,
  MatCardActions,
} from "@angular/material/card";
import { NgClass, NgOptimizedImage } from "@angular/common";

import { MatButton, MatMiniFabButton } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";

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
  ],
})
export class CardComponent implements OnInit {
  cardList = input<CardItem[]>([]);
  isStackedInput = input<boolean | undefined>(undefined, { alias: "isStacked" });

  isStacked = computed(() => {
    const override = this.isStackedInput();
    if (override !== undefined) {
      return override; // Force the behavior if explicitly provided
    }
    return true; // Use carousel layout by default on all screen sizes
  });

  public currentIndex: number = 0;
  public leftDotsCount: number[] = [];
  public rightDotsCount: number[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {}

  leftArrow(currentIndex: number): void {
    if (currentIndex !== 0) {
      this.leftDotsCount = Array(this.currentIndex).fill(0);
      this.currentIndex--;
    }
  }

  rightArrow(currentIndex: number): void {
    if (currentIndex < this.cardList().length - 1) {
      this.rightDotsCount = Array(
        this.cardList().length - this.currentIndex,
      ).fill(0);
      this.currentIndex++;
    }
  }


  navigate(card: CardItem): void {
    if (card.externalLink) {
      window.open(card.link, "_blank");
    }
  }
}
