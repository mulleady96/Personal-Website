import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
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
export class ProductsComponent implements OnInit {

  panelOpenState: boolean;

  constructor() { }

  ngOnInit() {


  }

    flipCard() {
    
    }
}
