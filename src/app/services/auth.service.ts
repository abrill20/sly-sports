import { Injectable } from '@angular/core';
import { Http, Headers} from '@angular/http';
import { map } from 'rxjs/operators';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authToken: any;
  user: any;
  helper = new JwtHelperService();

  uri = 'http://localhost:8080';

  constructor(private http: Http, private jwtHelper: JwtHelperService, private router: Router) { }

  
  registerUser(user) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(`users/register`, user, {headers: headers})
    .pipe(map(res => res.json()))
  }

  authenticateUser(user) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(`users/authenticate`, user, {headers: headers})
    .pipe(map(res => res.json()))
  }

  getProfile() {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get(`users/profile`, {headers: headers})
    .pipe(map(res => res.json()))
  }

  isAdmin(user) {
    if(!user) {
      return false;
    }
    if(user.privileges == 'admin') {
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

  loadToken(){
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  loggedIn(){
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
