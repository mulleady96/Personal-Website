import { Component, OnInit } from "@angular/core";
import { trigger, transition, style, animate } from "@angular/animations";

@Component({
  selector: "app-about",
  templateUrl: "./about.component.html",
  styleUrls: ["./about.component.css"],
  animations: [
    // Slide items up from the bottom of screen.
    trigger("itemState", [
      transition("void => *", [
        style({ transform: "translateX(100%)" }),
        animate("0.6s ease-in-out"),
      ]),
      transition("* => void", [
        animate("0.6s ease-in-out", style({ transform: "translateX(100%)" })),
      ]),
    ]),
  ],
})
export class AboutComponent implements OnInit {
  tabDetails = [
    {
      id: 1,
      label: "University",
      listItems: [
        "Attended National University of Ireland, Galway",
        "Honours degree in Bachelor of Commerce",
        "Honours degree in h.Dip in Software Design & Development",
      ],
    },
    {
      id: 2,
      label: "Career",
      listItems: [
        "Full-time I.T. professional based in Ireland",
        "3 years experience developing web applications",
      ],
    },
    {
      id: 3,
      label: "Portfolio",
      listItems: [
        "Collection of applications on my Github account.",
        "Practiced advanced topics in Angular/Ionic, Typescript and the MEAN stack.",
        "Honours degree in h.Dip in Software Design & Development",
      ],
    },
  ];
  constructor() {}

  ngOnInit() {}
}
