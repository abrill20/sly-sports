import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Http, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  uri = 'http://localhost:8080';

  constructor(private http: Http, private httpPost: Http, private router: Router) { }

  getArticles() {
    return this.http.get(`${this.uri}/articles`).pipe(map(res => res.json()));;
  }

  getArticleById(id) {
    return this.http.get(`${this.uri}/articles/${id}`);
  }

  addComment(id, comment, username) {
    let headers = new Headers(); //this will be used to make sure only logged in users can comment
    return this.http.post(`${this.uri}/articles/${id}`, {comment: comment, username: username}, {})
      .pipe(map(res => res.json()));
  }

}
