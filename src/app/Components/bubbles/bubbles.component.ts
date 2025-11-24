
import { Component, OnInit } from "@angular/core";

type Theme = "christmas" | "halloween" | "stPatricks" | "easter" | "default";

@Component({
    selector: "app-bubbles",
    imports: [],
    template: `@for (particle of particles; track particle) {
  <div
    [class.celebration]="defaultParticle"
    class="particle"
    >
    {{ particle }}
  </div>
}`,
    styleUrls: ["./bubbles.component.scss"]
})
export class BubblesComponent implements OnInit {
  particles: string[] = [];
  defaultParticle = false; // set true or false.

  getThemeByMonth = (): Theme => {
    const month = new Date().getMonth();

    switch (month) {
      case 11:
        return "christmas";
      case 2:
        return "stPatricks";
      case 3:
        return "easter";
      case 9:
        return "halloween";
      default:
        this.defaultParticle = true;
        return "default"; // Default theme, e.g., for other months
    }
  };
  theme: Theme = this.getThemeByMonth(); // Example theme

  emojiThemes: Record<Theme, string[]> = {
    christmas: ["❄️"],
    halloween: ["🎃"],
    stPatricks: ["☘️"],
    easter: ["🥚"],
    default: [""],
  };
  emojiOptions = this.emojiThemes[this.theme];
  arrayLength = 20;
  constructor() {}

  ngOnInit(): void {
    this.particles = Array.from(
      { length: this.arrayLength },
      () =>
        this.emojiOptions[Math.floor(Math.random() * this.emojiOptions.length)],
    );
  }
}
