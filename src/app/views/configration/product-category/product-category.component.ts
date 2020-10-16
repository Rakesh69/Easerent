import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { _ } from 'underscore';
import { dataConstant } from '../../../constant/dataConstant';
import { ProductCategoryService } from './product-category.service';
import { CommonService } from '../../../common/commonService';
import { NgbModal, NgbModalOptions, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { error } from '@angular/compiler/src/util';
import { NgbdModalContentComponent } from '../../../shared/ngbd-modal-content/ngbd-modal-content.component';
import { ToasterService } from 'angular2-toaster';


@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.scss']
})
export class ProductCategoryComponent implements OnInit {

  ProductCategoryList = [];
  filterQuery = "";
  SARProductCategoryModel: any = {
    IsActive: true,
    IsDefault:true
  };
  statusList = [];
  defaultStatulsList = [];
  isSubmitted = false;
  public ngbModalOptions: NgbModalOptions = {
    backdrop: 'static',
    keyboard: false,
  }
  title: any = "Add";

  @ViewChild('ProductCategory', null) ProductCategoryContent: TemplateRef<any>;
  modalReference: any;

  constructor(
    private _ProductCategoryService: ProductCategoryService,
    private _CommonService: CommonService,
    private modalService: NgbModal,
    private toasterService: ToasterService
  ) {
  }

  ngOnInit() {
    this.GetSARProductCategoryList();
    this.statusList = dataConstant.Status;
    this.defaultStatulsList = dataConstant.DefaultStatus;
  }

  GetSARProductCategoryList() {
    this._CommonService.showLoading();
    this._ProductCategoryService.GetSARProductCategoryList().subscribe((res: any) => {
      if (res) {
        this.ProductCategoryList = res;
        this._CommonService.hideLoading();
      }
    }, error => {
      this._CommonService.hideLoading();
      this.toasterService.pop('error', 'Error', error);
    })
  }

  GetSARProductCategoryGetById(Id) {
    this._CommonService.showLoading();
    this._ProductCategoryService.GetSARProductCategoryGetById(Id).subscribe((res: any) => {
      if (res) {
        this.SARProductCategoryModel = res;
        this._CommonService.hideLoading();
      }
    }, error => {
      this._CommonService.hideLoading();
      this.toasterService.pop('error', 'Error', error);
    })
  }

  Add() {
    this.title = "Add";
    this.SARProductCategoryModel = {
      IsActive: true,
      IsDefault:true
    };
    this.modalReference = this.modalService.open(this.ProductCategoryContent, this.ngbModalOptions);
  }

  Edit(Id) {
    this.modalReference = this.modalService.open(this.ProductCategoryContent, this.ngbModalOptions);
    if (Id > 0) {
      this.title = "Update";
      this.GetSARProductCategoryGetById(Id);
    }
  }

  Delete(Id) {
    const modalRef = this.modalService.open(NgbdModalContentComponent);
    modalRef.componentInstance.confirmationBoxTitle = 'SAR Product Category';
    modalRef.componentInstance.confirmationMessage = 'Do you want to delete?';
    modalRef.result.then((userResponse) => {
      if (userResponse) {
        this._ProductCategoryService.DeleteSARProductCategory(Id).subscribe((res: any) => {
          if (res) {
            if (res.status == 200) {
              this.GetSARProductCategoryList();
              this.toasterService.pop('sucess', 'Success', res.message);
            }
            else {
              this.toasterService.pop('error', 'Error', res.message);
            }
          }
        }, error => {
          this._CommonService.hideLoading();
          this.toasterService.pop('error', 'Error', error);
        })
      }
    });
  }

  SARProductCategorySave(form) {
    if (form.invalid) {
      this.isSubmitted = true;
      return;
    }
    this.isSubmitted = false;
    this._CommonService.showLoading();
    this._ProductCategoryService.SARProductCategorySave(this.SARProductCategoryModel).subscribe((res: any) => {
      if (res) {
        if (res.status == 200) {
          this._CommonService.hideLoading();
          this.GetSARProductCategoryList();
          this.modalReference.close();
          this.toasterService.pop('sucess', 'Success', res.message);
        }
        else {
          this.toasterService.pop('error', 'Error', res.message);
        }
      }
    }, error => {
      this._CommonService.hideLoading();
      this.toasterService.pop('error', 'Error', error);
    })
  }
}
