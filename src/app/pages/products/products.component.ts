import { animate, style, transition, trigger } from "@angular/animations";
import { Component, OnInit } from "@angular/core";

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
})
export class ProductsComponent implements OnInit {
  panelOpenState!: boolean;

  portfolioDetails = [
    {
      id: 1,
      title: "Loyalty Rewards",
      description:
        "Simple App to keep all your loyalty cards in one place, online or offline, forever.",
      link: "https://ionicmap-8b1d0.firebaseapp.com/",
      image: "assets/pexels-lukas-1420707.jpg",
      buttonText: "Open App",
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
