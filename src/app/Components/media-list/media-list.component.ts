import { Component, Inject, Input, OnInit, HostListener } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogClose } from "@angular/material/dialog";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import { ActivatedRoute } from "@angular/router";

import * as Images from "../../../assets/Images.json";
import { SearchButtonComponent } from "../search-button/search-button.component";
import { MatChipSet, MatChip } from "@angular/material/chips";
import { MatBadge } from "@angular/material/badge";
import { NgClass } from "@angular/common";
import { ExtendedModule } from "@angular/flex-layout/extended";
import { MatList } from "@angular/material/list";
import { FlexModule } from "@angular/flex-layout/flex";
import { UnderlineHoverDirective } from "../../Directives/underline-hover.directive";
import { InvisibleDirective } from "../../Directives/invisible.directive";
import { MatButton, MatMiniFabButton } from "@angular/material/button";
import { MatMenuTrigger, MatMenu, MatMenuItem } from "@angular/material/menu";
import { MatIcon } from "@angular/material/icon";
import { PricingDialogComponent } from "../pricing-dialog/pricing-dialog.component";

type location = {
  name: string;
  locationCount: number;
  selected: boolean;
};

interface MediaItem {
  title: string;
  src: string;
  description: string;
  date: string;
  likes: number;
  type: 'image' | 'video';
}

@Component({
    selector: "app-media-list",
    templateUrl: "./media-list.component.html",
    styleUrls: ["./media-list.component.scss"],
    imports: [SearchButtonComponent, MatChipSet, MatChip, MatBadge, NgClass, ExtendedModule, MatList, FlexModule, UnderlineHoverDirective, InvisibleDirective, MatButton, MatMenuTrigger, MatIcon, MatMenu, MatMenuItem]
})
export class MediaListComponent implements OnInit {
  images = Images;
  imageList: MediaItem[] = this.images.images as MediaItem[];
  count!: string;
  locations: location[] = [];
  locationCount = 0;
  search!: boolean;
  modal!: boolean;
  @Input()
  name!: string;

  message = "Wow! Check this photo out at https://andrewmulleady.ie/gallery";

  constructor(
    public dialog: MatDialog,
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.getImages();
    this.getUniqueNames();

    this.route.queryParams.subscribe(params => {
      if (params['unlock-collection'] !== undefined) {
        this.openPricingDialog();
      }
    });
  }

  onSearchChange(search: boolean) {
    this.search = search;
  }

  expand() {
    this.search = !this.search;
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

  toggleSelection(location: location) {
    if (location.name === "All") {
      // If "All" is clicked, select it and deselect everything else
      this.locations.forEach((loc) => (loc.selected = false));
      location.selected = true;
    } else {
      // If any other chip is clicked
      location.selected = !location.selected;

      // Deselect "All" if it was selected
      const allLoc = this.locations.find(l => l.name === "All");
      if (allLoc && allLoc.selected) {
        allLoc.selected = false;
      }

      // If nothing is selected after toggle, re-select "All"
      const anySelected = this.locations.some(l => l.selected);
      if (!anySelected && allLoc) {
        allLoc.selected = true;
      }
    }

    this.filterMedia();
  }

  filterMedia() {
    const selectedLocations = this.locations.filter(l => l.selected).map(l => l.name);
    const allSelected = selectedLocations.includes("All");

    if (allSelected || selectedLocations.length === 0) {
      this.imageList = this.images.images as MediaItem[];
    } else {
      this.imageList = (this.images.images as MediaItem[]).filter(item => 
        selectedLocations.includes(item.title)
      );
    }

    this.updateCount();
  }

  updateCount() {
    const imageCount = this.imageList.filter(item => item.type === 'image' || !item.type).length;
    const videoCount = this.imageList.filter(item => item.type === 'video').length;
    
    const parts = [];
    if (imageCount > 0) parts.push(`${imageCount} image${imageCount !== 1 ? 's' : ''}`);
    if (videoCount > 0) parts.push(`${videoCount} video${videoCount !== 1 ? 's' : ''}`);
    
    if (parts.length === 0) {
      this.count = "No media found";
    } else {
      this.count = `Viewing ${parts.join(' and ')}`;
    }
  }

  getImages() {
    this.imageList = this.images.images as MediaItem[];
    this.imageList.sort((a, b) => a.title.localeCompare(b.title));
    this.updateCount();
  }


  openPricingDialog(): void {
    this.dialog.open(PricingDialogComponent, {
      width: "360px", // Set a width for the dialog
    });
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

  getSafeUrl(url: string): SafeResourceUrl {
    let videoId = '';
    if (url.includes('youtu.be')) {
        videoId = url.split('/').pop() || '';
    } else if (url.includes('youtube.com')) {
        const params = new URLSearchParams(url.split('?')[1]);
        videoId = params.get('v') || '';
    }
    
    if (videoId) {
        return this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${videoId}`);
    } else {
        return this.sanitizer.bypassSecurityTrustResourceUrl(url); // Fallback
    }
  }

  openModal(image: MediaItem) {
    if (image.type === 'video') return; // Don't open modal for videos
    
    const index = this.imageList.indexOf(image);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.maxWidth = "100%";
    dialogConfig.height = "100vh";
    dialogConfig.panelClass = "custom-dialog";
    dialogConfig.data = {
      images: this.imageList,
      initialIndex: index
    };
    this.dialog.open(DialogElementsExampleDialog, dialogConfig);
  }
}

@Component({
    selector: "dialog-elements-example-dialog",
    template: `
    <div class="dialog-container">
      <img [src]="currentImage.src" mat-dialog-close alt="Photo of scenery" />
      
      <button matMiniFab class="nav-btn prev-btn" (click)="prev($event)">
        <mat-icon color="accent">chevron_left</mat-icon>
      </button>
      
      <button matMiniFab class="nav-btn next-btn" (click)="next($event)">
        <mat-icon color="accent">chevron_right</mat-icon>
      </button>

      <button matMiniFab class="close-btn" mat-dialog-close>
        <mat-icon>close</mat-icon>
      </button>
    </div>
  `,
  styles: [`
    .dialog-container {
      position: relative;
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    img {
      max-width: 100%;
      max-height: 100vh;
      object-fit: contain;
    }
    .nav-btn {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      z-index: 10;
    }
    .prev-btn { left: 20px; }
    .next-btn { right: 20px; }
    .close-btn {
      position: absolute;
      top: 20px;
      right: 20px;
      z-index: 10;
    }
  `],
    imports: [MatDialogClose, MatButton, MatIcon, MatMiniFabButton]
})
export class DialogElementsExampleDialog implements OnInit {
  currentIndex: number = 0;
  images: MediaItem[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: { images: MediaItem[], initialIndex: number }) {
    this.images = data.images.filter(img => img.type === 'image' || !img.type); // Ensure only images
    this.currentIndex = this.images.findIndex(img => img === data.images[data.initialIndex]);
    if (this.currentIndex === -1) this.currentIndex = 0;
  }

  ngOnInit() {}

  get currentImage(): MediaItem {
    return this.images[this.currentIndex];
  }

  next(event: Event) {
    event.stopPropagation();
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
  }

  prev(event: Event) {
    event.stopPropagation();
    this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'ArrowRight') {
      this.next(new Event('keydown'));
    } else if (event.key === 'ArrowLeft') {
      this.prev(new Event('keydown'));
    }
  }
}
