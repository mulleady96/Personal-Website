import { CommonModule, NgOptimizedImage } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CountUpModule } from "ngx-countup";
import { BubblesComponent } from "src/app/Components/bubbles/bubbles.component";

import { MatButtonModule } from "@angular/material/button";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatIconModule } from "@angular/material/icon";
import { CardComponent } from "../../Components/card/card.component";
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
    CardComponent,
    BubblesComponent,
    MatButtonModule,
    MatTooltipModule,
    MatIconModule,
    NgOptimizedImage,
    RouterModule.forChild(routes),
    HomeComponent,
  ],
})
export class HomeModule {}
