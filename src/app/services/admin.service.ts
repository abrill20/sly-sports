import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import { JwtHelperService } from '@auth0/angular-jwt';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  authToken: any;
  user: any;
  helper = new JwtHelperService();

  //uri = 'http://localhost:8080/'; //for Dev
  //uri = '' // for prod
  uri = environment.apiURL;


  constructor(private httpClient: HttpClient,private jwtHelper: JwtHelperService, private router: Router) { }

  getHeaders() {
    this.loadToken();
    let headers = new HttpHeaders()
    
    .set('Authorization', this.authToken).set('Content-Type', 'application/json')
    return headers;
  }

  getArticles() {
    let headers = this.getHeaders();
    console.log(environment.apiURL);
    return this.httpClient.get(`${this.uri}api/admin`, {headers: headers})
  }

  getArticleById(id) {
    let headers = this.getHeaders();
    return this.httpClient.get(`${this.uri}api/admin/${id}`, {headers: headers})
  }

  addArticle(title, author, content, sampleContent, imageURL) {
    let headers = this.getHeaders();
    const article = {
      title: title,
      author: author,
      content: content,
      sampleContent: sampleContent,
      imageURL: imageURL
    };
    return this.httpClient.post(`${this.uri}api/admin/add`, article, {headers: headers})
  }

  updateArticle(id, title, author, content, sampleContent, imageURL) {
    let headers = this.getHeaders();
    const article = {
      title: title,
      author: author,
      content: content,
      sampleContent: sampleContent,
      imageURL: imageURL
    };
    return this.httpClient.post(`${this.uri}api/admin/update/${id}`, article, {headers: headers})
  }

  deleteArticle(id) {
    let headers = this.getHeaders();
    return this.httpClient.get(`${this.uri}api/admin/delete/${id}`, {headers:headers})
  }

  loadToken(){
    const token = localStorage.getItem('id_token');
    this.authToken = token;
    if(environment.production == false) this.authToken = 'Bearer ' + this.authToken 
  }
}
