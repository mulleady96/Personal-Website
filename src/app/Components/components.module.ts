import { MatCardModule } from '@angular/material';

import { FlashCardComponent } from './flash-card/flash-card.component';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [
    FlashCardComponent
  ],
  imports: [
    MatCardModule
  ],
  exports: [
    FlashCardComponent
  ]
})
export class ComponentsModule { }
