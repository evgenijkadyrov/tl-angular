import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { CommonResponse } from '../models/commonResponse.models';
import { AuthEnum } from '../enums/auth.enum';
import { Router } from '@angular/router';
import { catchError, EMPTY } from 'rxjs';
import { AuthMeResponse, LoginRequestType } from '../models/auth.models';
import { NotificationService } from './notification.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class AuthService {
  isAuth = false;
  resolveAuthRequest: Function = () => {};
  authRequest = new Promise((resolve) => {
    this.resolveAuthRequest = resolve;
  });
  constructor(
    private http: HttpClient,
    private router: Router,
    private notificationService: NotificationService
  ) {}
  login(data: Partial<LoginRequestType>) {
    this.http
      .post<CommonResponse<{ userId: number }>>(
        `${environment.baseUrl}/auth/login`,
        data
      )
      .pipe(catchError(this.errorHandler.bind(this)))
      .subscribe((res) => {
        if (res.resultCode === AuthEnum.success) {
          this.router.navigate(['/']);
        }
      });
  }
  logout() {
    this.http
      .delete<CommonResponse>(`${environment.baseUrl}/auth/login`)
      .pipe(catchError(this.errorHandler.bind(this)))
      .subscribe((res) => {
        if (res.resultCode === AuthEnum.success) {
          this.router.navigate(['/login']);
        }
      });
  }
  me() {
    this.http
      .get<CommonResponse<AuthMeResponse>>(`${environment.baseUrl}/auth/me`)
      .pipe(catchError(this.errorHandler.bind(this)))
      .subscribe((res) => {
        if (res.resultCode === AuthEnum.success) {
          this.isAuth = true;
        }
        this.resolveAuthRequest();
      });
  }
  private errorHandler(err: HttpErrorResponse) {
    this.notificationService.handleError(err.message);
    console.log('dddfdf', err.message);
    return EMPTY;
  }
}
