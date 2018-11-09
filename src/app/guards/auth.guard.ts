import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable()
  export class AuthGuard implements CanActivate{

    user:any;

    constructor(private authService: AuthService, private router: Router) {
    }

    canActivate() {
      return true;

    }
  }