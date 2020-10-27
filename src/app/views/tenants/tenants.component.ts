import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Globals } from '../../globals';
import { isAlphabet, isNumber } from '../../shared/ngbd-modal-content/validators/custom.validator';

@Component({
  selector: 'app-tenants',
  templateUrl: './tenants.component.html',
  styleUrls: ['./tenants.component.scss']
})
export class TenantsComponent implements OnInit {

  paymentForm: FormGroup;
  isFormSubmitted: boolean = false;
  propertyData: any = [];

  constructor(
    public formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    // let imgCount = 1;
    // for (var i = 1; i <= 2; i++) {
    //   var data = {
    //     propertyImage: imgCount + ".jpg",
    //     propertyName: "Property #" + i,
    //     label1: "Label " + i,
    //     label2: "Title " + i,
    //     label3: "Detail " + i,
    //     label4: "Data " + i
    //   }
    //   imgCount++;

    //   if(imgCount > 6) {
    //     imgCount = 1;
    //   }
    //   this.propertyData.push(data);
    // }

    this.propertyData = [{
      propertyImage: "2.jpg",
      propertyName: "A/445 Aamrapali Apts, Kharadi, Pune",
      propertyDetail: "Welcome, Rahul. Hope you are all settled in and liking your new place. Your lease is all set up to Nov 2021",
      automatedRentPayment: true,
      additionalPropertyDetails: true,
      securityDeposit: true,
      bills: true
    }, {
      propertyImage: "3.jpg",
      propertyName: "1230 Cornation Rd, Kolar, Banglore",
      propertyDetail: "Welcome, Rahul. Hope you are all settled in and liking your new place. Your lease is all set up to Nov 2021",
      automatedRentPayment: true,
      additionalPropertyDetails: false,
      securityDeposit: true,
      bills: false
    }]; 

    this.createForm();
  }

  createForm(): void {
    this.paymentForm = this.formBuilder.group({
      cardNumber: new FormControl('', [ Validators.required, isNumber, Validators.maxLength(24) ]),
      exprirationDate: new FormControl('', [ Validators.required, isNumber, Validators.maxLength(20) ]),
      cvCode: new FormControl('', [ Validators.required, isNumber, Validators.minLength(3), Validators.maxLength(3) ]),
      cardOwnerName: new FormControl('', [ Validators.required, isAlphabet, Validators.maxLength(100) ]),
    });
  }

  formSubmit(): void {
    this.isFormSubmitted = true;

    if(this.paymentForm.valid) {
      console.log('valid paymentForm : ', this.paymentForm.value);
    } else {
      console.log('paymentForm : ', this.paymentForm.value);
    }
  }

  isPaymentFormSubmittedAndError(controlName: string, errorName: string = '', notError: Array<string> = new Array()): any {
    return Globals.isFormSubmittedAndError(this.paymentForm, this.isFormSubmitted ? 1 : 0, controlName, errorName, notError);               
  }
}
