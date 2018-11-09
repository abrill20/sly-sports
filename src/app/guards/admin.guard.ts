import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable()
  export class AdminGuard implements CanActivate{
    
    user: any;

    constructor(private authService: AuthService, private router: Router) {}

    async canActivate() {

      let first = await this.authService.getProfile();
      first.subscribe((profile: any) => {
        this.user = profile.user;
      },
        err => {
          console.log(err);
          return false;
        });
      return true;
    }
  }