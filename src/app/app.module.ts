import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { NgxSpinnerModule } from 'ngx-spinner';
import { JwtInterceptor } from './common/JwtIntercepter';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {AuthGuard} from './common/auth.guard';
import {NgbModule, NgbTypeaheadModule, NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';
import { BsModalService } from 'ngx-bootstrap/modal';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

import { AppComponent } from './app.component';

// Import containers
import { DefaultLayoutComponent } from './containers';

const APP_CONTAINERS = [
  DefaultLayoutComponent
];

import {
  AppAsideModule,
  AppBreadcrumbModule,
  AppHeaderModule,
  AppFooterModule,
  AppSidebarModule,
} from '@coreui/angular';

// Import routing module
import { AppRoutingModule } from './app.routing';

// Import 3rd party components
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';

import { LoginComponent } from './views/login/login.component';
import { LoginService } from './views/login/login.service';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTableModule } from 'angular2-datatable';
import { NgbdModalContentComponent } from './shared/ngbd-modal-content/ngbd-modal-content.component';
import { NgbDateCustomParserFormatter } from './common/dateformat';
import { ForgotPasswordComponent } from './views/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './views/reset-password/reset-password.component';
import { SignupComponent } from './views/signup/signup.component';
import { ToasterModule } from 'angular2-toaster';
import { TakePhotoModalComponent } from './shared/ngbd-modal-content/custom-components/take-photo-modal/take-photo-modal.component';
import { WebcamModule } from 'ngx-webcam';
import { AccountAtivationComponent } from './views/account-ativation/account-ativation.component';
@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AppAsideModule,
    AppBreadcrumbModule.forRoot(),
    AppFooterModule,
    AppHeaderModule,
    AppSidebarModule,
    PerfectScrollbarModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    HttpClientModule,
    ToasterModule.forRoot(),
    NgxSpinnerModule,
    HttpClientModule,
    FormsModule,
    DataTableModule,
    NgbModule,
    ReactiveFormsModule,
    WebcamModule
    //NgbTypeaheadModule
  ],
  declarations: [
    AppComponent,
    ...APP_CONTAINERS,
    LoginComponent,
    DashboardComponent,
    NgbdModalContentComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    SignupComponent,
    TakePhotoModalComponent,
    AccountAtivationComponent,
  ],
  entryComponents: [NgbdModalContentComponent, TakePhotoModalComponent],
  providers: [AuthGuard,LoginService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi:true
    },
    {provide: NgbDateParserFormatter, useClass: NgbDateCustomParserFormatter},
    BsModalService
    ],

  bootstrap: [ AppComponent ]

})
export class AppModule { }
