import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import Stepper from 'bs-stepper';
import { Globals } from '../../globals';

@Component({
  selector: 'app-rent-payment',
  templateUrl: './rent-payment.component.html',
  styleUrls: ['./rent-payment.component.scss']
})
export class RentPaymentComponent implements OnInit {

  isFormSubmitted: boolean = false;
  isStartRenting: boolean = false;
  rentalAgreementForm: FormGroup;
  addYourTenantForm: FormGroup;
  monthlyRentInfoForm: FormGroup;
  private stepper: Stepper;

  constructor(
    public formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.createForm();
  }

  initStepper(): void {
    this.isStartRenting = true;

    setTimeout(() => {
      this.stepper = new Stepper(document.querySelector('#stepper1'), {
        linear: true,
        animation: true,
        selectors: {
          steps: '.step',
          trigger: '.step-trigger',
          stepper: '.bs-stepper'
        }
      });
    }, 100);
  }

  createForm(): void {
    this.rentalAgreementForm = this.formBuilder.group({
      startDate: new FormControl(''),
      endDate: new FormControl(''),
      isNoEndDate: new FormControl(''),
    });

    this.addYourTenantForm = this.formBuilder.group({
      tenants: new FormArray([
        this.createFormAddYourTenantForm()
      ])
    }); 

    this.monthlyRentInfoForm =  this.formBuilder.group({
      monthlyDueDate: new FormControl(''),
      monthlyRentAmount: new FormControl(''),
      rentColletionStartOn: new FormControl(''),
      isCollectProratedRent: new FormControl(true),
      prorateRentDueDate: new FormControl(''),
      prorateRentAmount: new FormControl(''),
      isAutomaticLateFees: new FormControl(true),
      addFee: new FormControl(''),
      LateFeeAmount: new FormControl(''),
    });
  }

  createFormAddYourTenantForm(): FormGroup {
    return this.formBuilder.group({
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      email: new FormControl(''),
      phoneNumber: new FormControl(''),
    });
  }

  addAnotherTenantForm(): void {
    const tenants = this.addYourTenantForm.get('tenants') as FormArray;
    tenants.push(this.createFormAddYourTenantForm());
  }

  previous() {
    this.stepper.previous();
  }

  next() {
    this.stepper.next();
  }

  onSubmit() {
    return false;
  }

  isFormSubmittedAndError(controlName: string, errorName: string = '', notError: Array<string> = new Array()): any {
    return Globals.isFormSubmittedAndError(this.rentalAgreementForm, this.isFormSubmitted ? 1 : 0, controlName, errorName, notError);               
  }

  isAddYourTenantFormSubmittedAndError(formGroup: FormGroup, controlName: string, errorName: string = '', notError: Array<string> = new Array()): any {
    return Globals.isFormSubmittedAndError(formGroup, this.isFormSubmitted ? 1 : 0, controlName, errorName, notError);               
  }

   isMonthlyRentInfoFormSubmittedAndError(controlName: string, errorName: string = '', notError: Array<string> = new Array()): any {
    return Globals.isFormSubmittedAndError(this.monthlyRentInfoForm, this.isFormSubmitted ? 1 : 0, controlName, errorName, notError);               
  }
}
