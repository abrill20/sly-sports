import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user: any;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    // let prof = await this.authService.getProfile()
    // console.log(prof);
    // prof.subscribe((profile:any) => {
    //   this.user = profile.user;
    //   console.log(this.user);
    // },
    // err => {
    //   console.log(err);
    //   return false;
    // })
    // console.log(this.user);
    this.getSomething().subscribe(result => {
      this.user = result;
      console.log("user is ", this.user)
    })
  }

  getSomething() {
    return this.authService.getProfile().map(result => {
      this.user = result
      console.log("getsome user is ", this.user);
    },
    err => {
      console.log(err);
      return false;
    })
  }

}

