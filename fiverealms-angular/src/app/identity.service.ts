import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface UserInfo{
  userId: string,
  authToken: string
}
export interface LoginAttempt{
  username: string,
  password: string,
  timestamp?: number
}

@Injectable({
  providedIn: 'root'
})
export class IdentityService {
  constructor(private http: HttpClient) { }
  login(attempt: LoginAttempt){
    attempt.timestamp = (new Date()).getTime()
    const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8')
    return this.http.post<string>('http://127.0.0.1:4000/authenticate', JSON.stringify(attempt), {headers: headers, responseType: 'text' as 'json'})
  } 
}
