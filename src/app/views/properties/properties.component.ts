import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../common/commonService';
import { urlConstant } from '../../constant/urlConstant';

@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.scss']
})
export class PropertiesComponent implements OnInit {

  propertyData: any = [];
  constructor(
    public _CommonService: CommonService,        
  ) { 
  }

  ngOnInit() {
    // this.propertyData = [{
    //   propertyImage: "2.jpg",
    //   propertyName: "A/445 Aamrapali Apts, Kharadi, Pune",
    //   automatedRentPayment: true,
    //   additionalPropertyDetails: true,
    //   securityDeposit: true,
    //   bills: true
    // }, {
    //   propertyImage: "3.jpg",
    //   propertyName: "1230 Cornation Rd, Kolar, Banglore",
    //   automatedRentPayment: true,
    //   additionalPropertyDetails: false,
    //   securityDeposit: true,
    //   bills: false
    // }, {
    //   propertyImage: "4.jpg",
    //   propertyName: "C/20 Jyoti Park, Shahibaug, Ahmedabad",
    //   automatedRentPayment: false,
    //   additionalPropertyDetails: true,
    //   securityDeposit: true,
    //   bills: true
    // }];    

    this._CommonService.get(urlConstant.Property.ByUserId).subscribe(res => {
      this.propertyData = res;
    });
  }
}
