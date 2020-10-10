import { Injectable } from '@angular/core';
import { urlConstant } from '../../constant/urlConstant';
import { CommonService } from '../../common/commonService';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { debounce } from "rxjs/operator/debounce";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(public _commonService: CommonService, public http: HttpClient) { }

  login(data) {
    // return this.http.post(urlConstant.accountModule.LoggedIn, data)
  }
}
