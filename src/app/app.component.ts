import { animate, style, transition, trigger } from "@angular/animations";
import { Location } from "@angular/common";
import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from "@angular/core";
import { MatSidenav } from "@angular/material/sidenav";
import { Router } from "@angular/router";
import { SwUpdate } from "@angular/service-worker";
import { initializeApp } from "firebase/app";
import { Observable, of } from "rxjs";

// import * as firebase from "firebase/app";
import { config } from "./credentials";
import { ThemeService } from "./Services/theme.service";

@Component({
  selector: "app-root",
  standalone: false,
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  animations: [
    // Slide items up from the bottom of screen.
    trigger("itemState", [
      transition("void => *", [
        style({ transform: "translateY(100%)" }),
        animate("0.6s ease-in-out"),
      ]),
      transition("* => void", [
        animate("0.6s ease-in-out", style({ transform: "translateY(100%)" })),
      ]),
    ]),
  ],
})
export class AppComponent implements OnInit {
  title = "Andrew Mulleady";
  navigationButtons = [
    {
      ariaLabel: "Home",
      routerLink: "/home",
      icon: "home",
    },
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
      icon: "edit",
    },
    {
      ariaLabel: "Gallery",
      routerLink: "/gallery",
      icon: "collections",
    },
  ];

  @Output()
  navToggle = new EventEmitter();

  isDarkTheme!: Observable<boolean>;
  themeDescription: string;
  iconValue = "nights_stay";
  imageSRC = "assets/AM NEW Logo 2020.png";
  storedTheme!: boolean;
  checked!: boolean;

  constructor(
    private router: Router,
    private swUpdate: SwUpdate,
    private themeService: ThemeService,
    private location: Location,
  ) {
    initializeApp(config);
    // console.log(this.location.path());

    this.themeDescription = "Light Theme";

    // Subscribe to router nav event => on route change, sends page view data to GA
    // this.router.events.subscribe((event) => {
    //   if (event instanceof NavigationEnd) {
    //     (<any>window).ga("set", "page", event.urlAfterRedirects);
    //     (<any>window).ga("send", "pageview");
    //   }
    // });
  }

  @ViewChild("sidenav", { static: true })
  sidenav!: MatSidenav;

  reason = "";
  openWithSwipe = false;

  close(reason: string) {
    this.reason = reason;
    this.sidenav.close();
  }

  canOpenSidebar(): boolean {
    // Check if the current route is not the blog route.
    return !this.location.path().includes("/blog");
  }

  toggleDarkTheme(checked: boolean) {
    // Store in local storage.
    localStorage.setItem("isDarkTheme", JSON.stringify(checked));

    //Get item from localStorage
    this.storedTheme = JSON.parse(localStorage.getItem("isDarkTheme") || "");

    if (!this.storedTheme) {
      this.isDarkTheme = of(false);
    } else {
      this.isDarkTheme = of(true);
    }

    this.themeService.setDarkTheme(checked);
    this.imageSRC = checked
      ? "assets/AM New Logo Light 2020.png"
      : "assets/AM NEW Logo 2020.png";
    this.themeDescription = checked ? "Dark Theme" : "Light Theme";
  }

  ngOnInit() {
    // Toggle Light/Dark Theme
    this.isDarkTheme = this.themeService.isDarkTheme;
    this.storedTheme = JSON.parse(localStorage.getItem("isDarkTheme") || "");

    if (this.storedTheme) {
      this.checked = true;
      this.isDarkTheme = of(true);
      this.toggleDarkTheme(this.checked);
    }

    // SW - Reload fresh instance of app, if new version is available.
    if (this.swUpdate.isEnabled) {
      this.swUpdate.versionUpdates.subscribe((event) => {
        if (event.type === "VERSION_READY") {
          if (confirm("New version available. Load New Version?")) {
            window.location.reload();
          }
        }
      });
    }
  }
}
