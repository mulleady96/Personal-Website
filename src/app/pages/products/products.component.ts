import { Component } from "@angular/core";

import { CardComponent } from "../../Components/card/card.component";

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.scss"],
  imports: [CardComponent],
})
export class ProductsComponent {
  portfolioDetails = [
    {
      id: 1,
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
    {
      id: 4,
      title: "Apple Catcher",
      description:
        "Apple Catcher is a snapchat lense made on Lens Studio, where you have to catch falling apples.",
      image: "assets/snapcode-apple-catcher.png",
      link: "/AR-corner",
      queryParams: { lensId: "6fbb0c75-29db-4642-ba52-c9a24cebdbdd" },
      buttonText: "Experience in AR",
      externalLink: false,
      type: "snap",
    },
    {
      id: 5,
      title: "F1 Lights Out",
      description:
        "F1 Lights Out is a snapchat lense made on Lens Studio, where you can test your reaction speed.",

      image: "assets/snapcode-lights-out.png",
      link: "/AR-corner",
      queryParams: { lensId: "50c27549-dcb6-4317-b893-c57ffa65bd06" },
      buttonText: "Experience in AR",
      externalLink: false,
      type: "snap",
    },
    {
      id: 6,
      title: "Pirelli Cap",
      description:
        "Snapchat lense made on Lens Studio, where you can wear various different Pirelli caps.",
      image: "assets/snapcode-pirelli-cap.png",
      link: "/AR-corner",
      queryParams: { lensId: "6f148acd-47f2-40c2-8489-ce9e79f2dbd9" },
      buttonText: "Experience in AR",
      externalLink: false,
      type: "snap",
    },
  ];
}
