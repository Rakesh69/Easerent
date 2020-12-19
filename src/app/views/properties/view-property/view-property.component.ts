import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../../common/commonService';
import { ActivatedRoute, Router } from '@angular/router';
import { urlConstant } from '../../../constant/urlConstant';
import * as _ from 'lodash';
import csc from 'country-state-city';
import { ToasterService } from 'angular2-toaster';

@Component({
  selector: 'app-view-property',
  templateUrl: './view-property.component.html',
  styleUrls: ['./view-property.component.scss']
})
export class ViewPropertyComponent implements OnInit {
  propertId: any;
  propertyData: any = {
    propertyDetails: []
  };
  loginUser: any = {};
  isCollapsed: boolean = false;
  isSubmitted = false;
  states: any = [];
  cities: any = [];
  furnishedList: any = [];
  propertyDetailModel: any = {
  };
  additionalPropertyDetailsList: any = [];
  propertyTypeList: any = ['House/Villa', 'Commercial Property', 'Office', 'Retail', 'Storage', 'Hospitality'];

  constructor(
    public _CommonService: CommonService,
    public router: Router,
    private route: ActivatedRoute,
    public toasterService: ToasterService
  ) {
    this.loginUser = this._CommonService.getLoggedInUser();
    this.route.queryParams.subscribe(params => {

      this.propertId = params['propertyId'];

    });
  }



  collapsed(event: any): void {
    // console.log(event);
  }

  expanded(event: any): void {
    // console.log(event);
  }


  ngOnInit() {
    this.getDefaultState();

    if (this.propertId) {
      this.getPropertyDetails();
    }

  }

  getPropertyDetails() {
    this._CommonService.showLoading();
    this._CommonService.get<any>(urlConstant.Property.GetPropertyByPropertyId + '?propertyId=' + this.propertId).subscribe(res => {

      if (res.Status === '200') {
        this.propertyData = res.data.Property;
        const statename = this.propertyData.state;
        const isExist = this.states.find(x => x.name === statename);
        if (isExist) {
          this.getCitiesByStateId(isExist.id);
        }
        if (this.propertyData && this.propertyData.propertyDetails.length > 0 && this.propertyData.propertyDetails[0].additionalPropertyDetails.length > 0) {
          this.furnishedList = this.propertyData.propertyDetails[0].additionalPropertyDetails.filter(x => x.propertyAddtionalKey === 'Furnished');
        }

        if (this.propertyData && this.propertyData.propertyDetails.length > 0 && this.propertyData.propertyDetails[0].additionalPropertyDetails.length > 0) {
          this.additionalPropertyDetailsList = this.propertyData.propertyDetails[0].additionalPropertyDetails.filter(x => x.propertyAddtionalKey === 'additionalRoom');
        }

        const fan = this.furnishedList.filter(x => x.propertyAddtionalType === 'fan');
        const sofa = this.furnishedList.filter(x => x.propertyAddtionalType === 'sofa');
        const tv = this.furnishedList.filter(x => x.propertyAddtionalType === 'tv');
        const bed = this.furnishedList.filter(x => x.propertyAddtionalType === 'bed');
        this.propertyDetailModel = {
          propertyName: this.propertyData.propertyName,
          propertyType: this.propertyData.propertyType,
          addressLine1: this.propertyData.addressLine1,
          addressLine2: this.propertyData.addressLine2,
          state: this.propertyData.state,
          city: this.propertyData.city,
          pincode: this.propertyData.pincode,
          livingRoom: this.propertyData.propertyDetails.length > 0 && this.propertyData.propertyDetails[0].livingRoom ? this.propertyData.propertyDetails[0].livingRoom : 0,
          kitchen: this.propertyData.propertyDetails.length > 0 && this.propertyData.propertyDetails[0].kitchen ? this.propertyData.propertyDetails[0].kitchen : 0,
          bedRoom: this.propertyData.propertyDetails.length > 0 && this.propertyData.propertyDetails[0].bedRoom ? this.propertyData.propertyDetails[0].bedRoom : 0,
          bathRoom: this.propertyData.propertyDetails.length > 0 && this.propertyData.propertyDetails[0].bathRoom ? this.propertyData.propertyDetails[0].bathRoom : 0,
          furnished: this.propertyData.propertyDetails.length > 0 && this.propertyData.propertyDetails[0].furnished ? this.propertyData.propertyDetails[0].furnished : 0,
          fan: fan.length > 0 ? fan[0].propertyAddtionalValue : 0,
          sofa: sofa.length > 0 ? sofa[0].propertyAddtionalValue : 0,
          tv: tv.length > 0 ? tv[0].propertyAddtionalValue : 0,
          bed: bed.length > 0 ? bed[0].propertyAddtionalValue : 0,
          additionalPropertyDetailsList: this.additionalPropertyDetailsList,
          propertyId: this.propertId,
          userId : this.loginUser.userId
        };
        // _.each(this.propertyData.propertyDetails, (det) => {
        //   det.isCollapsed = true;
        //   _.each(det.additionalPropertyDetails, (addDet) => {
        //     addDet.isCollapsed = true;
        //   })
        // });

        this._CommonService.hideLoading();
      }
    });
  }

  getDefaultState(countryCode: string = 'IN'): void {
    const selectedCountry = csc.getCountryByCode(countryCode);
    this.states = csc.getStatesOfCountry(selectedCountry['id']);
  }

  getCitiesByStateId(stateId: string = ''): void {
    this.cities = csc.getCitiesOfState(stateId);
  }

  //  Living room
  addLivingRoom() {
    this.propertyDetailModel.livingRoom = (this.propertyDetailModel.livingRoom + 1);
  }

  removeLivingRoom() {
    this.propertyDetailModel.livingRoom = (this.propertyDetailModel.livingRoom - 1);
  }

