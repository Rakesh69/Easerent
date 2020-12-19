import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, empty } from 'rxjs';
import { catchError, tap, map, finalize } from 'rxjs/operators';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import 'rxjs/add/operator/do';
import { messageConstant } from '../constant/messageConstant';
import { CommonService } from '../common/commonService';
import { ToasterService } from 'angular2-toaster';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private _router: Router, private _commonService: CommonService, private toasterService: ToasterService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add authorization header with jwt token if available
    let access_token: any = localStorage.getItem('token');

    if (access_token) {
      access_token = access_token.replace(/"/g, "")
      request = request.clone({ headers: request.headers.set('Authorization', `Bearer ${access_token}`) });
    }

    if (!request.headers.has('content-type')) {
      request.headers.set('content-type', 'application/json; charset=utf-8');
      request.headers.set('accept', 'application/json, text/plain, */*');
    }

    return next.handle(request).pipe(map(event => {
      //this._commonService.showLoading();
      return event;
    }), catchError(err => {
      // this._commonService.hideLoading();
      if (err.status === 401) {
        localStorage.removeItem('loginUser');
        this._router.navigate(['/login']);
        return null;
      }
      else if (err.status === 500) {
        this.toasterService.pop('error', 'Error', messageConstant.Common.UnAuthorized);
        return throwError(err);
      }
      else {
        return throwError(err);
      }
    }), finalize(() => {
      //this._commonService.hideLoading();
    }));
  }
}
