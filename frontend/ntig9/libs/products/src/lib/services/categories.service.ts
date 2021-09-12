import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {CategoryObject } from '@ntig9/products';
//import { Categories } from '../interfaces/categories';
@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  // create public URL for api
  public URL = 'http://localhost:3000/';

  constructor(private _http: HttpClient) { }
  getCategories(): Observable<CategoryObject> {
    return this._http.get<CategoryObject>(`${this.URL}category`);
  }
}
