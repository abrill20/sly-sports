import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidateService {

  constructor() { }

  validateRegister(user) {
    if(user.username == undefined || user.password == undefined) {
      return false;
    } else
    return true;
  }

}
