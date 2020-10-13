import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import { ToasterService } from 'angular2-toaster';
import { Globals } from '../../globals';
import { isNumber } from '../../shared/ngbd-modal-content/validators/custom.validator';

@Component({
  selector: 'app-referral',
  templateUrl: './referral.component.html',
  styleUrls: ['./referral.component.scss']
})
export class ReferralComponent implements OnInit {
  referralForm: FormGroup;
  isFormSubmitted: boolean = false;

  constructor(public formBuilder: FormBuilder, public toasterService: ToasterService) { }

  ngOnInit() {
    this.createForm();
  }

  createForm(): void {
    this.referralForm = this.formBuilder.group({
      referrals: new FormArray([this.createReferralForm()])
    })

    console.log('referralForm : ', this.referralForm);
    
  }

  createReferralForm(): FormGroup {
    return this.formBuilder.group({
      firstName: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      lastName: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      email: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      phoneNumber: new FormControl('', [Validators.required, isNumber, Validators.minLength(10), Validators.maxLength(10)]),
    })
  }

  referralsFormArray(): FormArray {
    return this.referralForm.get('referrals') as FormArray;
  }

  formSubmit(): void {
    this.isFormSubmitted = true;
   
    if(this.referralForm.valid) {
      console.log('referralForm : ', this.referralForm);
      
      this.referralForm.reset();
      this.isFormSubmitted = false;

      this.toasterService.pop('success', 'Success', 'Referral Send.');
    }
  }

  addNewReferral(): void {
    this.isFormSubmitted = true;
    if(this.referralForm.valid) {
      this.referralsFormArray().push(this.createReferralForm());
      this.isFormSubmitted = false;
    }
  }

  isFormSubmittedAndError(referralForm: FormGroup, controlName: string, errorName: string = '', notError: Array<string> = new Array()): any {
    return Globals.isFormSubmittedAndError(referralForm, this.isFormSubmitted ? 1 : 0, controlName, errorName, notError);               
  }
}
