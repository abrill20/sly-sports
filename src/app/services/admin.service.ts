import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  authToken: any;
  user: any;
  helper = new JwtHelperService();

  uri = 'http://localhost:8080/'; //for Dev
  // uri = '' // for prod


  constructor(private http: Http, private httpClient: HttpClient,private jwtHelper: JwtHelperService, private router: Router) { }

  getHeaders() {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return headers;
  }

  getArticles() {
    let headers = this.getHeaders();
    return this.httpClient.get(`${this.uri}api/admin`)
  }

  getArticleById(id) {
    let headers = this.getHeaders();
    return this.http.get(`${this.uri}api/admin/${id}`, {headers: headers})
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
    return this.http.post(`${this.uri}api/admin/add`, article, {headers: headers})
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
    return this.http.post(`${this.uri}api/admin/update/${id}`, article, {headers: headers})
  }

  deleteArticle(id) {
    let headers = this.getHeaders();
    return this.http.get(`${this.uri}api/admin/delete/${id}`, {headers:headers})
  }

  loadToken(){
    const token = localStorage.getItem('id_token');
    this.authToken = token;
    console.log("token is : ", this.authToken);
  }
}
