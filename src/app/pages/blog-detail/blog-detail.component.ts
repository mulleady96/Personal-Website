import { Location } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FlexModule } from "@angular/flex-layout/flex";
import { MatButton, MatIconButton } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";
import { ExtendedModule } from "@angular/flex-layout/extended";
// import * as moment from 'moment';

@Component({
    selector: "app-blog-detail",
    templateUrl: "./blog-detail.component.html",
    styleUrls: ["./blog-detail.component.css"],
    imports: [FlexModule, MatButton, MatIconButton, MatIcon, ExtendedModule]
})
export class BlogDetailComponent implements OnInit {
  constructor(private location: Location) {}

  ngOnInit() {
    this.timePostedAgo();
  }

  goBack = () => {
    this.location.back();
  };

  timePostedAgo = () => {
    // Shows When it was posted.
    const yourDate = new Date();
    // const postedAgo = moment(yourDate).fromNow();
    // console.log(postedAgo);
  };
}
