import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { BlogComponent } from "./blog.component";
import { AppMaterialModule } from "src/app/app-material.module";
import { MarkdownModule } from "ngx-markdown";
import { TypingAnimationDirective } from "src/app/Directives/typing-animation.directive";
import { CopyDirective } from "src/app/Directives/copy.directive";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { ComponentsModule } from "src/app/Components/components.module";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatFormFieldModule } from "@angular/material/form-field";
import { EllipsisDirective } from "src/app/Directives/ellipsis.directive";
const routes: Routes = [
  {
    path: "",
    component: BlogComponent,
  },
];

@NgModule({
  declarations: [
    BlogComponent,
    TypingAnimationDirective,
    CopyDirective,
    EllipsisDirective,
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    AppMaterialModule,
    MarkdownModule.forRoot(),
    RouterModule.forChild(routes),
  ],
})
export class BlogModule {}
