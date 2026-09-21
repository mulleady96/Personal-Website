import { Component, OnInit, inject, signal } from "@angular/core";
import { CountUpOptions } from "countup.js";
import { NgOptimizedImage } from "@angular/common";
import { BubblesComponent } from "../../Components/bubbles/bubbles.component";
import { MatFabButton } from "@angular/material/button";
import { RouterLinkActive, RouterLink } from "@angular/router";
import { MatTooltip } from "@angular/material/tooltip";
import { MatIcon } from "@angular/material/icon";
import { CardComponent } from "../../Components/card/card.component";
import { GravitaService } from "../../Services/gravita.service";

@Component({
  // tslint:disable-next-line: quotemark
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
  imports: [
    NgOptimizedImage,
    BubblesComponent,
    MatFabButton,
    RouterLinkActive,
    MatTooltip,
    RouterLink,
    MatIcon,
    CardComponent,
  ],
})
export class HomeComponent implements OnInit {
  gravita = inject(GravitaService);
  opts!: CountUpOptions;
  showDiv = false;
  image = signal<string>("");
  imageLoaded: boolean = true;
  cardDetails = [
    {
      id: 1,
      title: "Experience AR",
      description:
        "Step into the future with our augmented reality experiences.",
      pictureClass: "productionImage",
      link: "/AR-corner",
      buttonText: "Open AR",
      externalLink: false,
    },
    {
      id: 2,
      title: "Latest blog",
      description: "Loading latest blog...",
      pictureClass: "designImage",
      link: "/blog",
      buttonText: "Read Blog",
      externalLink: false,
    },
    {
      id: 3,
      title: "New Photo Gallery",
      description:
        "Explore our collection of high quality photographs in the gallery.",
      pictureClass: "devImage",
      link: "/gallery",
      buttonText: "View Gallery",
      externalLink: false,
    },
  ];

  navigationButtons = [
    {
      ariaLabel: "Portfolio",
      routerLink: "/portfolio",
      icon: "desktop_mac",
    },
    {
      ariaLabel: "Blog",
      routerLink: "/blog",
      icon: "article",
    },
    {
      ariaLabel: "Get In Touch",
      routerLink: "/enquire",
      icon: "mail",
    },
    {
      ariaLabel: "Gallery",
      routerLink: "/gallery",
      icon: "collections",
    },
  ];

  ngOnInit() {
    this.useOptions();
    this.randomImages();
    this.loadLatestBlog();
  }

  async loadLatestBlog() {
    try {
      const docs = await this.gravita.getBlogCache();
      if (docs && docs.length > 0) {
        const latestDoc = docs[docs.length - 1];
        const latest = { docId: latestDoc.id, ...(latestDoc.data() as any) };
        this.cardDetails[1].description =
          latest.prompt || "Check out our latest insights!";
        this.cardDetails[1].link = `/blog/${latest.docId}`;
      }
    } catch (e) {
      console.error("Failed to load latest blog", e);
    }
  }

  toggleDiv = () => {
    this.showDiv = !this.showDiv;
  };

  useOptions = () => {
    this.opts = {
      duration: 6,
      separator: ",",
    };
  };

  randomImages = async () => {
    try {
      const media = await this.gravita.getMediaFromFirestore();
      const images = media.filter((item) => item.type !== "video");
      if (images.length > 0) {
        this.image.set(images[Math.floor(Math.random() * images.length)].src);
      }
    } catch (e) {
      console.error("Failed to load random image", e);
    }
  };

  imageFailed() {
    this.imageLoaded = false;
  }
}
