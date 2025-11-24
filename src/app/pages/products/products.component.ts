import { animate, style, transition, trigger } from "@angular/animations";
import { Component, OnInit } from "@angular/core";
import { FlexModule } from "@angular/flex-layout/flex";
import { CardComponent } from "../../Components/card/card.component";

@Component({
    selector: "app-products",
    templateUrl: "./products.component.html",
    styleUrls: ["./products.component.scss"],
    animations: [
        // Slide items up from the bottom of screen.
        trigger("itemState", [
            transition("void => *", [
                style({ transform: "translateX(100%)" }),
                animate("0.6s ease-in-out"),
            ]),
            transition("* => void", [
                animate("0.6s ease-in-out", style({ transform: "translateX(100%)" })),
            ]),
        ]),
    ],
    imports: [FlexModule, CardComponent]
})
export class ProductsComponent implements OnInit {
  panelOpenState!: boolean;

  portfolioDetails = [
    {
      id: 1,
      title: "Playwright-broad-utils",
      description:
        "Utility npm package that allows you to assert all Images are rendered on a page, all external links load and capture web socket messages.",
      link: "https://www.npmjs.com/package/playwright-broad-utils?activeTab=readme",
      image: "assets/Playwright.Logo.svg",
      buttonText: "View Package",
      externalLink: true,
    },
    {
      id: 2,
      title: "Pierre Gasly Game",
      description:
        "Fun game that resembles Pierre Gasly's pre-race procedure, where he catches falling tennis balls.",
      link: "https://gasly-game.vercel.app/",
      image: "assets/PierreGasly10.jpg",
      buttonText: "Open App",
      externalLink: true,
    },
    {
      id: 3,
      title: "DOBBLE",
      description:
        "Dobble is a fun card game, where you have to find the matching symbol between 2 cards.",
      link: "https://dobble-one.vercel.app/",
      image: "assets/logo-color.png",
      buttonText: "Open App",
      externalLink: true,
    },
  ];

  constructor() {}

  ngOnInit() {}

  flipCard() {}
}
