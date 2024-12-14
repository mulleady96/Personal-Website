import { NgFor } from "@angular/common";
import { Component, ElementRef, OnInit } from "@angular/core";

@Component({
  selector: "app-bubbles",
  imports: [NgFor],
  standalone: true,
  template: `<div
    *ngFor="let particle of particles"
    [class.celebration]="defaultParticle"
    class="particle"
  >
    {{ particle }}
  </div>`,
  styleUrls: ["./bubbles.component.scss"],
})
export class BubblesComponent implements OnInit {
  particles = [
    "🎅",
    "🎅",
    "🎄",
    "🎁",
    "🎁",
    "🎄",
    "🎅",
    "🎅",
    "🎄",
    "🎁",
    "🎁",
    "🎄",
    "🎅",
    "🎅",
    "⛄",
    "⛄",
    "⛄",
    "⛄",
    "⛄",
    "🎄",
    "🎁",
    "🎁",
    "🎄",
    "🎅",
    "🎅",
    "🎄",
    "🎁",
    "🎁",
    "🎄",
    "🤶",
    "🎁",
    "🎄",
    "🤶",
    "❄️",
    "❄️",
    "❄️",
    "❄️",
  ];
  defaultParticle = false; // set true or false.
  constructor(private elementRef: ElementRef) {
    // this.particles = Array(20).fill(""); // if defaultParticle true - reset particles to empty array
  }

  ngOnInit(): void {}

  enableCelebration() {
    // 1. datetimes - if current date within month then set array.
  }
}
