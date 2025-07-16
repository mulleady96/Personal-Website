import { animate, style, transition, trigger } from "@angular/animations";
import { OverlayContainer } from "@angular/cdk/overlay";
import { Location } from "@angular/common";
import {
  Component,
  EventEmitter,
  HostBinding,
  OnInit,
  Output,
  ViewChild,
} from "@angular/core";
import { MatSidenav } from "@angular/material/sidenav";
import { SwUpdate } from "@angular/service-worker";
import { Observable, of } from "rxjs";

// import * as firebase from "firebase/app";
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

  isDarkTheme!: boolean;
  themeDescription: string;
  iconValue = "nights_stay";
  imageSRC = "assets/AM NEW Logo 2020.png";
  storedTheme!: boolean;
  checked!: boolean;

  constructor(
    private swUpdate: SwUpdate,
    private themeService: ThemeService,
    private location: Location,
    private overlayContainer: OverlayContainer,
  ) {
    // initializeApp(config);
    this.themeDescription = "Light Theme";
  }

  @ViewChild("sidenav", { static: true })
  @HostBinding("class")
  className = "";
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

  onThemeChange(checked: boolean): void {
    // Save the new state to localStorage
    localStorage.setItem("isDarkTheme", JSON.stringify(checked));

    // Update all theme-related properties and classes
    this.updateTheme(checked);
  }

  private updateTheme(isDark: boolean): void {
    this.isDarkTheme = isDark;
    const darkThemeClass = "dark-theme";

    // Update overlay container for dialogs, menus, etc.
    const overlayContainerClasses =
      this.overlayContainer.getContainerElement().classList;

    if (isDark) {
      this.className = darkThemeClass; // Assumes HostBinding('class')
      overlayContainerClasses.add(darkThemeClass);
    } else {
      this.className = "";
      overlayContainerClasses.remove(darkThemeClass);
    }

    // Update other theme-dependent properties
    this.imageSRC = isDark
      ? "assets/AM New Logo Light 2020.png"
      : "assets/AM NEW Logo 2020.png";
    this.themeDescription = isDark ? "Dark Theme" : "Light Theme";

    // Notify the service
    this.themeService.setDarkTheme(isDark);
  }
  ngOnInit() {
    // Toggle Light/Dark Theme
    // Get stored theme, default to false if nothing is stored
    const storedTheme = localStorage.getItem("isDarkTheme");
    const initialThemeState = storedTheme ? JSON.parse(storedTheme) : false;

    // Set the initial theme based on the stored value
    this.updateTheme(initialThemeState);

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
