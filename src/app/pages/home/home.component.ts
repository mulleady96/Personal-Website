import { Component, OnInit } from "@angular/core";
import { trigger, transition, style, animate } from "@angular/animations";
import { CountUpOptions } from "countup.js";

@Component({
  // tslint:disable-next-line: quotemark
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
  cardDetails = [
    {
      id: 1,
      title: "Design",
      description:
        "This will involve studying your brand, your competitors and your market. Identifying key designs that you admire from well-known brands. From this we can create bespoke UI/UX designs that will engage your audience, by being both easy to use and appealing on the eye.",
      pictureClass: "designImage",
      buttonText: "View Designs",
    },
    {
      id: 2,
      title: "Development",
      description:
        "Once the final design has been agreed, checkpoints will be established whereby you will be able to test the application as it's progressing. Providing feedback on the design & functionality throughout.",
      pictureClass: "devImage",
      buttonText: "View Portfolio",
    },
    {
      id: 3,
      title: "Analytics",
      description:
        "We can provide comprehensive statistical reports on how your website is performing.",
      pictureClass: "productionImage",
      buttonText: "",
    },
  ];

  guaranteeDetails = [
    {
      id: 1,
      title: "Industry Standard",
      description:
        " We use the latest front-end frameworks along with cloud based backend technologies. Your app will be responsive and intuitive regardless of how intensive demand may be.",
      chipList: ["HTML", "CSS", "Ionic", "Angular"],
    },
    {
      id: 1,
      title: "SEO Score",
      description:
        "Search Engine Optimisation is essential in order to appear high up in browser search results, allowing you to engage more potential customers.",
    },
    {
      id: 1,
      title: "Platform Independent",
      description:
        "Your new website will be optimised for all browsers and mobile devices. Delivered at a low cost that will be manageable, for you and your business.",
      chipList: ["fab fa-apple", "fab fa-android", "fab fa-chrome"],
    },
  ];

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
