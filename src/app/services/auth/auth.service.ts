import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

import { environment } from '../../../environments/environment';
import {isNullOrUndefined} from 'util';

const CLIENT_ID = 'fooClientIdPassword';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  jwtHelper = new JwtHelperService();

  constructor(
    private http: HttpClient
  ) {
  }

  public getToken(): string {
    return localStorage.getItem('token');
  }

  login(body: any): Observable<any> {
    const url = `${environment.profileApiUrl}/userAccount/login`;
    return this.http.post(url, Object.assign({client_id: CLIENT_ID}, body)).pipe(
      map(this.extractData)
    );
  }

  public logOut() {
    localStorage.removeItem('token');
  }

  register(body: any): Observable<any> {
    const url = `${environment.profileApiUrl}/userAccount/register`;
    return this.http.post(url, Object.assign({client_id: CLIENT_ID}, body)).pipe(
      map(this.extractData)
    );
  }

  sendEmail(body: any) {
    const url = `${environment.profileApiUrl}/emailToken/sendEmail`;
    const formData: FormData = new FormData();
    Object.keys(body).map((key: any) => {
      formData.append(key, body[key]);
    });
    return this.http.post(url, formData).pipe(
      map(this.extractData)
    );
  }

  loginSuccess(data: any) {
    this.storeUserInformation(data.resultMap);
  }

  getUserInfo() {
    const token = localStorage.getItem('token');
    const userInfo = this.jwtHelper.decodeToken(token);
    return userInfo || {};
  }

  storeUserInformation(data: any) {
    if (data) {
      localStorage.setItem('token', data.accesstoken);
    }
  }

  isAuthenticated() {
    const token = localStorage.getItem('token');
    return token ? true : false;
  }

  private extractData(res: Response) {
    const body = res;
    return body || {};
  }

  public isTokenExpired() {
    const token = localStorage.getItem('token');
    if (isNullOrUndefined(token)) {
      return true;
    }
    const date = this.jwtHelper.getTokenExpirationDate(token);
    if (date === undefined) return false;
    return !(date.valueOf() > new Date().valueOf());
  }
}
