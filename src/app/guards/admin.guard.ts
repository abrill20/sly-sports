import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable()
  export class AdminGuard implements CanActivate{
    
    user: any;

    constructor(private authService: AuthService, private router: Router) {}

    async canActivate() {
      this.authService.getProfile().subscribe((profile: any) => {
        this.user = profile.user;
      },
        err => {
          console.log(err);
          this.router.navigate(['/articles']);
          return false;
        });
      await new Promise((resolve, reject) => setTimeout(resolve, 100));
      if (!this.user) {
        this.router.navigate(['/articles']);
        return false;
      }
      if(this.user.privileges != 'admin') {
        this.router.navigate(['/articles']);
        return false;
      }
      else {
        return true;
      }
    }
  }