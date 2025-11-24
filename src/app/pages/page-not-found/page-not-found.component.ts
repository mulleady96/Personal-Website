import { Component } from "@angular/core";
import { MatButton } from "@angular/material/button";
import { RouterLink, RouterLinkActive } from "@angular/router";

@Component({
    selector: "app-page-not-found",
    template: `
    <section class="center">
      <h1 class="title">Uh oh, Page Not Found!</h1>

      <p>Head back to the home page by clicking on the 'Home' button</p>

      <button
        mat-button
        color="accent"
        routerLink="/home"
        routerLinkActive="router-link-active"
      >
        Home
      </button>
    </section>
  `,
    styleUrls: ["./page-not-found.component.scss"],
    imports: [MatButton, RouterLink, RouterLinkActive]
})
export class PageNotFoundComponent {
  constructor() {}
}
