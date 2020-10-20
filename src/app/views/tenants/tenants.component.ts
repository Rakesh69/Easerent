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

  constructor(
    public formBuilder: FormBuilder
  ) { }

  ngOnInit() {
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
