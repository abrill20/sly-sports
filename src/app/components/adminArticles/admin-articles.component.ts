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

  async ngOnInit() {
    // this.authService.getProfile().subscribe((profile:any) => {
    //   this.user = profile.user;
    // },
    // err => {
    //   console.log(err);
    //   return false;
    // })
    let prof = await this.authService.getProfile();
    console.log("IN PROF ", prof);
    prof.subscribe((profile: any) => {
      this.user = profile.user;
      console.log(this.user);
    },
      err => {
        console.log(err);
        return false;
      });
    

    this.fetchArticles();
  }

  fetchArticles() {
    var myarticles
    this.adminService
      .getArticles()
      .subscribe((data: Article[]) => {
        console.log("data is", data)
        this.articles = data;
        console.log('Data Requested ...');
    })
    console.log("my articles are: ", this.articles);
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
