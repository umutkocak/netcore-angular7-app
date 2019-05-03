import { Register } from './../models/register';
import { Injectable } from '@angular/core';
import { LoginUser } from '../models/loginUser';
import { HttpHeaders, HttpClient } from '@angular/common/http';
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
    this.httpClient
      .post(this.path + 'login', loginUser, { headers })
      .subscribe(data => {
        if (data) {
          this.saveToken(data[this.TOKEN_KEY]);
          this.userToken = data[this.TOKEN_KEY];
          this.decodedToken = this.getCurrentUserId();
          this.alertifyService.success(this.jwtHelper.decodeToken(this.userToken).unique_name + ' hoşgeldiniz. Giriş yapıldı.');
          this.router.navigateByUrl('/city');
        }
      });
  }


  loggedIn() {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }

  getCurrentUserId() {
    const token = localStorage.getItem('token');
    if (token) {
      return this.jwtHelper.decodeToken(token);
    }
  }

  register(registerUser: Register) {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    this.httpClient
      .post(this.path + 'register', registerUser, { headers })
      .subscribe(data => {

      });
  }

  saveToken(token: string) {
    localStorage.setItem(this.TOKEN_KEY, token);
    console.log(this.jwtHelper.decodeToken(token));
  }

  logOut() {
    localStorage.removeItem(this.TOKEN_KEY);
    this.alertifyService.error('Sistemden çıkış yapıldı');
  }
}
