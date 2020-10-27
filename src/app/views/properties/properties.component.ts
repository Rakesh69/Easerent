import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.scss']
})
export class PropertiesComponent implements OnInit {

  PropertyData: any = [];
  constructor() { }

  ngOnInit() {
    this.PropertyData = [{
      propertyImage: "2.jpg",
      propertyName: "A/445 Aamrapali Apts, Kharadi, Pune",
      automatedRentPayment: true,
      additionalPropertyDetails: true,
      securityDeposit: true,
      bills: true
    }, {
      propertyImage: "3.jpg",
      propertyName: "1230 Cornation Rd, Kolar, Banglore",
      automatedRentPayment: true,
      additionalPropertyDetails: false,
      securityDeposit: true,
      bills: false
    }, {
      propertyImage: "4.jpg",
      propertyName: "C/20 Jyoti Park, Shahibaug, Ahmedabad",
      automatedRentPayment: false,
      additionalPropertyDetails: true,
      securityDeposit: true,
      bills: true
    }];    
  }

}
