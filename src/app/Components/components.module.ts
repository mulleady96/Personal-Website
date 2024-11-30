import { CommonModule, NgOptimizedImage } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import { RouterModule } from "@angular/router";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

import { AppMaterialModule } from "../app-material.module";
import { InvisibleDirective } from "../Directives/invisible.directive";
import { UnderlineHoverDirective } from "../Directives/underline-hover.directive";
import { AuthComponent } from "./auth/auth.component";
import { BubblesComponent } from "./bubbles/bubbles.component";
import { CardComponent } from "./card/card.component";
import { EmailSignUpComponent } from "./email-sign-up/email-sign-up.component";
import { FlashCardComponent } from "./flash-card/flash-card.component";
import {
  DialogElementsExampleDialog,
  MediaListComponent,
} from "./media-list/media-list.component";
import { SearchButtonComponent } from "./search-button/search-button.component";

@NgModule({
  declarations: [
    FlashCardComponent,
    MediaListComponent,
    DialogElementsExampleDialog,
    UnderlineHoverDirective,
    InvisibleDirective,
    BubblesComponent,
    AuthComponent,
    EmailSignUpComponent,
    SearchButtonComponent,
    CardComponent,
  ],
  imports: [
    MatCardModule,
    CommonModule,
    HttpClientModule,
    AppMaterialModule,
    FontAwesomeModule,
    RouterModule,
    NgOptimizedImage,
  ],
  exports: [
    FlashCardComponent,
    MediaListComponent,
    BubblesComponent,
    AuthComponent,
    EmailSignUpComponent,
    SearchButtonComponent,
    CardComponent,
    DialogElementsExampleDialog,
    UnderlineHoverDirective,
    InvisibleDirective,
    AppMaterialModule,
  ],
})
export class ComponentsModule {}
