import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable()
  export class AuthGuard implements CanActivate{

    user:any;
    constructor(private authService: AuthService, private router: Router) {
      this.authService.getProfile().subscribe(profile => {
        this.user = profile.user;
      },
      err => {
        console.log(err);
        return false;
      })
    }

    canActivate() {
      console.log(this.user);
      if(this.authService.loggedIn()) {
        return true;
      } else {
        this.router.navigate(['/articles']);
        return false;
      }
    }
  }