import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { RouterModule, Routes } from "@angular/router";

import { CardComponent } from "../../Components/card/card.component";
import { ProductsComponent } from "./products.component";
import { BubblesComponent } from "../../Components/bubbles/bubbles.component";

const routes: Routes = [
  {
    path: "",
    component: ProductsComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    CardComponent,
    RouterModule.forChild(routes),
    BubblesComponent,
    ProductsComponent,
  ],
})
export class ProductsModule {}
