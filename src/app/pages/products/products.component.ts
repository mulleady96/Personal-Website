import { Component } from "@angular/core";
import { FlexModule } from "@angular/flex-layout/flex";
import { CardComponent } from "../../Components/card/card.component";

@Component({
    selector: "app-products",
    templateUrl: "./products.component.html",
    styleUrls: ["./products.component.scss"],
    imports: [FlexModule, CardComponent]
})
export class ProductsComponent {
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
    {
      id: 4,
      title: "Apple Catcher",
      description:
        "Apple Catcher is a snapchat lense made on Lens Studio, where you have to catch falling apples.",
      image: "assets/snapcode-apple-catcher.png",
      buttonText: "Scan with Snapchat",
      externalLink: false,
    },
    {
      id: 5,
      title: "F1 Lights Out",
      description:
        "F1 Lights Out is a snapchat lense made on Lens Studio, where you can test your reaction speed.",
      
      image: "assets/snapcode-lights-out.png",
      buttonText: "Scan with Snapchat",
      externalLink: false,
    },
    {
      id: 6,
      title: "Pirelli Cap",
      description:
        "Snapchat lense made on Lens Studio, where you can wear various different Pirelli caps.",
      image: "assets/snapcode-pirelli-cap.png",
      buttonText: "Scan with Snapchat",
      externalLink: false,
    },
  ];
}
