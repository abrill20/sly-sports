import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MailService {

  constructor(private http: HttpClient) { }

  sendEmail() {
    return this.http.post('incoming_mail', {user: {
      message: 'hello'
    }})
  }
}
