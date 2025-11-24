import { Component } from "@angular/core";
import { AbstractControl, FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatCard, MatCardTitle } from "@angular/material/card";
import { MatFormField, MatLabel, MatInput, MatError } from "@angular/material/input";
import { MatButton } from "@angular/material/button";
@Component({
    selector: "app-email-sign-up",
    templateUrl: "./email-sign-up.component.html",
    styleUrls: ["./email-sign-up.component.css"],
    imports: [FormsModule, ReactiveFormsModule, MatCard, MatCardTitle, MatFormField, MatLabel, MatInput, MatError, MatButton]
})
export class EmailSignUpComponent {
  signUpForm!: FormGroup;
  signedUp!: boolean;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
    });
  }

  onSubmit() {
    if (this.signUpForm.valid) {
      const email = this.signUpForm.get("email")?.value;
      // Here check if email already exists and update DB.
      this.signedUp = true;
      this.signUpForm.reset();
      this.signUpForm.markAsUntouched();
    }
  }
}
