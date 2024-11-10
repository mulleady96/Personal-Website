import { Component, Inject, Input, OnInit } from "@angular/core";
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogConfig,
} from "@angular/material/dialog";

import * as Images from "../../../assets/Images.json";

type location = {
  name: string;
  locationCount: number;
  selected: boolean;
};

interface Image {
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
  imageList = this.images.images;
  count!: string;
  locations: location[] = [];
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

  onSearchChange(search: boolean) {
    this.search = search;
  }

  expand() {
    this.search = !this.search;
  }

  getImages() {
    this.imageList.sort((a, b) => a.title.localeCompare(b.title));
    this.count = `Viewing all ${this.imageList.length} images`;
  }

  getUniqueNames() {
    // unique location names for chip list & count
    const locationSet = new Set();
    const locationCountMap = new Map();

    // Get unique location names and count occurrences
    for (const image of this.imageList) {
      locationSet.add(image.title);
      const count = locationCountMap.get(image.title) || 0;
      locationCountMap.set(image.title, count + 1);
    }

    this.locations = [];

    // Create location objects with name and count
    for (const location of locationSet) {
      this.locations.push({
        name: location as string,
        locationCount: locationCountMap.get(location),
        selected: false,
      });
    }

    const totalCount = this.imageList.length;
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
    // based on chip selected, display those items
    // input value from chip
    // this.images = Images;
    console.log(name);
    this.imageList = this.images.images;
    this.imageList = this.imageList.filter((image) => image.title === name);
    if (this.imageList.length === 0) {
      this.imageList = this.images.images;
    }
    console.log(this.imageList);

    this.count = `Viewing ${this.imageList.length} images from ${name}`;
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
    dialogConfig.data = {
      src: src,
    };
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
