import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable()
  export class AdminGuard implements CanActivate{
    
    user: any;

    constructor(private authService: AuthService, private router: Router) {}

    canActivate() {
      console.log("Get profile is ", this.authService.getProfile());
      this.authService.getProfile().subscribe(profile => {
        this.user = profile;
        console.log("User is ", this.user);
      },
      err => {
        console.log(err);
        return false;
      })
      console.log("A ", this.user);
      //remove this
      return true;
      if(this.authService.isAdmin(this.user)) {
        return true;
      } else {
        this.router.navigate(['/articles']);
        return false;
      }
      
      
    }
  }