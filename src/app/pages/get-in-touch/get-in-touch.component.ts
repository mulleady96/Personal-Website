import { animate, style, transition, trigger } from "@angular/animations";
import { Component, inject, signal, effect, OnDestroy, OnInit } from "@angular/core";
import { form, Field, required, email, submit } from "@angular/forms/signals";
import { MatSnackBar } from "@angular/material/snack-bar";

import { GravitaService, Enquiry } from "../../Services/gravita.service";

import { MatFabButton, MatButton } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";
import { MatStepper, MatStep, MatStepLabel, MatStepperNext, MatStepperPrevious } from "@angular/material/stepper";
import { MatFormField, MatLabel, MatInput, MatError } from "@angular/material/input";

@Component({
    selector: "app-get-in-touch",
    templateUrl: "./get-in-touch.component.html",
    styleUrls: ["./get-in-touch.component.scss"],
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
    imports: [MatFabButton, MatIcon, Field, MatStepper, MatStep, MatStepLabel, MatFormField, MatLabel, MatInput, MatError, MatButton, MatStepperNext, MatStepperPrevious]
})
export class GetInTouchComponent implements OnInit, OnDestroy {
  warning = signal<string>("");
  enquiryModel = signal<Enquiry>({
    firstStep: { name: "" },
    secondStep: { email: "" }
  });

  enquiryForm = form(this.enquiryModel, (s) => {
    required(s.firstStep.name);
    required(s.secondStep.email);
    email(s.secondStep.email);
  });

  public MaxLength = 500;
  public remaining = 500;
  public gravita = inject(GravitaService);
  public snackBar = inject(MatSnackBar);

  isLinear = false;

  constructor() {
    effect((onCleanup) => {
      const val = this.enquiryForm().value();
      const timeout = setTimeout(() => {
        localStorage.setItem("form", JSON.stringify(val));
      }, 1500);
      onCleanup(() => clearTimeout(timeout));
    });
  }

  createEnquiry = (stepper: MatStepper) => {
    submit(this.enquiryForm, async () => {
      try {
        this.gravita.createEnquiry(this.enquiryModel());
        this.snackBar.open("Form Successfully Submitted, Thank You!", "Great", { duration: 5000 });
        stepper.next();
        localStorage.removeItem("form"); // Clear saved form data on success
      } catch (error) {
        console.error(error);
        this.snackBar.open("Unfortunately we ran into a problem.", "Please try again.", { duration: 5000 });
      }
    });
  };

  clearForm = () => {
    this.enquiryModel.set({
      firstStep: { name: "" },
      secondStep: { email: "" }
    });
    this.enquiryForm().reset();
    this.remaining = 500;
    this.warning.set("");
  };

  ngOnInit() {
    const storedForm = localStorage.getItem("form");
    if (storedForm) {
      try {
        const parsed = JSON.parse(storedForm);
        if (parsed.firstStep || parsed.secondStep) {
          this.enquiryModel.set({
            firstStep: parsed.firstStep || { name: "" },
            secondStep: parsed.secondStep || { email: "" }
          });
        }
      } catch(e) {}
    }
  }

  ngOnDestroy() {}

  onTextarea = (text: object) => {
    // Calculates characters remaining in textarea field.
    this.remaining = this.MaxLength - Object.keys(text).length;
    this.warning.set(this.remaining <= 100 ? "orange" : "");
  };
}
