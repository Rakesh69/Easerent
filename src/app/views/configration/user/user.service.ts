import { Injectable } from '@angular/core';
import { CommonService } from '../../../common/commonService';
import { urlConstant } from '../../../constant/urlConstant';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(public _commonService:CommonService, public http:HttpClient) { }

  GetUserList() {
    return of('');
    // return this._commonService.get(urlConstant.User.GetUserList)
    //   .pipe(map((x: Response) => x));
  }

  GetAllUserList() {
    return of('');
    // return this._commonService.get(urlConstant.User.GetAllUserList)
    //   .pipe(map((x: Response) => x));
  }

  GetUserGetById(Id) {
    return of('');
    // return this._commonService.get(urlConstant.User.GetUserGetById+"?Id="+Id)
    //   .pipe(map((x: Response) => x));
  }

  UserSave(model) {
    return of('');
    // return this._commonService.post(urlConstant.User.UserSave,model)
    //   .pipe(map((x: Response) => x));
  }

  DeleteUser(Id) {
    return of('');
    // return this._commonService.get(urlConstant.User.DeleteUser+"?Id="+Id)
    //   .pipe(map((x: Response) => x));
  }

  ForgotPassword(email) {
    return of('');
    // return this._commonService.get(urlConstant.User.ForgotPassword +"?email="+email)
    //   .pipe(map((x: Response) => x));
  }

  ResetPassword(data) {
    return of('');
    // return this._commonService.post(urlConstant.User.ResetPassword ,data)
    //   .pipe(map((x: Response) => x));
  }

}
