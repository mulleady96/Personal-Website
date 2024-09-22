import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { RouterModule,Routes } from "@angular/router";

import { AppMaterialModule } from "../../../app/app-material.module";
import { ComponentsModule } from "../../Components/components.module";
import { GalleryComponent } from "./gallery.component";

const routes: Routes = [
  {
    path: "",
    component: GalleryComponent,
  },
];

@NgModule({
  declarations: [GalleryComponent],
  imports: [
    CommonModule,
    AppMaterialModule,
    ComponentsModule,
    HttpClientModule,
    RouterModule.forChild(routes),
  ],
})
export class GalleryModule {}
