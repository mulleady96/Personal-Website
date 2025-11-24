import { CommonModule, NgOptimizedImage } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CountUpModule } from "ngx-countup";
import { BubblesComponent } from "src/app/Components/bubbles/bubbles.component";

import { AppMaterialModule } from "../../../app/app-material.module";
import { ComponentsModule } from "../../Components/components.module";
import { StackedCardsComponent } from "../../Components/stacked-cards/stacked-cards.component";
import { HomeComponent } from "./home.component";

const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
  },
];

@NgModule({
    imports: [
        CommonModule,
        CountUpModule,
        ComponentsModule,
        BubblesComponent,
        AppMaterialModule,
        NgOptimizedImage,
        RouterModule.forChild(routes),
        StackedCardsComponent,
        HomeComponent,
    ],
})
export class HomeModule {}
