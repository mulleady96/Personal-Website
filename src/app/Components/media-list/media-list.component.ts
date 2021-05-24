import { Component, Inject, Input, OnInit } from '@angular/core';
import { Images } from '../../../assets/Images.json';
import {MatDialog, MatDialogConfig, MAT_DIALOG_DATA} from '@angular/material/dialog';
import * as _ from 'lodash';

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
  modal: boolean;
  @Input() name: string;


  message = 'Wow! Check this photo out at https://andrewmulleady.ie/gallery';

  constructor(private dialog: MatDialog) {
  }

  ngOnInit() {
    this.getImages();
    this.getUniqueNames();
  }

  expand() {
    this.search = !this.search;
  }

  getImages(){
    this.images = Images;
    this.images = _.sortBy(this.images, 'title');
    this.count = this.images.length;
  }

  getUniqueNames() {
    // unique location names for chip list
    this.locations = _.sortBy(this.images, 'title');
    this.locations = _.uniq(_.map(this.locations, 'title'));
  }

  sortByName(name) {
    // based on chip selected, dislay those items
     // input value from chip
    this.images = Images;
   this.images = _.filter(this.images, {title: name});
   this.count = this.images.length;
  }

  WhatsApp() {
    window.open("https://api.whatsapp.com/send?text=" + encodeURI(this.message), '_blank');
  }

  openModal(image: Image) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.maxWidth = '100%';
    dialogConfig.height = '100vh';
    dialogConfig.panelClass = 'custom-dialog';
    dialogConfig.data = {
      src: image
    },
    this.dialog.open(DialogElementsExampleDialog, dialogConfig);
  }
}

@Component({
  selector: 'dialog-elements-example-dialog',
  template: `
  <img src="{{ image.src }}" mat-dialog-close alt="Photo of scenery" />
  `,
})
export class DialogElementsExampleDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public image: Image) {}
}


