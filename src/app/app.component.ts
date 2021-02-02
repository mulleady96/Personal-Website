import {
  Component,
  Output,
  EventEmitter,
  OnInit,
  ViewChild,
} from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import * as firebase from 'firebase/app';
import { config } from './credentials';
import { Router, NavigationEnd } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';
import { SwUpdate } from '@angular/service-worker';
import { ThemeService } from './Services/theme.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    // Slide items up from the bottom of screen.
    trigger('itemState', [
      transition('void => *', [
        style({ transform: 'translateY(100%)' }),
        animate('0.6s ease-in-out'),
      ]),
      transition('* => void', [
        animate('0.6s ease-in-out', style({ transform: 'translateY(100%)' })),
      ]),
    ]),
  ],
})
export class AppComponent implements OnInit {
  // Place google analytics code in app.component => only want to run once.
  title = 'Andrew Mulleady';

  @Output()
  navToggle = new EventEmitter();

  isDarkTheme: Observable<boolean>;
  themeDescription: string;
  iconValue = 'nights_stay';
  imageSRC = 'assets/AM NEW Logo 2020.png';
  storedTheme: boolean;
  checked: boolean;

  constructor(
    private router: Router,
    private swUpdate: SwUpdate,
    private themeService: ThemeService
  ) {
    this.initializeApp();

    this.themeDescription = 'Dark Theme';

    // Subscribe to router nav event => on route change, sends page view data to GA
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        (<any>window).ga('set', 'page', event.urlAfterRedirects);
        (<any>window).ga('send', 'pageview');
      }
    });
  }

  @ViewChild('sidenav', { static: true }) sidenav: MatSidenav;

  reason = '';

  close(reason: string) {
    this.reason = reason;
    this.sidenav.close();
  }

  toggleDarkTheme(checked) {
    // Store in local storage.
    // localStorage.setItem('this.isDarkTheme',  JSON.stringify(this.isDarkTheme));

    // Get item from localStorage
    // this.storedTheme = JSON.parse(localStorage.getItem('this.isDarkTheme'));
   // console.log(this.isDarkTheme);

    this.themeService.setDarkTheme(checked);
    checked ? (this.imageSRC = 'assets/AM New Logo Light 2020.png') : (this.imageSRC = 'assets/AM NEW Logo 2020.png');
    checked
      ? (this.themeDescription = 'Light Theme')
      : (this.themeDescription = 'Dark Theme');
    checked
      ? (this.iconValue = 'wb_sunny')
      : (this.iconValue = 'nights_stay');

  }

  ngOnInit() {
    // Toggle Light/Dark Theme
    this.isDarkTheme = this.themeService.isDarkTheme;

    // SW - Reload fresh instance of app, if new version is available.
    if (this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe(() => {
        if (confirm('New version available. Load New Version?')) {
          window.location.reload();
        }
      });
    }
  }

  initializeApp() {
    firebase.default.initializeApp(config);
  }

  // navBarToggle() {
  //   this.navToggle.emit();
  // }

  // toggleNav() {
  // this.navBarOpen = !this.navBarOpen;
  // }

  // GA tracking to see how frequently users interact with menu button.
  menuToggleEvent() {
    (<any>window).ga('send', 'event', {
      eventCategory: 'Menu',
      eventLabel: 'Menu Toggle',
      eventAction: 'Menu Toggle Event',
      eventValue: 10,
    });
  }
}
