import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user: Object;

  constructor(private authService: AuthService, private router: Router) { }

  async ngOnInit() {
    let prof = await this.authService.getProfile()
    
    prof.subscribe((profile:any) => {
      this.user = profile.user;
      console.log(this.user);
    },
    err => {
      console.log(err);
      return false;
    })
    console.log(this.user);

  }

}

