import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, NavigationStart, NavigationCancel, NavigationError } from '@angular/router';
import { ToasterConfig } from 'angular2-toaster';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  // tslint:disable-next-line
  selector: 'body',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public toasterconfig: ToasterConfig = new ToasterConfig({ tapToDismiss: true, timeout: 5000 });
  constructor(private router: Router, private spinner: NgxSpinnerService) {
    
    this.router.events.subscribe((event) => {
      switch(true) {
          case event instanceof NavigationStart: {
              this.spinner.show();
              break;
          }

          case event instanceof NavigationEnd:
          case event instanceof NavigationCancel:
          case event instanceof NavigationError: {
              this.spinner.hide();
              break;
          }

          default: {
              break;
          }
      }
    });
  }

  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
  }
}
