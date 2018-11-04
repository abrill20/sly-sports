import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  username: String;
  password: String;
  loginForm: FormGroup

  constructor(private router: Router, private authService: AuthService, private snackBar: MatSnackBar, private fb: FormBuilder) { 
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  
  ngOnInit() {
  }

  onLoginSubmit(username, password) {
    console.log('submit pressed');
    const user = {
      username: username,
      password: password
    }

    this.authService.authenticateUser(user).subscribe(data => {
      if(data.success) {
        this.authService.storeUserData(data.token, data.user);
        this.snackBar.open('You are now logged in', 'OK', {
          duration: 3000
        });
        this.router.navigate(['profile']);
      } else {
        this.snackBar.open(data.msg, 'OK', {
          duration: 3000
        });
      }
    })
  }

  onLogoutClick() {
    this.authService.logout();
    this.snackBar.open('You are logged out', 'OK', {
      duration: 3000
    });
    return false;
  }

}
