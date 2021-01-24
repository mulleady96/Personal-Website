import { GravitaService } from './../../Services/gravita.service';
import { Component, Input, OnInit } from '@angular/core';
import { Images } from '../../../assets/Images.json';
import * as _ from 'lodash';
import { CountUpOptions } from 'countup.js';

export interface ImagesJson {
  images: Image[];
}

export interface Image {
  "title" : string;
  "src" : string;
  "description" : string;
  "date" : string;
  "likes" : number;
}

@Component({
  selector: 'app-media-list',
  templateUrl: './media-list.component.html',
  styleUrls: ['./media-list.component.scss']
})


export class MediaListComponent implements OnInit {


  images = Images;
  Videos;
  count;
  chipValue;
  locations = [];
  search: boolean;
  @Input() name: string;
  opts: CountUpOptions;


  message = 'Wow! Check this photo out at https://andrewmulleady.ie/gallery';

  constructor() {
  }

  ngOnInit() {
    this.getImages();
    this.getUniqueNames();
    this.useOptions();
  }

  expand() {
    this.search = !this.search;
  }
  

  getImages(){
    this.images = Images;
    this.images = _.sortBy(this.images, 'title');
    this.count = this.images.length;
    console.log(this.images);

  }

  getUniqueNames() {
    // unique location names for chip list
    this.locations = _.sortBy(this.images, 'title');
    this.locations = _.uniq(_.map(this.locations, 'title'));
    console.log(this.locations);
  }

  sortByName(name) {
    // based on chip selected, dislay those items
     // input value from chip
    this.images = Images;
   this.images = _.filter(this.images, {title: name});
   this.count = this.images.length;
   return console.log(this.images);
  }

  WhatsApp() {
    window.open("https://api.whatsapp.com/send?text=" + encodeURI(this.message), '_blank');
  }

  useOptions = () => {
    this.opts = {
      startVal: this.count,
      duration: 6,
      separator: ','
    };
  }

  
}

