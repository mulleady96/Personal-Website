import { Component } from "@angular/core";
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from "@angular/forms";
@Component({
  selector: "app-email-sign-up",
  templateUrl: "./email-sign-up.component.html",
  styleUrls: ["./email-sign-up.component.css"],
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
