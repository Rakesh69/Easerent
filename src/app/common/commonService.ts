import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as CryptoJS from 'crypto-js';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError, of } from 'rxjs';
import { Router } from '@angular/router';
import { catchError, map } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs/Rx';
import { Globals } from '../globals';

@Injectable({
    providedIn: 'root',
})

export class CommonService {
    //public loginUser = localStorage.getItem('loginUser');
    public config = {};
    public userData: any = {};
    public loading: any;

    constructor(
        public http: HttpClient,
        public router: Router,
        public spinner: NgxSpinnerService
    ) { }

    private prepareHeader(headers: HttpHeaders | null): object {
        headers = headers || new HttpHeaders();
        headers = headers.set('Content-Type', 'application/json');
        headers = headers.set('Accept', 'application/json');
        return {
            headers: headers
        }
    }

    get<T>(url: string, headers?: HttpHeaders | null): Observable<T> {
        const expandedHeaders = this.prepareHeader(headers);
        return this.http.get<T>(url, expandedHeaders)
    }

    post(url: string, body: any, headers?: HttpHeaders | null): Observable<any> {
        const expandedHeaders = this.prepareHeader(headers);
        return this.http.post(url, body, expandedHeaders);
    }

    public handleError(error: Response | any) {
        // In a real world app, we might use a remote logging infrastructure
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || {error: ''};
            const err = JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        //  console.log(errMsg);
        return Observable.throw(errMsg);
    }

    public isValidDate(day: number, month: number, year: number) {
        // Check the ranges of month and year
        if (year < 1000 || year > 3000 || month == 0 || month > 12)
            return false;

        var monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

        // Adjust for leap years
        if (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0))
            monthLength[1] = 29;

        // Check the range of the day
        return day > 0 && day <= monthLength[month - 1];
    };

    public getUserOffset() {
        return new Date().getTimezoneOffset();
    }

    // public getUserDate() {
    //     return (moment(new Date()).format('MM/DD/YYYY  HH:mm:ss'));
    // }

    // public getUserTime() {
    //     return (moment(new Date()).format('HH:mm:ss'));
    // }
    //use for not allow special  character in autocomplete - *,(,),+,?,\
    eventHandler(event: any) {
        if (event.keyCode == 92 || event.keyCode == 42 || event.keyCode == 40 || event.keyCode == 41 || event.keyCode == 43 || event.keyCode == 63 || event.keyCode == 91 || event.keyCode == 93) {
            return false;
        }
    }

    //for encyptdata
    public EncryptData(data) {
        var strKey = 'fl!23net@%$$2!@#';
        var key = CryptoJS.enc.Utf8.parse(strKey);
        var iv = CryptoJS.enc.Utf8.parse(strKey);
        var encdata = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(data), key,
            {
                keySize: 128 / 8,
                iv: iv,
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Pkcs7
            });
        return encdata.toString();
    };

    public DecryptData(data) {
        var strKey = 'fl!23net@%$$2!@#';
        var key = CryptoJS.enc.Utf8.parse(strKey);
        var iv = CryptoJS.enc.Utf8.parse(strKey);
        var decrypted = CryptoJS.AES.decrypt(
            data,
            key,
            {
                iv: iv,
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Pkcs7
            }
        );
        return decrypted.toString(CryptoJS.enc.Utf8);
    };


    // public toastSuccessMsg(title: any, message: any, timeOut?: object) {
    //     this._toastr.success(title, message, timeOut);
    // }

    // public toastErrorMsg(title: any, message: any, timeOut?: object) {
    //     this._toastr.error(title, message, timeOut);
    // }

    // public toastWarningMsg(title: any, message: any, timeOut?: object) {
    //     this._toastr.warning(title, message, timeOut);
    // }

    //show loader 
    public showLoading() {
        this.spinner.show();
    }

    //Hide loader
    public hideLoading() {
        setTimeout(() => {
            /// spinner ends after 5 seconds 
            this.spinner.hide();
        }, 100);
    }

    //Allow only numeric value.
    public numberOnly(event): boolean {
        const charCode = (event.which) ? event.which : event.keyCode;
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
            return false;
        }
        return true;
    }
    //Allow number with decimal
    public onlyDotsAndNumbers(event, txt): boolean {
        var charCode = (event.which) ? event.which : event.keyCode
        if (charCode == 46) {
            if (txt.indexOf(".") < 0)
                return true;
            else
                return false;
        }
        if (txt && txt.indexOf(".") > 0) {
            var txtlen = txt.length;
            var dotpos = txt.indexOf(".");
            if ((txtlen - dotpos) > 2)
                return false;
        }
        if (charCode > 31 && (charCode < 48 || charCode > 57))
            return false;
        return true;
    }

    getLoggedInUserId() {
        if (localStorage.getItem('user'))
            return JSON.parse(localStorage.getItem('user')).Id;
        return null;
    }

    getLoggedInUser() {
        if (localStorage.getItem('user'))
            return JSON.parse(localStorage.getItem('user'));
        return null;
    }




    // get(api: string, reqBody: any = {}): Observable<any> {
    //     const queryParam = Globals.jsonToQueryString(reqBody);
    //     return this.http.get(api + '?' + queryParam);
    // }
    
    getHtml(api: string, reqBody: any = {}): Observable<any> {
        let contentHeaders = new HttpHeaders();
        contentHeaders.append('Accept', 'html/text');
        contentHeaders.append('Content-Type', 'html/text');
    
        const queryParam = Globals.jsonToQueryString(reqBody);
        return this.http.get(api + '?' + queryParam, { headers: contentHeaders, responseType: 'text' });
    }
    
    getAll(api: string, reqBody: any = {}): Observable<any> {
        return this.http.post(api, reqBody);
    }
    
    insert(api: string, reqBody: any = {}): Observable<any> {
        return this.http.post(api, reqBody);
    }
    
    insertWithProgress(api: string, reqBody: any): Observable<any> {
        return this.http.post(api, reqBody, {
        reportProgress: true,
        observe: 'events'
        }).pipe(
        catchError(this.errorMgmt)
        );
    }
    
    update(api: string, reqBody: any = {}): Observable<any> {
        return this.http.put(api, reqBody);
    }
    
    getById(api: string, reqBody: any = {}): Observable<any> {
        const queryParam = Globals.jsonToQueryString(reqBody);
        return this.http.get(api + '?' + queryParam);
    }
    
    // post(api: string, reqBody: any = {}): Observable<any> {
    //     return this.insert(api, reqBody);
    // }
    
    put(api: string, reqBody: any = {}): Observable<any> {
        return this.update(api, reqBody);
    }
    
    delete(api: string, id: String): Observable<any> {
        return this.http.delete(api + '/' + id);
    }
    
    
    
    download(api: string, reqBody: any = {}): Observable<any> {
        const queryParam = Globals.jsonToQueryString(reqBody);
        console.log('URL : ', api + '?' + queryParam);
    
        window.open(api + '?' + queryParam);
    
        return of(true);    
    }
    
    patch(api: string, reqBody: any = {}): Observable<any> {
        return this.http.patch(api, reqBody);
    }
    
    errorMgmt(error: HttpErrorResponse) {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
        errorMessage = error.error.message;
        } else {
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        console.log(errorMessage);
        return throwError(errorMessage);
    }
}

