import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import { GravitaService } from '../../Services/gravita.service';

@Component({
  selector: 'app-get-in-touch',
  templateUrl: './get-in-touch.component.html',
  styleUrls: ['./get-in-touch.component.scss'],
  animations: [ // Slide items up from the bottom of screen.
        trigger('itemState', [
            transition('void => *', [
                style({transform: 'translateX(100%)'}),
                animate('0.6s ease-in-out')
            ]),
            transition('* => void', [
                animate('0.6s ease-in-out', style({transform: 'translateX(100%)'}))
            ])
        ])
    ]
})
export class GetInTouchComponent implements OnInit, OnDestroy {

  @Input() warning;
  public enquiryForm: FormGroup;
  public MaxLength = 500;
  public remaining = 500;
  public savedValues;

  constructor(public formBuilder: FormBuilder, public gravita: GravitaService,
  public snackBar: MatSnackBar) {
    this.enquiryForm = formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.email],
      phoneNo: ['', Validators.required],
      companyName: ['', Validators.required],
      address: ['', Validators.required],
      angularChecked: [''],
      ionicChecked: [''],
      description: ['', Validators.required]
    });
   }


   createEnquiry = () => {

    try {
      // call service and submit the values from form into the DB.
      this.gravita.createEnquiry(this.enquiryForm.value);

      // SnackBar success message showing the form has been submitted.
      this.snackBar.open('Form Successfully Submitted, Thank You!', 'Great', {
        duration: 5000,
      });
    } catch (error) {
      this.snackBar.open('Unfortunately we ran into a problem.', 'Please try again.', {
      duration: 5000 });
    }
     // Final step is to reset the form on submission.
     this.enquiryForm.reset();
     this.remaining = 500;
   }

   clearForm = () => {
     // Reset form back to default values.
     this.enquiryForm.reset();
     // Mark as pristine
     this.enquiryForm.markAsUntouched();
     this.remaining = 500;
     this.warning = '';
   }

  ngOnInit() {
  }

  ngOnDestroy() {
  }

  onTextarea = (text: Object) => {
    // Calculates characters remaining in textarea field.
    this.remaining = this.MaxLength - Object.keys(text).length;
    this.warning = this.remaining <= 100 ? 'orange' : '';
  //  console.log(this.remaining);
  }

  sendEvent = () => {
    // Event to track how many users complete & submit Enquiry form.
    (<any>window).ga('send', 'event', {
      eventCategory: 'Enquiry Form Submit',
      eventLabel: 'formSubmitted',
      eventAction: 'Form sent to DB',
      eventValue: 10
    });
  }

}
