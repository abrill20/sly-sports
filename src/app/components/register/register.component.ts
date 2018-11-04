import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  username: String;
  password: String;

  constructor(private validateService: ValidateService, private authService: AuthService, private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  onRegisterSubmit() {
    const user = {
      username: this.username,
      password: this.password
    }
    if(!this.validateService.validateRegister(user)) {
      console.log('Please Fill in all fields');
      this.snackBar.open('Please Fill in all fields', 'OK', {
        duration: 3000
      });
      return false;
    }
    //Register User
    this.authService.registerUser(user).subscribe(data => {
      if(data.success) {
        console.log("you are now registered");
        this.router.navigate(['/articles']);
        this.snackBar.open('You are now registered', 'OK', {
          duration: 3000
        });
      } else {
        console.log("you are not registered, something went wrong");
        this.router.navigate(['/register']);
        this.snackBar.open('Error, please try again', 'OK', {
          duration: 3000
        });
      }

    })
  }

  

}
