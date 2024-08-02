import { Location } from "@angular/common";
import { Component, Inject, Input, OnInit } from "@angular/core";
import * as Images from "../../../assets/Images.json";
import {
  MatDialog,
  MatDialogConfig,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import * as _ from "lodash";

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
  Videos;
  count;
  chipValue;
  locations = [];
  locationCount = 0;
  search: boolean;
  modal: boolean;
  @Input() name: string;

  message = "Wow! Check this photo out at https://andrewmulleady.ie/gallery";

  constructor(private dialog: MatDialog) {}

  ngOnInit() {
    this.getImages();
    this.getUniqueNames();
  }

  expand() {
    this.search = !this.search;
  }

  getImages() {
    this.images = Images;
    this.images = _.sortBy(this.images, "title");
    this.count = `${"Viewing all " + this.images.length + " images"}`;
  }

  getUniqueNames() {
    // unique location names for chip list & count
    // this.locations = _.sortBy(this.images, "title");
    let locationsArray;

    locationsArray = _.uniq(_.map(this.images, "title"));
    locationsArray.forEach((location) => {
      this.locationCount = _.filter(this.images, { title: location }).length;
      this.locations = [
        ...this.locations,
        { name: location, locationCount: this.locationCount },
      ];
    });
  }

  toggleSelection(location: any) {
    if (location.name !== "All") {
      this.locations.forEach((loc) => (loc.selected = false)); // Deselect all locations
    } else {
      this.locations.forEach((loc) => {
        if (loc.name === "All") {
          loc.selected = false; // Deselect the "All" chip if a location is selected
        }
      });
    }
    location.selected = !location.selected; // Toggle the selected chip
  }

  isAllSelected(): boolean {
    return !this.locations.some((location) => location.selected);
  }

  sortByName(name) {
    // based on chip selected, dislay those items
    // input value from chip
    this.images = Images;
    this.images = _.filter(this.images, { title: name });
    this.count = `${"Viewing " + this.images.length + " images from " + name}`;
  }

  WhatsApp() {
    window.open(
      "https://api.whatsapp.com/send?text=" + encodeURI(this.message),
      "_blank"
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
    dialogConfig.maxWidth = "100%";
    dialogConfig.height = "100vh";
    dialogConfig.panelClass = "custom-dialog";
    (dialogConfig.data = {
      src: image,
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
