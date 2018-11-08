import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable()
  export class AdminGuard implements CanActivate{
    
    user: any;

    constructor(private authService: AuthService, private router: Router) {}

    async canActivate() {

      let prof = await this.authService.getProfile();
      console.log("IN PROF ", prof);
      async () => await prof.subscribe(async (profile: any) => {
        this.user = await profile.user;
        console.log(this.user);
      },
        err => {
          console.log(err);
          return false;
      });
      console.log("Does async work? ", this.user);
      if(this.user.privileges == 'admin')
      return true;
      else return false;
    }
  }