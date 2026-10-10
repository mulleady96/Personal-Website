import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatChipsModule } from '@angular/material/chips';
import { LoginService } from '../../Services/login.service';

@Component({
  selector: 'app-snap-login',
  standalone: true,
  imports: [
    CommonModule,
    MatBadgeModule,
    MatButtonModule,
    MatIconModule,
    FontAwesomeModule,
    MatChipsModule,
  ],
  templateUrl: './snap-login.component.html',
  styleUrls: ['./snap-login.component.scss']
})
export class SnapLoginComponent {
  loginService = inject(LoginService);
}
