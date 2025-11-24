import { animate, style, transition, trigger } from "@angular/animations";
import { Component, inject, Input, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { of } from "rxjs/internal/observable/of";
import { Subject } from "rxjs/internal/Subject";
import { debounceTime, switchMap } from "rxjs/operators";

import { GravitaService } from "../../Services/gravita.service";
import { FlexModule } from "@angular/flex-layout/flex";
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
    imports: [FlexModule, MatFabButton, MatIcon, FormsModule, ReactiveFormsModule, MatStepper, MatStep, MatStepLabel, MatFormField, MatLabel, MatInput, MatError, MatButton, MatStepperNext, MatStepperPrevious]
})
export class GetInTouchComponent implements OnInit, OnDestroy {
  @Input()
  warning!: string;
  public enquiryForm: FormGroup;
  public MaxLength = 500;
  public remaining = 500;
  private unsubscribe = new Subject<void>();
  private _formBuilder = inject(FormBuilder);
  public gravita = inject(GravitaService);
  public snackBar = inject(MatSnackBar);
  fallbackControl = new FormControl(null);

  isLinear = false;

  constructor() {
    this.enquiryForm = this._formBuilder.group({
      // Create nested form groups for each step
      firstStep: this._formBuilder.group({
        name: new FormControl<string | null>("", [Validators.required]),
      }),
      secondStep: this._formBuilder.group({
        email: new FormControl<string | null>("", [
          Validators.required,
          Validators.email,
        ]),
      }),
    });
  }

  createEnquiry = () => {
    try {
      // call service and submit the values from form into the DB.
      this.gravita.createEnquiry(this.enquiryForm.value);

      // SnackBar success message showing the form has been submitted.
      this.snackBar.open("Form Successfully Submitted, Thank You!", "Great", {
        duration: 5000,
      });
    } catch (error) {
      console.error(error);
      this.snackBar.open(
        "Unfortunately we ran into a problem.",
        "Please try again.",
        {
          duration: 5000,
        },
      );
    }
    // Final step is to reset the form on submission.
    this.enquiryForm.reset();
    this.remaining = 500;
  };

  clearForm = () => {
    // Reset form back to default values.
    this.enquiryForm.reset();
    // Mark as pristine
    this.enquiryForm.markAsUntouched();
    this.remaining = 500;
    this.warning = "";
  };

  ngOnInit() {
    // Form values saved.
    this.enquiryForm.valueChanges
      .pipe(
        debounceTime(1500),
        switchMap((value) => of(value)),
      )
      .subscribe((value) => {
        localStorage.setItem("form", JSON.stringify(value));
      });
  }

  ngOnDestroy() {}

  onTextarea = (text: object) => {
    // Calculates characters remaining in textarea field.
    this.remaining = this.MaxLength - Object.keys(text).length;
    this.warning = this.remaining <= 100 ? "orange" : "";
  };
}
