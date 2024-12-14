import { Component, Input } from "@angular/core";
import { Router } from "@angular/router";

interface CardItem {
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
export class CardComponent {
  @Input() cardList: CardItem[] = [];
  constructor(private router: Router) {}

  navigate(card: CardItem) {
    if (card.externalLink) {
      window.open(card.link, "_blank");
    }
  }
}
