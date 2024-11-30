import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CountUpModule } from "ngx-countup";

import { AppMaterialModule } from "../../../app/app-material.module";
import { ComponentsModule } from "../../Components/components.module";
import { HomeComponent } from "./home.component";

const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
  },
];

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    CountUpModule,
    ComponentsModule,
    AppMaterialModule,
    RouterModule.forChild(routes),
  ],
})
export class HomeModule {}
