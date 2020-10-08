import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import Containers
import { DefaultLayoutComponent } from './containers';
import { LoginComponent } from './views/login/login.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import {AuthGuard} from './common/auth.guard'
import { ForgotPasswordComponent } from './views/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './views/reset-password/reset-password.component';
import { SignupComponent } from './views/signup/signup.component';
import { PropertiesComponent } from './views/properties/properties.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'signup',
    component: SignupComponent,
    data: {
      title: 'Signup Page'
    },
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    },
  },
  {
    path: 'forgotPassword',
    component: ForgotPasswordComponent,
    data: {
      title: 'Forgot Password Page'
    },
  },
  {
    path: 'resetPassword/:token/:userId',
    component: ResetPasswordComponent,
    data: {
      title: 'Reset Password Page'
    },
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        data: {
          title: 'dashboard'
        },
        canActivate:[AuthGuard],
      },
      {
        path: 'properties',
        loadChildren: () => import('./views/properties/properties.module').then(m => m.PropertiesModule),
        canActivate:[AuthGuard],
      },
      {
        path: 'rentPayment',
        loadChildren: () => import('./views/rent-payment/rent-payment.module').then(m => m.RentPaymentModule),
        canActivate:[AuthGuard],
      },
      {
        path: 'payments',
        loadChildren: () => import('./views/payments/payments.module').then(m => m.PaymentsModule),
        canActivate:[AuthGuard],
      },
      {
        path: 'profile',
        loadChildren: () => import('./views/profile/profile.module').then(m => m.ProfileModule),
        canActivate:[AuthGuard],
      },
      {
        path: 'changePassword',
        loadChildren: () => import('./views/change-password/change-password.module').then(m => m.ChangePasswordModule),
        canActivate:[AuthGuard],
      },
      {
        path: 'moveInOut',
        loadChildren: () => import('./views/move-in-out/move-in-out.module').then(m => m.MoveInOutModule),
        canActivate:[AuthGuard],
      },
      {
        path: 'configration',
        loadChildren: () => import('./views/configration/configration.module').then(m => m.ConfigrationModule)
      },
    ]
  },
  //{ path: '**', component: P404Component }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
