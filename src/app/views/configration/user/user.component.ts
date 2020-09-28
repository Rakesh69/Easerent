import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { NgbModalOptions, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonService } from '../../../common/commonService';
import { dataConstant } from '../../../constant/dataConstant';
import { NgbdModalContentComponent } from '../../../shared/ngbd-modal-content/ngbd-modal-content.component';
import { UserService } from './user.service';
import { RoleService } from '../role/role.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  UserList = [];
  filterQuery = "";
  UserModel: any = {
    IsActive: true
  };
  statusList = [];
  isSubmitted = false;
  public ngbModalOptions: NgbModalOptions = {
    backdrop: 'static',
    keyboard: false,
    size: 'lg'
  }
  title: any = "Add";
  userRoleList: any = []
  emailPattren = dataConstant.EmailPattren;
  passwordPattern = dataConstant.PasswordPattern;

  @ViewChild('User', null) UserContent: TemplateRef<any>;
  modalReference: any;

  constructor(
    private _UserService: UserService,
    private _CommonService: CommonService,
    private modalService: NgbModal,
    private _RoleService: RoleService,
  ) {
  }

  ngOnInit() {
    this.GetUserList();
    this.getUserRoleList();
    this.statusList = dataConstant.Status;
  }

  GetUserList() {
    this._CommonService.showLoading();
    this._UserService.GetAllUserList().subscribe((res: any) => {
      if (res)
        this.UserList = res;
      this._CommonService.hideLoading();
    }, error => {
      this._CommonService.hideLoading();
      this._CommonService.toastErrorMsg("Error", error)
    })
  }

  GetUserGetById(Id) {
    this._CommonService.showLoading();
    this._UserService.GetUserGetById(Id).subscribe((res: any) => {
      if (res) {
        this.UserModel = res;
      }
      this._CommonService.hideLoading();
    }, error => {
      this._CommonService.hideLoading();
      this._CommonService.toastErrorMsg("Error", error)
    })
  }

  Add() {
    this.title = "Add";
    this.UserModel = {
      IsActive: true,
      role: null
    };
    this.isSubmitted = false;
    this.modalReference = this.modalService.open(this.UserContent, this.ngbModalOptions);
  }

  Edit(Id) {
    this.modalReference = this.modalService.open(this.UserContent, this.ngbModalOptions);
    if (Id > 0) {
      this.title = "Update";
      this.GetUserGetById(Id);
      this.isSubmitted = false;
    }
  }

  Delete(Id) {
    const modalRef = this.modalService.open(NgbdModalContentComponent);
    modalRef.componentInstance.confirmationBoxTitle = 'User';
    modalRef.componentInstance.confirmationMessage = 'Do you want to delete?';
    modalRef.result.then((userResponse) => {
      if (userResponse) {
        this._UserService.DeleteUser(Id).subscribe((res: any) => {
          if (res) {
            if (res.status == 200) {
              this.GetUserList();
              this._CommonService.toastSuccessMsg("Success", res.message)
            }
            else {
              this._CommonService.toastErrorMsg("Error", res.message)
              this._CommonService.hideLoading();
            }
          }
        }, error => {
          this._CommonService.hideLoading();
          this._CommonService.toastErrorMsg("Error", error)
        })
      }
    });
  }

  SaveUserDetail(form) {
    if (form.invalid) {
      this.isSubmitted = true;
      return;
    }

    if (this.UserModel && this.UserModel.Password != this.UserModel.CPassword)
      return;

    this.isSubmitted = false;
    this._CommonService.showLoading();
    this._UserService.UserSave(this.UserModel).subscribe((res: any) => {
      if (res) {
        if (res.status == 200) {
          this._CommonService.hideLoading();
          this.GetUserList();
          this.modalReference.close();
          this._CommonService.toastSuccessMsg("Success", res.message)
        }
        else {
          this._CommonService.toastErrorMsg("Error", res.message)
          this._CommonService.hideLoading();
        }
      }
    }, error => {
      this._CommonService.hideLoading();
      this._CommonService.toastErrorMsg("Error", error)
    })
  }

  // Get user Role list

  getUserRoleList() {
    this._RoleService.GetRoleList().subscribe((res: any) => {
      if (res) {
        this.userRoleList = res;
      }
    }, error => {
      this._CommonService.toastErrorMsg("Error", error)
    })
  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }

}
