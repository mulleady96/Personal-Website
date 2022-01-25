import { Component, OnInit } from "@angular/core";
import { trigger, transition, style, animate } from "@angular/animations";
import { CountUpOptions } from "countup.js";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
  animations: [
    // Slide items up from the bottom of screen.
    trigger("itemState", [
      transition("void => *", [
        style({ transform: "translateY(100%)" }),
        animate("0.6s ease-in-out"),
      ]),
      transition("* => void", [
        animate("0.6s ease-in-out", style({ transform: "translateY(100%)" })),
      ]),
    ]),
  ],
})
export class HomeComponent implements OnInit {
  opts: CountUpOptions;
  showDiv = false;
  video: string;

  constructor() {}

  ngOnInit() {
    this.useOptions();
    this.randomVideos();
  }

  toggleDiv = () => {
    this.showDiv = !this.showDiv;
  };

  useOptions = () => {
    this.opts = {
      duration: 6,
      separator: ",",
    };
  };

  randomVideos = () => {
    const src = [
      "../assets/DJI_0249.JPG",
      "../assets/DJI_0406.JPG",
      "../assets/Pier1.jpg",
      "../assets/LoughInagh.JPG",
      "../assets/Pier2.jpg",
    ];
    // Every page load, renders a random video.
    this.video = src[Math.floor(Math.random() * src.length)];
    return this.video;
  };
}
