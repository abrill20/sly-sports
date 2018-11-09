import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable()
  export class AdminGuard implements CanActivate{
    
    user: any;

    constructor(private authService: AuthService, private router: Router) {}

    async canActivate() {

      let first = await this.authService.getProfile();
      let next = await first.subscribe(async (profile: any) => {
        this.user = await profile.user;
        console.log(this.user);
        console.log(profile.headers);
      },
        err => {
          console.log(err);
          return false;
        });
      console.log(this.user);
      return true;
    }
  }