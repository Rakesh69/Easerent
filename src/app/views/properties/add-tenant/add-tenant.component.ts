import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-tenant',
  templateUrl: './add-tenant.component.html',
  styleUrls: ['./add-tenant.component.scss']
})
export class AddTenantComponent implements OnInit {


  inviteForm: FormGroup;
  isFormSubmitted: boolean = false;
  addedProperty: any = {};



  constructor(public formBuilder: FormBuilder, public toasterService: ToastrService) { }

  ngOnInit() {
    this.createForm();
  }

  createForm(): void {
    this.inviteForm = this.formBuilder.group({
      ownerEmail: new FormControl('', [Validators.required, Validators.maxLength(100)]),
    })
  }

  formSubmit(): void {
    this.isFormSubmitted = true;
    this.toasterService.success('success', 'Invitation sent successfully.');

    if(this.inviteForm.valid) {
      this.addedProperty = this.inviteForm.value;
      this.inviteForm.reset();
      this.isFormSubmitted = false;
    }
  }


  isFormSubmittedAndError(controlName: string, errorName: string = '', notError: Array<string> = new Array()): any {
    const otherError: any = this.inviteForm.controls[controlName].errors;

    if (this.isFormSubmitted && otherError) {
        return errorName == '' ? true : (otherError ? !Object.keys(otherError).some(err => notError.includes(err)) : true) ? this.inviteForm.controls[controlName].hasError(errorName) : false;
    }
    return false;
  }
}
