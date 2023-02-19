import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-page-not-found",
  template: ` <div class="container">
    <section class="section margin animated fadeIn">
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
      <br />
      <img src="/assets/PageNotFound.svg" alt="Page Not Found image" />
    </section>
  </div>`,
  styleUrls: ["./page-not-found.component.css"],
})
export class PageNotFoundComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
