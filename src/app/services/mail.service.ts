import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MailService {

  constructor(private http: HttpClient) { }

  sendEmail() {
    let headers = new Headers()
    return this.http.post('incoming_mail', {user: {
      message: 'hello'
    }})
  }
}
