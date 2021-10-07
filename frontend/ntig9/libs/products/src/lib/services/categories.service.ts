/* eslint-disable @nrwl/nx/enforce-module-boundaries */


import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CategoriesObject, CategoryObject } from '@ntig9/products';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  // create public URL for api
  public URL = 'http://localhost:3000/';

  constructor(private _http: HttpClient) { }
  getCategories(): Observable<CategoriesObject> {
    return this._http.get<CategoriesObject>(`${this.URL}category`);
  }

  createCategory(category: CategoriesObject): Observable<CategoryObject> {
    return this._http.post<CategoryObject>(`${this.URL}category/add`, category);
  }
  deleteCategory(categoryID: string | undefined): Observable<CategoryObject> {
    return this._http.delete<CategoryObject>(`${this.URL}category/delete/${categoryID}`);
  }
  updateCategory(categoryID: string | undefined, update:CategoryObject): Observable<CategoryObject> {
    return this._http.put<CategoryObject>(`${this.URL}category/update/${categoryID}`, update);
  }
  getCategory(categoryID: string | undefined): Observable<CategoryObject> {
    return this._http.get<CategoryObject>(`${this.URL}category/${categoryID}`);
  }
}
