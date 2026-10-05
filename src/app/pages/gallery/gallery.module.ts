import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { BubblesComponent } from "../../Components/bubbles/bubbles.component";
import { MediaListComponent } from "../../Components/media-list/media-list.component";
import { PricingCardComponent } from "../../Components/pricing-card/pricing-card.component";
import { GalleryComponent } from "./gallery.component";

const routes: Routes = [
  {
    path: "",
    component: GalleryComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    MediaListComponent,
    RouterModule.forChild(routes),
    BubblesComponent,
    PricingCardComponent,
    GalleryComponent,
  ],
})
export class GalleryModule {}
