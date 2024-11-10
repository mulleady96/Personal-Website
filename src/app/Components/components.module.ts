import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import { MatChipListbox } from "@angular/material/chips";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

import { AppMaterialModule } from "../app-material.module";
import { InvisibleDirective } from "../Directives/invisible.directive";
import { UnderlineHoverDirective } from "../Directives/underline-hover.directive";
import { AuthComponent } from "./auth/auth.component";
import { BubblesComponent } from "./bubbles/bubbles.component";
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
  ],
  imports: [
    MatCardModule,
    CommonModule,
    HttpClientModule,
    AppMaterialModule,
    FontAwesomeModule,
  ],
  exports: [
    FlashCardComponent,
    MediaListComponent,
    BubblesComponent,
    AuthComponent,
    EmailSignUpComponent,
    SearchButtonComponent,
    DialogElementsExampleDialog,
    UnderlineHoverDirective,
    InvisibleDirective,
    AppMaterialModule,
  ],
})
export class ComponentsModule {}
