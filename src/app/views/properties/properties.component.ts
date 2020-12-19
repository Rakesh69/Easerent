import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../common/commonService';
import { urlConstant } from '../../constant/urlConstant';
import { Router } from '@angular/router';
import { ToasterService } from 'angular2-toaster';
@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.scss']
})
export class PropertiesComponent implements OnInit {

  loginUserDetail: any;
  propertyData: any = [];
  constructor(
    public _CommonService: CommonService,
    public router: Router,
    public toasterService: ToasterService,
  ) {
  }

  ngOnInit() {
    this.loginUserDetail = this._CommonService.getLoggedInUser();

    if (this.loginUserDetail != null) {
      this.getAllProperty(this.loginUserDetail.userId);
    }

  }

  getAllProperty(userId) {
    this._CommonService.showLoading();
    this._CommonService.get<any>(urlConstant.Property.ByUserId + '?userId=' + userId).subscribe(res => {
      if (res.Status === '200') {
        this.propertyData = res.data.Property;
      }
      this._CommonService.hideLoading();
    }, (error) => {
      if (error != null) {
        this.toasterService.pop('error', 'Error', error.message);
      }
      this._CommonService.hideLoading();
    });
  }

  gotoProperty(property) {
    if (property && property.propertyId) {
      this.router.navigate(['/admin/properties/viewProperty'], { queryParams: { propertyId: property.propertyId } });
    }
  }

  DeleteProperty(item) {
    this._CommonService.showLoading();
    this._CommonService.get<any>(urlConstant.Property.DeletePropertyByPropertyId + '?propertyId=' + item.propertyId).subscribe(res => {
      if (res.Status === '200') {
        this.toasterService.pop('success', 'Success', res.message);
      }
      this._CommonService.hideLoading();
      this.getAllProperty(this.loginUserDetail.userId);
    }, (error) => {
      if (error != null) {
        this.toasterService.pop('error', 'Error', error.message);
      }
      this._CommonService.hideLoading();
    });
  }
}
