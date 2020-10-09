import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ToasterService } from 'angular2-toaster';
import { Lightbox } from 'ngx-lightbox';

@Component({
  selector: 'app-move-in-summary',
  templateUrl: './move-in-summary.component.html',
  styleUrls: ['./move-in-summary.component.scss']
})
export class MoveInSummaryComponent implements OnInit {

  dangerAttachments: any = [];
  constructor(
    public lightbox: Lightbox,
    public toasterService: ToasterService,
    public sanitizer: DomSanitizer,
  ) { }

  ngOnInit() {
    this.dangerAttachments = [
      {
        'comments': 'Demo data',
        'attachment': 'assets/img/Properties/1.jpg'
      },
      {
        'comments': 'Testing data only',
        'attachment': 'assets/img/Properties/2.jpg'
      }
    ]
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

}
