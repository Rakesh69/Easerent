import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToasterService } from 'angular2-toaster';
import { Globals } from '../../../globals';

@Component({
  selector: 'app-add-edit-bills-utilities',
  templateUrl: './add-edit-bills-utilities.component.html',
  styleUrls: ['./add-edit-bills-utilities.component.scss']
})
export class AddEditBillsUtilitiesComponent implements OnInit {
  billForm: FormGroup;
  isFormSubmitted: boolean = false;

  constructor(public formBuilder: FormBuilder, public toasterService: ToasterService) { }

  ngOnInit() {
    this.createForm();
  }

  createForm(): void {
    this.billForm = this.formBuilder.group({
      name: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      type: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      frequency: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      memo: new FormControl('', [Validators.maxLength(500)]),
    })
  }

  formSubmit(): void {
    this.isFormSubmitted = true;
   
    if(this.billForm.valid) {
      this.billForm.reset();
      this.isFormSubmitted = false;

      this.toasterService.pop('success', 'Success', 'Password Changed.');
    }
  }

  isFormSubmittedAndError(controlName: string, errorName: string = '', notError: Array<string> = new Array()): any {
    return Globals.isFormSubmittedAndError(this.billForm, this.isFormSubmitted ? 1 : 0, controlName, errorName, notError);               
  }
}
