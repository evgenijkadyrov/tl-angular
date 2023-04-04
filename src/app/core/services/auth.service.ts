import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { CommonResponse } from '../models/commonResponse.models';
import { AuthEnum } from '../enums/auth.enum';
import { Router } from '@angular/router';
export interface LoginRequestType {
  email: string;
  password: string;
  rememberMe: boolean;
}
export interface AuthMeResponse {
  email: string;
  login: string;
  id: number;
}
@Injectable()
export class AuthService {
  isAuth = false;
  resolveAuthRequest: Function = () => {};
  authRequest = new Promise((resolve) => {
    this.resolveAuthRequest = resolve;
  });
  constructor(private http: HttpClient, private router: Router) {}
  login(data: Partial<LoginRequestType>) {
    this.http
      .post<CommonResponse<{ userId: number }>>(
        `${environment.baseUrl}/auth/login`,
        data
      )
      .subscribe((res) => {
        if (res.resultCode === AuthEnum.success) {
          this.router.navigate(['/']);
        }
      });
  }
  logout() {
    this.http
      .delete<CommonResponse>(`${environment.baseUrl}/auth/login`)
      .subscribe((res) => {
        if (res.resultCode === AuthEnum.success) {
          this.router.navigate(['/login']);
        }
      });
  }
  me() {
    this.http
      .get<CommonResponse<AuthMeResponse>>(`${environment.baseUrl}/auth/me`)
      .subscribe((res) => {
        if (res.resultCode === AuthEnum.success) {
          this.isAuth = true;
        }
        this.resolveAuthRequest();
      });
  }
}