  // Kitchen
  addKitchen() {
    this.propertyDetailModel.kitchen = (this.propertyDetailModel.kitchen + 1);
  }

  removeKitchen() {
    this.propertyDetailModel.kitchen = (this.propertyDetailModel.kitchen - 1);
  }

  // Bedroom
  addBedroom() {
    this.propertyDetailModel.bedRoom = (this.propertyDetailModel.bedRoom + 1);
  }

  removeBedroom() {
    this.propertyDetailModel.bedRoom = (this.propertyDetailModel.bedRoom - 1);
  }

  // BathRoom
  addBathroom() {
    this.propertyDetailModel.bathRoom = (this.propertyDetailModel.bathRoom + 1);
  }

  removeBathroom() {
    this.propertyDetailModel.bathRoom = (this.propertyDetailModel.bathRoom - 1);
  }

  // Fan
  addFan() {
    this.propertyDetailModel.fan = (this.propertyDetailModel.fan + 1);
  }

  removeFan() {
    this.propertyDetailModel.fan = (this.propertyDetailModel.fan - 1);
  }

  // Sofa
  addSofa() {
    this.propertyDetailModel.sofa = (this.propertyDetailModel.sofa + 1);
  }

  removeSofa() {
    this.propertyDetailModel.sofa = (this.propertyDetailModel.sofa - 1);
  }

  // TV
  addTV() {
    this.propertyDetailModel.tv = (this.propertyDetailModel.tv + 1);
  }

  removeTV() {
    this.propertyDetailModel.tv = (this.propertyDetailModel.tv - 1);
  }

  // Bed
  addBed() {
    this.propertyDetailModel.bed = (this.propertyDetailModel.bed + 1);
  }

  removeBed() {
    this.propertyDetailModel.bed = (this.propertyDetailModel.bed - 1);
  }

  // Additional Room
  addAditionalRoomCtrl(): void {

    if (this.propertyDetailModel.additionalPropertyDetailsList && this.propertyDetailModel.additionalPropertyDetailsList.length < 10) {
      const last = this.propertyDetailModel.additionalPropertyDetailsList[this.propertyDetailModel.additionalPropertyDetailsList.length-1]
      if (!last.propertyAddtionalType) {
        this.toasterService.pop('error', 'Error', 'Please enter addition room value.');

        return;
      }
      const objDet = {
        id: 0,
        propertyAddtionalKey: 'additionalRoom',
        propertyAddtionalType: '',
        propertyAddtionalValue: '1'
      };
      this.propertyDetailModel.additionalPropertyDetailsList.push(objDet);

    } else {
      this.toasterService.pop('error', 'Error', 'Maximum 10 additional property limit.');
    }
  }

  UpdatePropertyDetail(userform) {
    if (userform.invalid) {
      this.isSubmitted = true;
      return;
    }

    this.isSubmitted = false;

    const objPropertyUpdate = {
      propertyName: this.propertyDetailModel.propertyName,
      propertyType: this.propertyDetailModel.propertyType,
      addressLine1: this.propertyDetailModel.addressLine1,
      addressLine2: this.propertyDetailModel.addressLine2,
      state: this.propertyDetailModel.state,
      city: this.propertyDetailModel.city,
      pincode: this.propertyDetailModel.pincode,
      propertyDetails: [

      ],
      propertyId: this.propertId,
      userId : this.loginUser.userId
    };

      this._CommonService.showLoading();



      const additionalPropertyDetailsList = [];
      // reqData.additionalRooms.forEach(item => {
      //   const objDet = {
      //     id: 0,
      //     propertyAddtionalKey: 'additionalRoom',
      //     propertyAddtionalType: item,
      //     propertyAddtionalValue: '1'
      //   };
      //   additionalPropertyDetailsList.push(objDet);
      // });

      // additionalPropertyDetailsList.push({
      //   id: 0,
      //   propertyAddtionalKey: 'Furnished',
      //   propertyAddtionalType: 'fan',
      //   propertyAddtionalValue: reqData.fan
      // });

      // additionalPropertyDetailsList.push({
      //   id: 0,
      //   propertyAddtionalKey: 'Furnished',
      //   propertyAddtionalType: 'sofa',
      //   propertyAddtionalValue: reqData.sofa
      // });

      // additionalPropertyDetailsList.push({
      //   id: 0,
      //   propertyAddtionalKey: 'Furnished',
      //   propertyAddtionalType: 'tv',
      //   propertyAddtionalValue: reqData.tv
      // });

      // additionalPropertyDetailsList.push({
      //   id: 0,
      //   propertyAddtionalKey: 'Furnished',
      //   propertyAddtionalType: 'bed',
      //   propertyAddtionalValue: reqData.bed
      // });
      // const obj = {
      //   additionalPropertyDetails: additionalPropertyDetailsList,
      //   additionalRoom: reqData.additionalRoom,
      //   bathRoom: reqData.bathroom,
      //   bedRoom: reqData.bedroom,
      //   furnished: reqData.furnished,
      //   kitchen: reqData.kitchen,
      //   livingRoom: reqData.livingRoom,
      //   propertyId: this.propertId
      // };
      this._CommonService.post(urlConstant.Property.AddDetail, objPropertyUpdate).subscribe((res) => {
        if (!!res) {
          this.toasterService.pop('success', 'Success', res.message);
          this.router.navigate(['/admin/properties/list']);
        } else {
          this.toasterService.pop('error', 'Error', res.message);
          this.router.navigate(['/admin/properties/list']);
        }
      }, (error) => {
        if (error != null) {
          this.toasterService.pop('error', 'Error', error.message);
        }
        this.router.navigate(['/admin/properties/list']);
      });

  }
}
