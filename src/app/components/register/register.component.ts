import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  username: String;
  password: String;
  registerForm: FormGroup

  constructor(private fb: FormBuilder, private validateService: ValidateService, private authService: AuthService, private router: Router, private snackBar: MatSnackBar) { 
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(30)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  ngOnInit() {
  }

  onRegisterSubmit(username, password) {
    const user = {
      username: username,
      password: password
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
