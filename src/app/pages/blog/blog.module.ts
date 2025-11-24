import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatProgressBarModule } from "@angular/material/progress-bar";
// import { CopyDirective } from '../../Directives/copy.directive';
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatSelectModule } from "@angular/material/select";
import { RouterModule, Routes } from "@angular/router";
import { MarkdownModule } from "ngx-markdown";
import { SearchButtonComponent } from "src/app/Components/search-button/search-button.component";

import { AppMaterialModule } from "../../../app/app-material.module";
import { ComponentsModule } from "../../Components/components.module";
import { EllipsisDirective } from "../../Directives/ellipsis.directive";
import { TypingAnimationDirective } from "../../Directives/typing-animation.directive";
import { BlogComponent } from "./blog.component";

const routes: Routes = [
  {
    path: "",
    component: BlogComponent,
  },
];

@NgModule({
    imports: [
        CommonModule,
        ComponentsModule,
        MatProgressSpinnerModule,
        MatProgressBarModule,
        MatSelectModule,
        MatFormFieldModule,
        SearchButtonComponent,
        MatInputModule,
        AppMaterialModule,
        MarkdownModule.forRoot(),
        RouterModule.forChild(routes),
        BlogComponent, TypingAnimationDirective, EllipsisDirective,
    ],
})
export class BlogModule {}
