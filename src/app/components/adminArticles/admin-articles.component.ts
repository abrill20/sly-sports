import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material';

import { Article } from '../../article.model';
import { AdminService } from '../../services/admin.service'
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-articles',
  templateUrl: './admin-articles.component.html',
  styleUrls: ['./admin-articles.component.scss']
})
export class AdminArticlesComponent implements OnInit {

  articles: Article[];
  displayedColumns = ['title', 'author', 'sampleContent', 'actions'];
  user: any;

  constructor(private adminService: AdminService, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    let prof = this.authService.getProfile();
    prof.subscribe((profile: any) => {
      this.user = profile.user;
    },
      err => {
        console.log(err);
        return false;
      });
    

    this.fetchArticles();
  }

  fetchArticles() {
    this.adminService
      .getArticles()
      .subscribe((data: Article[]) => {
        this.articles = data;
    })
  }

  editArticle(id) {
    if(this.authService.isAdmin(this.user)) {
      this.router.navigate([`/edit/${id}`]);
    } else
      this.router.navigate(['/articles']);
  }

  deleteArticle(id) {
    if(this.authService.isAdmin(this.user)) {
      this.adminService.deleteArticle(id).subscribe(() => {
        this.fetchArticles();
      });
    }
  }

}
