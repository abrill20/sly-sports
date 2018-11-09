import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { Article } from '../../article.model';
import { ArticleService } from '../../services/article.service'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit {

  articles: Article[];
  constructor(private articleService: ArticleService, private router: Router) { }

  ngOnInit() {
    this.fetchArticles();
  }

  fetchArticles() {
    this.articleService
      .getArticles()
       .subscribe((data: Article[]) => {
         this.articles = data;
       })
  }

  goToArticle(id) {
    this.router.navigate([`/article/${id}`]);
  }

}
