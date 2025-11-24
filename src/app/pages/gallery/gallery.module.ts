import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AppMaterialModule } from "../../../app/app-material.module";
import { BubblesComponent } from "../../Components/bubbles/bubbles.component";
import { ComponentsModule } from "../../Components/components.module";
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
        AppMaterialModule,
        ComponentsModule,
        RouterModule.forChild(routes),
        BubblesComponent,
        PricingCardComponent,
        GalleryComponent,
    ],
})
export class GalleryModule {}
