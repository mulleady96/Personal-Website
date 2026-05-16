import { CommonModule, NgOptimizedImage } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import { RouterModule } from "@angular/router";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { InvisibleDirective } from "../Directives/invisible.directive";
import { UnderlineHoverDirective } from "../Directives/underline-hover.directive";
import { AuthComponent } from "./auth/auth.component";
import { CardComponent } from "./card/card.component";
import { EmailSignUpComponent } from "./email-sign-up/email-sign-up.component";
import { FlashCardComponent } from "./flash-card/flash-card.component";
import {
  DialogElementsExampleDialog,
  MediaListComponent,
} from "./media-list/media-list.component";
import { SearchButtonComponent } from "./search-button/search-button.component";

@NgModule({
    imports: [
        MatCardModule,
        CommonModule,
        HttpClientModule,
        MatButtonModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        MatDialogModule,
        MatTabsModule,
        MatChipsModule,
        MatProgressSpinnerModule,
        FontAwesomeModule,
        RouterModule,
        NgOptimizedImage,
        SearchButtonComponent,
        FlashCardComponent,
        MediaListComponent,
        DialogElementsExampleDialog,
        UnderlineHoverDirective,
        InvisibleDirective,
        AuthComponent,
        EmailSignUpComponent,
        CardComponent,
    ],
    exports: [
        FlashCardComponent,
        MediaListComponent,
        AuthComponent,
        EmailSignUpComponent,
        CardComponent,
        DialogElementsExampleDialog,
        UnderlineHoverDirective,
        InvisibleDirective,

    ],
})
export class ComponentsModule {}
