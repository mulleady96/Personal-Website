import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {MatSnackBar} from '@angular/material';
import { GravitaService } from '../../Services/gravita.service';

@Component({
  selector: 'app-get-in-touch',
  templateUrl: './get-in-touch.component.html',
  styleUrls: ['./get-in-touch.component.css'],
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
export class GetInTouchComponent implements OnInit {

  public enquiryForm: FormGroup;

  constructor(public formBuilder: FormBuilder, public gravita: GravitaService,
  public snackBar: MatSnackBar) {
    this.enquiryForm = formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      phoneNo: ['', Validators.required],
      companyName: ['', Validators.required],
      address: ['', Validators.required],
      angularChecked: [''],
      ionicChecked: [''],
      description: ['', Validators.required]

    });
   }


   createEnquiry(){
     const firstName = this.enquiryForm.value.firstName;
     console.log(firstName); // Retrieving values successfully
     const lastName = this.enquiryForm.value.lastName;
     const email = this.enquiryForm.value.email;
     const phoneNo = this.enquiryForm.value.phoneNo;
     const companyName = this.enquiryForm.value.companyName;
     const address = this.enquiryForm.value.address;
     const angularChecked = this.enquiryForm.value.angularChecked;
     const ionicChecked = this.enquiryForm.value.ionicChecked;
     const description = this.enquiryForm.value.description;


     // call service and submit the values for vars into the service to be submitted into the DB.
     this.gravita.createEnquiry(firstName, lastName, email, phoneNo, companyName, address, description, angularChecked, ionicChecked);

     // SnackBar success message showing the form has been submitted.
     this.snackBar.open('Form Successfully Submitted, Thank You!', 'Great', {
       duration: 5000
     });
     // Final step is to reset the form on submission.
     this.enquiryForm.reset();
   }

   clearForm(){
     // Reset form back to default values.
     this.enquiryForm.reset();
     // Mark as pristine
     this.enquiryForm.markAsUntouched();
   }

  ngOnInit() {
  }

}
