import { Component, Output, EventEmitter } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import * as firebase from 'firebase/app';
import { config } from './credentials';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [ // Slide items up from the bottom of screen.
        trigger('itemState', [
            transition('void => *', [
                style({transform: 'translateY(100%)'}),
                animate('0.6s ease-in-out')
            ]),
            transition('* => void', [
                animate('0.6s ease-in-out', style({transform: 'translateY(100%)'}))
            ])
        ])
    ]
})
export class AppComponent {
  // Place google analytics code in app.component => only want to run once.
  title = 'Gravita Tech';

  @Output()
  navToggle = new EventEmitter();

  constructor(private router: Router){
    this.initializeApp()

    // Subscribe to router nav event => on route change, sends page view data to GA
    this.router.events.subscribe(event => {
      if(event instanceof NavigationEnd) {
        (<any>window).ga('set', 'page', event.urlAfterRedirects);
        (<any>window).ga('send', 'pageview');
      }
    });
  }

  navBarOpen = false;


  initializeApp(){
    firebase.initializeApp(config);
  }

  navBarToggle(){
    this.navToggle.emit();
  }


  toggleNav(){
  this.navBarOpen = !this.navBarOpen;
  }

  // GA tracking to see how frequently users interact with menu button.
  menuToggleEvent(){
    (<any>window).ga('send', 'event', {
      eventCategory: 'Menu',
      eventLabel: 'Menu Toggle',
      eventAction: 'Menu Toggle Event',
      eventValue: 10
    });
  }
}
