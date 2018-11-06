import { Injectable, OnInit } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable()
  export class AdminGuard implements CanActivate{
    
    user: any;

    constructor(private authService: AuthService, private router: Router) {}

    async ngOnInit() {
      await this.authService.getProfile().subscribe(profile => {
        this.user = profile.user;
      },
      err => {
        console.log(err);
        return false;
      })
      
    }
    canActivate() {
      this.authService.getProfile().subscribe(profile => {
        this.user = profile.user;
      },
      err => {
        console.log(err);
        return false;
      })
      console.log(this.user);
      if(this.authService.isAdmin(this.user)) {
        return true;
      } else {
        this.router.navigate(['/articles']);
        return false;
      }
    }
  }