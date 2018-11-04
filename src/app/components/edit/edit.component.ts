import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AdminService } from '../../services/admin.service';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Article } from '../../article.model';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  id: String;
  article: any = {};
  updateForm: FormGroup;

  constructor(private adminService: AdminService, private router: Router, private route: ActivatedRoute, private snackBar: MatSnackBar, private fb: FormBuilder) { 
    this.createForm();

  }

  createForm() {
    this.updateForm = this.fb.group({
      title: ['', Validators.required],
      author: '',
      content: '',
      sampleContent: '',
      imageURL: ''
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params.id;
      this.adminService.getArticleById(this.id).subscribe(res => {
        this.article = res;
        this.article = JSON.parse(this.article._body);
        this.updateForm.get('title').setValue(this.article.title);
        this.updateForm.get('author').setValue(this.article.author);
        this.updateForm.get('content').setValue(this.article.content);
        this.updateForm.get('sampleContent').setValue(this.article.sampleContent);
        this.updateForm.get('imageURL').setValue(this.article.imageURL)

      });
    });
  }

  updateArticle(title, author, content, sampleContent, imageURL) {
    this.adminService.updateArticle(this.id, title, author, content, sampleContent, imageURL).subscribe(() => {
      this.snackBar.open('Article updated successfully', 'OK', {
        duration: 3000
      });
    });
  }

}
