import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Article } from '../../article.model';
import { ArticleService } from '../../services/article.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatFormFieldModule, MatInputModule, MatButtonModule, MatCardModule, MatTableModule, MatDividerModule, MatSnackBarModule } from '@angular/material';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {

  id: String;
  article: any;
  commentForm: FormGroup;
  comments: any;
  url = 'http://localhost:4200/articles';
  user: Object;

  constructor(private authService: AuthService,private articleService: ArticleService, private router: Router, private route: ActivatedRoute, private fb: FormBuilder) {
    this.commentForm = this.fb.group({
      comment: ''
    });
   }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params.id;
      this.articleService.getArticleById(this.id).subscribe(res => {
        this.article = res.json();
        this.comments = this.article.comments;
      });
    });
    this.authService.getProfile().subscribe(res => {
      this.user = res.user.username;
    },
    err => {
      console.log(err);
      return false;
    })
  }

  addComment(comment) {
    this.articleService.addComment(this.id, comment, this.user).subscribe(() => {
      this.router.navigate([`/articles`]);
    });
  }

}
