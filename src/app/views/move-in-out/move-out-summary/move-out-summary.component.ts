import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ToasterService } from 'angular2-toaster';
import { Lightbox } from 'ngx-lightbox';

@Component({
  selector: 'app-move-out-summary',
  templateUrl: './move-out-summary.component.html',
  styleUrls: ['./move-out-summary.component.scss']
})
export class MoveOutSummaryComponent implements OnInit {

  dangerAttachments: any = [];
  successAttachments: any = [];
  attchmentComments: any = [];

  constructor(
    public lightbox: Lightbox,
    public toasterService: ToasterService,
    public sanitizer: DomSanitizer,
  ) { 
    this.attchmentComments = [false, false, false, false, false, false, false, false, false, false]
  }

  ngOnInit() {
    this.dangerAttachments = [
      {
        'comments': 'Demo data',
        'repaingCost': '2000',
        'attachment': 'assets/img/Properties/1.jpg'
      },
      {
        'comments': 'Testing data only',
        'repaingCost': '100',
        'attachment': 'assets/img/Properties/2.jpg'
      }
    ];

    this.successAttachments = [
      {
        'comments': 'Bathroom Door has minor crack',
        'repaingCost': '200',
        'attachment': 'assets/img/Properties/1.jpg'
      },
      {
        'comments': 'Windows has glass crack',
        'repaingCost': '0',
        'attachment': 'assets/img/Properties/2.jpg'
      }
    ];
  }

  showLigthBox(index: number = -1, isWarning: boolean = false): void {
    console.log('index : ', index);

    if(index >= 0) {
      let images = [];
      const attachments = this.dangerAttachments;
      for (const key in attachments) {
        if (Object.prototype.hasOwnProperty.call(attachments, key)) {
          const attachment = attachments[key];
          console.log('attachment : ', attachment);

          const image = {
            src: attachment['attachment'],
            caption: attachment['comments'],
            thumb: attachment['attachment']
          };

          images.push(image);
        }
      }

      this.lightbox.open(images, index);
    }
  }

  next() {

  }

}
