import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { RouterModule, Routes } from "@angular/router";

import { AppMaterialModule } from "../../../app/app-material.module";
import { ComponentsModule } from "../../Components/components.module";
import { ProductsComponent } from "./products.component";
import { BubblesComponent } from "../../Components/bubbles/bubbles.component";

const routes: Routes = [
  {
    path: "",
    component: ProductsComponent,
  },
];

@NgModule({
  declarations: [ProductsComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    AppMaterialModule,
    ComponentsModule,
    RouterModule.forChild(routes),
    BubblesComponent,
  ],
})
export class ProductsModule {}
