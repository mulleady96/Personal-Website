import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule,Routes } from "@angular/router";

import { AppMaterialModule } from "../../app-material.module";
import { AboutComponent } from "./about.component";

const routes: Routes = [
  {
    path: "",
    component: AboutComponent,
  },
];

@NgModule({
  declarations: [AboutComponent],
  imports: [CommonModule, AppMaterialModule, RouterModule.forChild(routes)],
})
export class AboutModule {}
