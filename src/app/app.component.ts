import { animate, style, transition, trigger } from "@angular/animations";
import { OverlayContainer } from "@angular/cdk/overlay";
import { CommonModule, Location } from "@angular/common";
import {
  Component,
  EventEmitter,
  HostBinding,
  inject,
  OnInit,
  Output,
  ViewChild,
} from "@angular/core";
import { MatSidenav } from "@angular/material/sidenav";
import { SwUpdate } from "@angular/service-worker";
import { RouterModule } from "@angular/router";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { FontAwesomeModule, FaIconLibrary } from "@fortawesome/angular-fontawesome";
import { faGithub, faLinkedin, faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { Analytics, logEvent } from "@angular/fire/analytics";

import { ThemeService } from "./Services/theme.service";
import { ComponentsModule } from "./Components/components.module";
import { AppMaterialModule } from "./app-material.module";

import { PricingCardComponent } from "./Components/pricing-card/pricing-card.component";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FlexLayoutModule,
    MatCheckboxModule,
    FontAwesomeModule,
    ComponentsModule,
    AppMaterialModule,
    PricingCardComponent,
  ],
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
  private swUpdate = inject(SwUpdate);
  private themeService = inject(ThemeService);
  private location = inject(Location);
  private overlayContainer = inject(OverlayContainer);
  private library = inject(FaIconLibrary);
  private analytics = inject(Analytics);

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

  constructor() {
    // initializeApp(config);
    this.themeDescription = "Light Theme";
    this.library.addIcons(faGithub, faLinkedin, faWhatsapp);
    logEvent(this.analytics, 'app_load', { page: 'main' });
  }

  @ViewChild("sidenav") sidenav!: MatSidenav;
  @HostBinding("class")
  className = "";

  reason = "";
  openWithSwipe = false;

  close(reason: string) {
    this.reason = reason;
    this.sidenav.close();
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
    // Get stored theme
    const storedTheme = localStorage.getItem("isDarkTheme");
    let initialThemeState = false;

    if (storedTheme) {
      initialThemeState = JSON.parse(storedTheme);
    } else {
      // Check system preference
      initialThemeState = window.matchMedia && 
        window.matchMedia('(prefers-color-scheme: dark)').matches;
    }

    // Set the initial theme based on the stored value or system preference
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

