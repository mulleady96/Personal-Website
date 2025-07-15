import { BreakpointObserver } from "@angular/cdk/layout";
import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";

export interface CardItem {
  id: number;
  title: string;
  description: string;
  link?: string;
  image?: string | undefined;
  buttonText?: string;
  externalLink?: boolean;
}

@Component({
  selector: "app-card",
  standalone: false,
  templateUrl: "./card.component.html",
  styleUrl: "./card.component.scss",
})
export class CardComponent implements OnInit {
  @Input() cardList: CardItem[] = [];
  @Input() isStacked?: boolean = true;
  public currentIndex: number = 0;
  public leftDotsCount: number[] = [];
  public rightDotsCount: number[] = [];
  public hoverSide: "left" | "right" | null = null;
  constructor(
    private router: Router,
    private breakpointObserver: BreakpointObserver,
  ) {}

  ngOnInit(): void {
    // this.isStacked = this.breakpointObserver.isMatched("(max-width: 599px)");
  }

  leftArrow(currentIndex: number): void {
    console.log(this.cardList.length - 1);
    if (currentIndex !== 0) {
      this.leftDotsCount = Array(this.currentIndex).fill(0);
      this.currentIndex--;
    }
    console.log("left arrow clicked", currentIndex);
  }

  rightArrow(currentIndex: number): void {
    if (currentIndex < this.cardList.length - 1) {
      this.rightDotsCount = Array(
        this.cardList.length - this.currentIndex,
      ).fill(0);
      this.currentIndex++;
    }
    console.log("right arrow clicked", currentIndex);
  }

  handleNavigation(event: MouseEvent): void {
    const cardWidth = (event.currentTarget as HTMLElement).clientWidth;
    const clickPosition = event.offsetX;

    if (clickPosition < cardWidth / 2) {
      this.leftArrow(this.currentIndex);
    } else {
      this.rightArrow(this.currentIndex);
    }
  }

  handleHover(event: MouseEvent): void {
    const cardWidth = (event.currentTarget as HTMLElement).clientWidth;
    const hoverPosition = event.offsetX;

    if (hoverPosition < cardWidth / 2) {
      this.hoverSide = "left";
    } else {
      this.hoverSide = "right";
    }
  }

  resetHover(): void {
    this.hoverSide = null;
  }

  navigate(card: CardItem): void {
    if (card.externalLink) {
      window.open(card.link, "_blank");
    }
  }
}
