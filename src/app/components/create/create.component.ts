import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  createForm: FormGroup;

  constructor(private adminService: AdminService, private fb: FormBuilder, private router: Router) { 
    this.createForm = this.fb.group({
      title: ['', Validators.required],
      author: '',
      content: '',
      sampleContent: '',
      imageURL: ''
    });
  }

  addArticle(title, author, content, sampleContent, imageURL) {
    this.adminService.addArticle(title, author, content, sampleContent, imageURL).subscribe(() => {
      this.router.navigate(['/admin']);
    });
  }

  ngOnInit() {
  }

}
