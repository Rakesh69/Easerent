import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit, AfterViewInit {

  public currentActive = 'home';
  public pageOffset: any = {};

  @ViewChild('home', {static: false}) homeElement: ElementRef;
  @ViewChild('aboutUs', {static: false}) aboutUsElement: ElementRef;
  @ViewChild('howItsWork', {static: false}) howItsWorkElement: ElementRef;
  @ViewChild('pricing', {static: false}) pricingElement: ElementRef;
  @ViewChild('faq', {static: false}) faqElement: ElementRef;
  @ViewChild('contactUs', {static: false}) contactUsElement: ElementRef;
  constructor() {}

  ngOnInit() {
    // this.loadScript();
  }

  ngAfterViewInit(): void {
    this.pageOffset = {
      home: this.homeElement.nativeElement.offsetTop,
      aboutUs: this.aboutUsElement.nativeElement.offsetTop,
      howItsWork: this.howItsWorkElement.nativeElement.offsetTop,
      pricing: this.pricingElement.nativeElement.offsetTop,
      faq: this.faqElement.nativeElement.offsetTop,
      contactUs: this.contactUsElement.nativeElement.offsetTop,
    }
  }

  @HostListener('window:scroll', ['$event'])
  checkOffsetTop() {
    console.log(window.pageYOffset, this.pageOffset); // this will console log our scroll position

    if (window.pageYOffset <= this.pageOffset['home']) {
      this.currentActive = 'home'
    } else if (window.pageYOffset >= this.pageOffset['aboutUs'] && window.pageYOffset <= this.pageOffset['howItsWork']) {
      this.currentActive = 'aboutUs'
    } else if (window.pageYOffset >= this.pageOffset['howItsWork'] && window.pageYOffset <= this.pageOffset['pricing']) {
      this.currentActive = 'howItsWork'
    } else if (window.pageYOffset >= this.pageOffset['pricing'] && window.pageYOffset <= this.pageOffset['faq']) {
      this.currentActive = 'pricing'
    } else if (window.pageYOffset >= this.pageOffset['faq'] && window.pageYOffset <= this.pageOffset['contactUs']) {
      this.currentActive = 'faq'
    } else if (window.pageYOffset >= this.pageOffset['contactUs']) {
      this.currentActive = 'contactUs'
    }
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
