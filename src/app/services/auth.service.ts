import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authToken: any;
  user: any;
  helper = new JwtHelperService();


  //uri = 'http://localhost:8080/';
  uri = '' // for prod

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
    console.log(headers);
    this.http.get(`${this.uri}api/users/profile`, { headers: headers })
    .subscribe((profile: any) => {
      this.user = profile.user;
      console.log("the user ", this.user);
    },
      err => {
        console.log(err);
        return false;
      })
    console.log("MY USER IS ", this.user);
    return this.user;
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
