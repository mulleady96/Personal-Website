import { Component, Output, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import * as firebase from 'firebase/app';
import { config } from './credentials';
import { Router, NavigationEnd } from '@angular/router';
import { NgProgress, NgProgressRef } from '@ngx-progressbar/core';
import { MatSidenav } from '@angular/material/sidenav';
import { SwUpdate } from '@angular/service-worker';

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
export class AppComponent implements OnInit {
  // Place google analytics code in app.component => only want to run once.
  title = 'Gravita Tech';

  @Output()
  navToggle = new EventEmitter();

  progressRef: NgProgressRef;

  constructor(private router: Router, private progress: NgProgress,
    private swUpdate: SwUpdate) {

    this.initializeApp();

    // Subscribe to router nav event => on route change, sends page view data to GA
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        (<any>window).ga('set', 'page', event.urlAfterRedirects);
        (<any>window).ga('send', 'pageview');
      }
    });
  }

  @ViewChild('sidenav') sidenav: MatSidenav;

  reason = '';

  close(reason: string) {
    this.reason = reason;
    this.sidenav.close();
  }

  ngOnInit() { // Progress loading bar @ top of page.
    //this.progressRef = this.progress.ref('myProgress');

    if (this.swUpdate.isEnabled){
      this.swUpdate.available.subscribe(() => {
        if (confirm("New version available. Load New Version?")) {

          window.location.reload();
      }
      });
    }
  }

  initializeApp() {
    firebase.initializeApp(config);
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
      eventValue: 10
    });
  }
}
