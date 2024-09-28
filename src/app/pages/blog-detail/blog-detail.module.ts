import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule,Routes } from "@angular/router";

import { AppMaterialModule } from "../../app-material.module";
import { BlogDetailComponent } from "./blog-detail.component";

const routes: Routes = [
  {
    path: "",
    component: BlogDetailComponent,
  },
];

@NgModule({
  declarations: [BlogDetailComponent],
  imports: [CommonModule, AppMaterialModule, RouterModule.forChild(routes)],
})
export class BlogDetailModule {}
