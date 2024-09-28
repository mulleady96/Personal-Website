import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-gallery",
  templateUrl: "./gallery.component.html",
  styleUrls: ["./gallery.component.css"],
})
export class GalleryComponent implements OnInit {
  constructor(
    private router: Router,
    private http: HttpClient,
  ) {}

  time!: number;
  postedAgo!: string;

  ngOnInit() {
    // this.postTimeAgo();
  }

  navigateDetail() {
    // this.router.navigate["/BlogDetail"];
  }

  // postTimeAgo() {
  //   this.postedAgo = moment([2019, 3, 14]).fromNow();
  //   return this.postedAgo;
  // }
}
