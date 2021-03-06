import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MailService } from '../../services/mail.service'

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  createForm: FormGroup;
  email: any;

  constructor(private fb: FormBuilder, private router: Router, private mailService: MailService) {
    this.createForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      subject: ['', Validators.required],
      message: ['', Validators.required]
    });
   }


  ngOnInit() {
  }

  onContactSubmit(name, email, subject, message) {
    console.log("clicked");
    this.mailService.sendEmail().subscribe((arg: any) => { 
      this.email = arg
    },
      err => {
        console.log(err);
        return false;
      });
    
  }

}
