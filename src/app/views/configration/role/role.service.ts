import { Injectable } from '@angular/core';
import { urlConstant } from '../../../constant/urlConstant';
import { CommonService} from '../../../common/commonService';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { debounce } from "rxjs/operator/debounce";
import { map } from "rxjs/operators";
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(public _commonService:CommonService, public http:HttpClient) { }

  GetRoleList() {
    return of('');
    // return this._commonService.get(urlConstant.Role.GetRoleList)
    //   .pipe(map((x: Response) => x));
  }

  GetAllRoleList() {
    return of('');
    // return this._commonService.get(urlConstant.Role.GetAllRoleList)
    //   .pipe(map((x: Response) => x));
  }

  GetRoleGetById(Id) {
    return of('');
    // return this._commonService.get(urlConstant.Role.GetRoleGetById+"?Id="+Id)
    //   .pipe(map((x: Response) => x));
  }

  RoleSave(model) {
    return of('');
    // return this._commonService.post(urlConstant.Role.RoleSave,model)
    //   .pipe(map((x: Response) => x));
  }

  DeleteRole(Id) {
    return of('');
    // return this._commonService.get(urlConstant.Role.DeleteRole+"?Id="+Id)
    //   .pipe(map((x: Response) => x));
  }

  GetModuleList() {
    return of('');
    // return this._commonService.get(urlConstant.Module.GetModuleList)
    //   .pipe(map((x: Response) => x));
  }

}
