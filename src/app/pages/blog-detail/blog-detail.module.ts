import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { BlogDetailComponent } from "./blog-detail.component";

const routes: Routes = [
  {
    path: "",
    component: BlogDetailComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    RouterModule.forChild(routes),
    BlogDetailComponent,
  ],
})
export class BlogDetailModule {}
