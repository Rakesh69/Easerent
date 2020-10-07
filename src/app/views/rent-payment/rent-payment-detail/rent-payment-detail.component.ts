import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Lightbox } from 'ngx-lightbox';

@Component({
  selector: 'app-rent-payment-detail',
  templateUrl: './rent-payment-detail.component.html',
  styleUrls: ['./rent-payment-detail.component.scss']
})
export class RentPaymentDetailComponent implements OnInit {

  rentPaymentData: any = {};
  constructor(
    public lightbox: Lightbox,
    public router: Router
  ) { }

  ngOnInit() {
    this.rentPaymentData = JSON.parse(localStorage.getItem('rentPayment'));
  }

  showLigthBox(index: number = -1): void {
    console.log('index : ', index);
    
    if(index >= 0) {
      const attachments = this.rentPaymentData['shareDocumentsForm']['documents'];
      let images = [];

      for (const key in attachments) {
        if (Object.prototype.hasOwnProperty.call(attachments, key)) {
          const attachment = attachments[key];
          console.log('attachment : ', attachment);
          
          const image = {
            src: attachment['attachment'],
            caption: attachment['documentType'] || attachment['documentName'],
            thumb: attachment['attachment']
          };

          images.push(image);
        }
      }

      this.lightbox.open(images, index);
    }
  }

  editRentPaymentInformation(stepTo: number): void {
    console.log('stepTo : ', stepTo);
    this.router.navigate(['/rentPayment/start'], { queryParams: { step: stepTo } });
  }
}
