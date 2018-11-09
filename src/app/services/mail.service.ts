import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MailService {

  constructor(private http: HttpClient) { }

  sendEmail() {
    let headers = new Headers()
    console.log('posting')
    return this.http.post('incoming_mail', {user: {
      message: 'hello'
    }})
  }
}
