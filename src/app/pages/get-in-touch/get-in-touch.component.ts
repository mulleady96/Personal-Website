import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { trigger, transition, style, animate } from "@angular/animations";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { GravitaService } from "../../Services/gravita.service";
import { debounceTime, switchMap, takeUntil } from "rxjs/operators";
import { Subject } from "rxjs/internal/Subject";
import { of } from "rxjs/internal/observable/of";

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
})
export class GetInTouchComponent implements OnInit, OnDestroy {
  @Input() warning;
  public enquiryForm: FormGroup;
  public MaxLength = 500;
  public remaining = 500;
  public savedValues;
  private unsubscribe = new Subject<void>();

  constructor(
    public formBuilder: FormBuilder,
    public gravita: GravitaService,
    public snackBar: MatSnackBar
  ) {
    this.enquiryForm = formBuilder.group({
      firstName: [
        JSON.parse(localStorage.getItem("form"))?.firstName,
        Validators.required,
      ],
      lastName: [
        JSON.parse(localStorage.getItem("form"))?.lastName,
        Validators.required,
      ],
      email: [
        JSON.parse(localStorage.getItem("form"))?.email,
        Validators.email,
      ],
      phoneNo: [
        JSON.parse(localStorage.getItem("form"))?.phoneNo,
        Validators.required,
      ],
      companyName: [
        JSON.parse(localStorage.getItem("form"))?.companyName,
        Validators.required,
      ],
      angularChecked: [
        JSON.parse(localStorage.getItem("form"))?.angularChecked,
      ],
      ionicChecked: [JSON.parse(localStorage.getItem("form"))?.ionicChecked],
      description: [
        JSON.parse(localStorage.getItem("form"))?.description,
        Validators.required,
      ],
    });

    // Calculate remaining chars after page reload
    if (JSON.parse(localStorage.getItem("form"))?.description) {
      let description = JSON.parse(localStorage.getItem("form"))?.description;
      this.remaining = this.remaining - Object.keys(description).length;
    }
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
      this.snackBar.open(
        "Unfortunately we ran into a problem.",
        "Please try again.",
        {
          duration: 5000,
        }
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
        switchMap((value) => of(value))
      )
      .subscribe((value) => {
        localStorage.setItem("form", JSON.stringify(value));
      });
  }

  ngOnDestroy() {}

  onTextarea = (text: Object) => {
    // Calculates characters remaining in textarea field.
    this.remaining = this.MaxLength - Object.keys(text).length;
    this.warning = this.remaining <= 100 ? "orange" : "";
  };
}
