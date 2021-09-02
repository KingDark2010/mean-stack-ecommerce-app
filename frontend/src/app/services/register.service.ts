import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  URL = 'http://localhost:3000/'

  constructor(private _http:HttpClient) { }

  register(user:any):Observable<any>{
    return this._http.post(`${this.URL}register`, user)
  }
  login(user:any):Observable<any>{
    return this._http.post(`${this.URL}login`, user)
  }
}
