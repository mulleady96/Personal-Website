import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { CountUpOptions } from 'countup.js';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
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
export class HomeComponent implements OnInit {

    opts: CountUpOptions;
    showDiv: boolean = false;

  constructor() {
  }

  ngOnInit() {
      this.useOptions();
  }

  toggleDiv(){
      this.showDiv = !this.showDiv;
  }

  useOptions() {
    this.opts = {
      duration: 6,
      separator: ','
    };
  }
}
