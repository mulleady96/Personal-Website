import { HttpClientModule } from '@angular/common/http';
import { InvisibleDirective } from './../Directives/invisible.directive';
import { UnderlineHoverDirective } from './../Directives/underline-hover.directive';
import { CommonModule } from '@angular/common';
import { AppMaterialModule } from './../app-material.module';
import { MatCardModule } from '@angular/material';

import { FlashCardComponent } from './flash-card/flash-card.component';
import { NgModule } from '@angular/core';
import { MediaListComponent } from './media-list/media-list.component';

@NgModule({
  declarations: [
    FlashCardComponent,
    MediaListComponent,
    UnderlineHoverDirective,
    InvisibleDirective
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
    UnderlineHoverDirective,
    InvisibleDirective
  ]
})
export class ComponentsModule { }
