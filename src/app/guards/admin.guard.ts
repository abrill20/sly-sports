import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable()
  export class AdminGuard implements CanActivate{
    
    user: any;
    prof: any;

    constructor(private authService: AuthService, private router: Router) {}

    async canActivate() {

      this.prof = await this.authService.getProfile();
      this.nextThing();
      console.log("Does async work? ", this.user);
      if(this.user.privileges == 'admin') return true;
      else return false;
    }

    async nextThing() {
      await this.prof.subscribe((profile: any) => {
        this.user = profile.user;
        console.log(this.user);
      },
        err => {
          console.log(err);
          return false;
        });
    }
  }