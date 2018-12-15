import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Article } from '../../article.model';
import { ArticleService } from '../../services/article.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatFormFieldModule, MatInputModule, MatButtonModule, MatSnackBar } from '@angular/material';
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
  url = 'http://sly-sports.herokuapp.com/';
  user: Object;

  constructor(private authService: AuthService,private articleService: ArticleService, private router: Router, private route: ActivatedRoute, private fb: FormBuilder, private snackBar: MatSnackBar) {
    this.commentForm = this.fb.group({
      comment: ''
    });
   }

   async ngOnInit() {
    let prof = this.authService.getProfile();
    prof.subscribe((profile: any) => {
      this.user = profile.user;
    },
      err => {
        console.log(err);
        return false;
      });

    this.route.params.subscribe(params => {
      this.id = params.id;
      this.articleService.getArticleById(this.id).subscribe(res => {
        this.article = res;
        this.comments = this.article.comments;
      });
    },
    err => {
      console.log(err);
      return false;
    });

    await new Promise((resolve, reject) => setTimeout(resolve, 100));
    if(!this.article) {
      console.log("NO ARTICLE");
      this.router.navigate(['/articlenotfound']);
    }
  }

  addComment(comment) {
    if(!this.user) {
      this.snackBar.open('Comment Unsuccessful', 'OK', {
      duration: 3000
    });

    }
    this.articleService.addComment(this.id, comment, this.user).subscribe(() => {
      //this.router.navigate([`/article/${this.id}`]);
      window.location.reload();
    },
    err => {
      console.log(err);
    });
  }

}
