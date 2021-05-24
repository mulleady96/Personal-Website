import { HttpClientModule } from '@angular/common/http';
import { InvisibleDirective } from './../Directives/invisible.directive';
import { UnderlineHoverDirective } from './../Directives/underline-hover.directive';
import { CommonModule } from '@angular/common';
import { AppMaterialModule } from './../app-material.module';
import { MatCardModule } from '@angular/material/card';

import { FlashCardComponent } from './flash-card/flash-card.component';
import { NgModule } from '@angular/core';
import { MediaListComponent, DialogElementsExampleDialog } from './media-list/media-list.component';
import { BubblesComponent } from './bubbles/bubbles.component';

@NgModule({
  declarations: [
    FlashCardComponent,
    MediaListComponent,
    DialogElementsExampleDialog,
    UnderlineHoverDirective,
    InvisibleDirective,
    BubblesComponent
  ],
  imports: [
    MatCardModule,
    CommonModule,
    HttpClientModule,
    AppMaterialModule
  ],
  exports: [
    FlashCardComponent,
    MediaListComponent,
    BubblesComponent,
    DialogElementsExampleDialog,
    UnderlineHoverDirective,
    InvisibleDirective
  ]
})
export class ComponentsModule { }
