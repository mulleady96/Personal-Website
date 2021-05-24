import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-flash-card',
  templateUrl: './flash-card.component.html',
  styleUrls: ['./flash-card.component.css']
})
export class FlashCardComponent implements OnInit {

  flipped = false;

  constructor() {
  }

  ngOnInit() {
  }

  flip() {
    this.flipped = !this.flipped;
  }

}
