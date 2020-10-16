import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { NgbModalOptions, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RoleService } from './role.service';
import { CommonService } from '../../../common/commonService';
import { dataConstant } from '../../../constant/dataConstant';
import { NgbdModalContentComponent } from '../../../shared/ngbd-modal-content/ngbd-modal-content.component';
import { debounce } from 'rxjs/operator/debounce';
import { map } from 'rxjs/operators';
import { ToasterService } from 'angular2-toaster';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})
export class RoleComponent implements OnInit {
  RoleList = [];
  ModuleList = [];
  filterQuery = "";
  RoleModel: any = {
    IsActive: true,
    RoleRights: []
  };
  statusList = [];
  isSubmitted = false;
  public ngbModalOptions: NgbModalOptions = {
    backdrop: 'static',
    keyboard: false,
  }
  title: any = "Add";

  @ViewChild('Role', null) RoleContent: TemplateRef<any>;
  modalReference: any;


  constructor(private _roleService: RoleService,
    private _commonService: CommonService,
    private modalService: NgbModal,
    private toasterService: ToasterService
  ) { }

  ngOnInit() {
    this.GetRoleList();
    this.statusList = dataConstant.Status;
  }

  GetRoleList() {
    this._commonService.showLoading();
    this._roleService.GetAllRoleList().subscribe((res: any) => {
      if (res) {
        this.RoleList = res;
        this._commonService.hideLoading();
      }
    }, error => {
      this._commonService.hideLoading();
      this.toasterService.pop('error', 'Error', error);
    })
  }

  GetRoleGetById(Id) {
    this._commonService.showLoading();
    this._roleService.GetRoleGetById(Id).subscribe((res: any) => {
      if (res) {
        this.RoleModel = res;
        var roleRightModuleIds = this.RoleModel.RoleRights.map(function (item) { return item.ModuleId; });

        this.ModuleList.forEach(item => {
          var selectedModule = roleRightModuleIds.some(function (moduleId) { return moduleId == item.Id });

          if (selectedModule)
            item.IsSelected = true;
        });

        this._commonService.hideLoading();
      }
    }, error => {
      this._commonService.hideLoading();
      this.toasterService.pop('error', 'Error', error);
    })
  }

  Add() {
    this.GetModuleList();

    this.title = "Add";
    this.RoleModel = {
      IsActive: true,
      RoleRights: []
    };
    this.modalReference = this.modalService.open(this.RoleContent, this.ngbModalOptions);
  }

  Edit(Id) {
    this.GetModuleList();

    this.modalReference = this.modalService.open(this.RoleContent, this.ngbModalOptions);
    if (Id > 0) {
      this.title = "Update";
      this.GetRoleGetById(Id);
    }
  }

  Delete(Id) {
    const modalRef = this.modalService.open(NgbdModalContentComponent);
    modalRef.componentInstance.confirmationBoxTitle = 'Role';
    modalRef.componentInstance.confirmationMessage = 'Do you want to delete?';
    modalRef.result.then((userResponse) => {
      if (userResponse) {
        this._roleService.DeleteRole(Id).subscribe((res: any) => {
          if (res) {
            if (res.status == 200) {
              this.GetRoleList();
              this.toasterService.pop('sucess', 'Success', res.message);
            }
            else {
              this.toasterService.pop('error', 'Error', res.message);
            }
          }
        }, error => {
          this._commonService.hideLoading();
          this.toasterService.pop('error', 'Error', error);
        })
      }
    });
  }

  SaveRole(form) {
    if (form.invalid) {
      this.isSubmitted = true;
      return;
    }
    this.isSubmitted = false;
    this._commonService.showLoading();

    var selectedModules = this.ModuleList.filter(function (item) { return item.IsSelected; });
    let parentThis = this;

    parentThis.RoleModel.RoleRights = [];
    selectedModules.forEach(item => {
      parentThis.RoleModel.RoleRights.push({
        ModuleId: item.Id,
        IsViewAllowed: true,
        IsActive: true,
        RoleId: parentThis.RoleModel.Id
      });
    });

    this._roleService.RoleSave(this.RoleModel).subscribe((res: any) => {
      if (res) {
        if (res.status == 200) {
          this._commonService.hideLoading();
          this.GetRoleList();
          this.modalReference.close();
          this.toasterService.pop('sucess', 'Success', res.message);
        }
        else {
          this.toasterService.pop('error', 'Error', res.message);
        }
      }
    }, error => {
      this._commonService.hideLoading();
      this.toasterService.pop('error', 'Error', error);
    })
  }

  GetModuleList() {
    this._commonService.showLoading();
    this._roleService.GetModuleList().subscribe((res: any) => {
      if (res) {
        this.ModuleList = res;
        this.ModuleList.forEach(item => {
          item.IsSelected = false;
        });

        this._commonService.hideLoading();
      }
    }, error => {
      this._commonService.hideLoading();
      this.toasterService.pop('error', 'Error', error);
    })
  }

}
