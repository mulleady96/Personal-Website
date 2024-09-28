import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { MatCardModule } from "@angular/material/card";
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
    DialogElementsExampleDialog,
    UnderlineHoverDirective,
    InvisibleDirective,
    AppMaterialModule,
  ],
})
export class ComponentsModule {}
