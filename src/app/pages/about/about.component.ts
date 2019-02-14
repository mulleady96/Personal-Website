import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
  animations: [ // Slide items up from the bottom of screen.
        trigger('itemState', [
            transition('void => *', [
                style({transform: 'translateX(100%)'}),
                animate('0.6s ease-in-out')
            ]),
            transition('* => void', [
                animate('0.6s ease-in-out', style({transform: 'translateX(100%)'}))
            ])
        ])
    ]
})
export class AboutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  sendClickEvent(url){
    // Event to track how many users click Github button.
    (<any>window).ga('send', 'event', {
      eventCategory: 'Github button clicked',
      transport: 'beacon',
      hitCallback: function(){
        this.redirect("https://github.com/mulleady96")
      },
      eventLabel: 'Clicked',
      eventAction: 'User redirected',
      eventValue: 5
    });
  }

}
