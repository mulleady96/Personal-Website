import { Component, Output, EventEmitter } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import * as firebase from 'firebase/app';
import { config } from './credentials';

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
  title = 'Gravita Tech';

  @Output()
  navToggle = new EventEmitter();

  constructor(){
    this.initializeApp()
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


}
