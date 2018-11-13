import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authToken: any;
  user: any;
  helper = new JwtHelperService();


  //uri = 'http://localhost:8080/';
  //uri = '' // for prod
  uri = environment.apiURL;

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService, private router: Router) { }


  registerUser(user) {
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json');
    return this.http.post(`${this.uri}api/users/register`, user, { headers: headers })
  }

  authenticateUser(user) {
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json');
    return this.http.post(`${this.uri}api/users/authenticate`, user, { headers: headers })
  }

  async getProfile() {
    this.loadToken();
    let headers = await new HttpHeaders()
      .set('Authorization', this.authToken).set('Content-Type', 'application/json');
    return this.http.get(`${this.uri}api/users/profile`, { headers: headers })
  }

  isAdmin(user) {
    if (!user) {
      return false;
    }
    if (user.privileges == 'admin') {
      return true;
    }
    return false;
  }

  storeUserData(token, user) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
    if(environment.production == false) this.authToken = 'Bearer ' + this.authToken
  }

  loggedIn() {
    const token = this.jwtHelper.tokenGetter();
    if (!token) return false;
    return !this.jwtHelper.isTokenExpired();
  }

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
}
