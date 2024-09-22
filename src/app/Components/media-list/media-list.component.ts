import { Component, Inject, Input, OnInit } from "@angular/core";
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogConfig,
} from "@angular/material/dialog";
import { filter, map, sortBy, uniq } from "lodash";

import * as Images from "../../../assets/Images.json";

export interface ImagesJson {
  images: Image[];
}

export interface Image {
  title: string;
  src: string;
  description: string;
  date: string;
  likes: number;
}

@Component({
  selector: "app-media-list",
  templateUrl: "./media-list.component.html",
  styleUrls: ["./media-list.component.scss"],
})
export class MediaListComponent implements OnInit {
  images = Images;
  Videos: any;
  count!: string;
  chipValue: any;
  locations: any[] = [];
  locationCount = 0;
  search!: boolean;
  modal!: boolean;
  @Input()
  name!: string;

  message = "Wow! Check this photo out at https://andrewmulleady.ie/gallery";

  constructor(public dialog: MatDialog) {}

  ngOnInit() {
    this.getImages();
    this.getUniqueNames();
  }

  expand() {
    this.search = !this.search;
  }

  getImages() {
    this.images = Images;
    this.images = sortBy(this.images, "title");
    this.count = `${"Viewing all " + this.images.length + " images"}`;
  }

  getUniqueNames() {
    // unique location names for chip list & count
    // this.locations = _.sortBy(this.images, "title");
    let locationsArray;

    locationsArray = uniq(map(this.images, "title"));
    locationsArray.forEach((location: any) => {
      this.locationCount = filter(this.images, { title: location }).length;
      this.locations = [
        ...this.locations,
        { name: location, locationCount: this.locationCount },
      ];
    });
    const totalCount = this.images.length;
    this.locations.unshift({
      name: "All",
      locationCount: totalCount,
      selected: true,
    });
  }

  toggleSelection(location: any) {
    if (location.name == "All") {
      this.getImages();
    }
    this.locations.forEach((loc) => (loc.selected = false)); // Deselect all locations
    location.selected = !location.selected; // Toggle the selected chip
  }

  sortByName(name: string) {
    // based on chip selected, dislay those items
    // input value from chip
    this.images = Images;
    this.images = filter(this.images, { title: name });
    this.count = `${"Viewing " + this.images.length + " images from " + name}`;
  }

  WhatsApp() {
    window.open(
      "https://api.whatsapp.com/send?text=" + encodeURI(this.message),
      "_blank",
    );
  }

  Pexels() {
    window.open("https://www.pexels.com/@andrew-mulleady-24039905", "_blank");
  }

  Tip() {
    window.open("https://buy.stripe.com/dR6fZzaRhczXdjy3cc", "_blank");
  }

  openModal(image: Image) {
    const dialogConfig = new MatDialogConfig();
    const { src } = image;
    dialogConfig.maxWidth = "100%";
    dialogConfig.height = "100vh";
    dialogConfig.panelClass = "custom-dialog";
    (dialogConfig.data = {
      src: src,
    }),
      this.dialog.open(DialogElementsExampleDialog, dialogConfig);
  }
}

@Component({
  selector: "dialog-elements-example-dialog",
  template: `
    <img src="{{ image.src }}" mat-dialog-close alt="Photo of scenery" />
  `,
})
export class DialogElementsExampleDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public image: Image) {}
}
