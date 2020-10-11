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
export class ProductCategoryService {

  constructor(public _commonService:CommonService) { }

  GetSARProductCategoryList() {
    return of('');
    // return this._commonService.get(urlConstant.SARProductCategory.GetSARProductCategoryList)
    //   .pipe(map((x: Response) => x));
  }



  GetSARProductCategoryGetById(Id) {
    return of('');
    // return this._commonService.get(urlConstant.SARProductCategory.GetSARProductCategoryGetById+"?Id="+Id)
    //   .pipe(map((x: Response) => x));
  }

  SARProductCategorySave(model) {
    return of('');
    // return this._commonService.post(urlConstant.SARProductCategory.SARProductCategorySave,model)
    //   .pipe(map((x: Response) => x));
  }

  DeleteSARProductCategory(Id) {
    return of('');
    // return this._commonService.get(urlConstant.SARProductCategory.DeleteSARProductCategory+"?Id="+Id)
    //   .pipe(map((x: Response) => x));
  }
}
