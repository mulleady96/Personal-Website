import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { PricingCardComponent } from '../pricing-card/pricing-card.component';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [
    CommonModule, 
    MatToolbarModule, 
    MatButtonModule, 
    MatIconModule, 
    RouterModule, 
    PricingCardComponent
  ],
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {
  @Input() imageSRC!: string;
  @Output() toggleSidenav = new EventEmitter<void>();

  onToggleSidenav() {
    this.toggleSidenav.emit();
  }
}
