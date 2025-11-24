import { Component, Input } from "@angular/core";

import { CardItem } from "../card/card.component";
import { ComponentsModule } from "../components.module";

@Component({
    selector: "app-stacked-cards",
    imports: [ComponentsModule],
    templateUrl: "./stacked-cards.component.html",
    styleUrl: "./stacked-cards.component.css"
})
export class StackedCardsComponent {
  @Input() cards: CardItem[] = [
    {
      id: 1,
      title: "Design",
      description:
        "This will involve studying your brand, your competitors and your market. Identifying key designs that you admire from well-known brands. From this we can create bespoke UI/UX designs that will engage your audience, by being both easy to use and appealing on the eye.",
      link: "/portfolio",
      buttonText: "View Designs",
      externalLink: false,
    },
    {
      id: 2,
      title: "Development",
      description:
        "Once the final design has been agreed, checkpoints will be established whereby you will be able to test the application as it's progressing. Providing feedback on the design & functionality throughout.",
      link: "/portfolio",
      buttonText: "View Portfolio",
      externalLink: false,
    },
    {
      id: 3,
      title: "Analytics",
      description:
        "We can provide comprehensive statistical reports on how your website is performing.",
    },
  ];
  dotsCount: number = 3; // cards.length;
  startingIndex: number = 0; // index of the card that is currently active
  // uses cards comp and stacks them into carousel - with circle dots indicating which card is active and how many are on the eft/right.
  // left/right arrows to navigate through the cards. moving startingIndex up/down
}
