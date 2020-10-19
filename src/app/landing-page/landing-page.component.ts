import { AfterViewInit, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit, AfterViewInit {

  constructor() {}

  ngOnInit() {
    this.loadScript();
  }

  ngAfterViewInit(): void {
  }

  public loadScript() {
    let body = <HTMLDivElement> document.body;

    const scripts = [
      'assets/js/jquery-2.1.0.min.js',
      'assets/js/popper.js',
      'assets/js/bootstrap.min.js',
      'assets/js/scrollreveal.min.js',
      'assets/js/waypoints.min.js',
      'assets/js/jquery.counterup.min.js',
      'assets/js/imgfix.min.js',
      'assets/js/mixitup.js',
      'assets/js/accordions.js',
    ];

    for (const key in scripts) {
      if (Object.prototype.hasOwnProperty.call(scripts, key)) {
        new Promise((resolve, reject) => {
          const scriptSrc = scripts[key];
          let script = document.createElement('script');
          script.innerHTML = '';
          script.src = scriptSrc;
          script.async = true;
          script.defer = true;
          
          script.onload = () => {
            resolve('Loaded');
          };
          script.onerror = (error: any) => {
            resolve('Error');
          };
          
          document.getElementsByTagName('head')[0].appendChild(script);
        });
      }
    }
  }

  scrollToElement($element: HTMLElement): void {
    console.log($element);
    $element.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
  }
}
