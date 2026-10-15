import { Component, input } from '@angular/core';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-snap-login',
  standalone: true,
  imports: [LoginComponent],
  template: `<app-login [showChallenges]="showChallenges()"></app-login>`,
})
export class SnapLoginComponent {
  public showChallenges = input<boolean>(true);
}

