import { Register } from './../models/register';
import { Injectable } from '@angular/core';
import { LoginUser } from '../models/loginUser';
import {
  HttpHeaders,
  HttpClient,
  HttpErrorResponse
} from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { AlertifyService } from './alertify.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private alertifyService: AlertifyService
  ) { }
  path = 'https://localhost:5001/api/auth/';
  userToken: any;
  decodedToken: any;
  TOKEN_KEY = 'token';
  jwtHelper = new JwtHelperService();

  login(loginUser: LoginUser) {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    this.httpClient.post(this.path + 'login', loginUser, { headers }).subscribe(
      (data: Response) => {
        if (data) {
          this.saveToken(data[this.TOKEN_KEY]);
          this.userToken = data[this.TOKEN_KEY];
          this.decodedToken = this.getDecodeToken();
          this.alertifyService.success(this.decodedToken.unique_name + ' hoşgeldiniz. Giriş yapıldı.');
          this.router.navigateByUrl('/city');
        }
      },
      (error: any) => {
        this.alertifyService.error(error.status + ' ' + error.statusText);
      }
    );
  }

  loggedIn() {
    const token = localStorage.getItem(this.TOKEN_KEY);
    try {
      return !this.jwtHelper.isTokenExpired(token);
    } catch (error) {
      return false;
    }
  }

  getDecodeToken() {
    const token = localStorage.getItem(this.TOKEN_KEY);
    if (token) {
      return this.jwtHelper.decodeToken(token);
    }
  }

  getCurrentUserId() {
    const token = localStorage.getItem(this.TOKEN_KEY);
    if (token) {
      return this.jwtHelper.decodeToken(token).nameid;
    }
  }

  register(registerUser: Register) {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    this.httpClient
      .post(this.path + 'register', registerUser, { headers })
      .subscribe(
        (data: Response) => {
          this.alertifyService.success('Kayıt işleminiz başarıyla gerçekleştirilmiştir.');
        },
        (error: any) => {
          this.alertifyService.error(error.status + ' ' + error.statusText);
        }
      );
  }

  saveToken(token: string) {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  logOut() {
    localStorage.removeItem(this.TOKEN_KEY);
    this.alertifyService.success('Sistemden çıkış yapıldı');
  }
}
