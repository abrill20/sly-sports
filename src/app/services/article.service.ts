import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Router } from '@angular/router';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  //uri = 'http://localhost:8080/';
  //uri = '' // for prod
  uri = environment.apiURL;
  

  constructor(private http: HttpClient, private router: Router) { }

  getArticles() {
    return this.http.get(`${this.uri}api/articles`)
  }

  getArticleById(id) {
    return this.http.get(`${this.uri}api/articles/${id}`)
  }

  addComment(id, comment, user) {
    let headers = new HttpHeaders(); //this will be used to make sure only logged in users can comment
    let username = user.username;
    return this.http.post(`${this.uri}api/articles/${id}`, {comment: comment, username: username})
  }

}
