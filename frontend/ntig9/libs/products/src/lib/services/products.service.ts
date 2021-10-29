
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { OrderProductObject, ProductObject, ProductsObject} from '@ntig9/products';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { environment } from '../../../../../apps/admin/src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  // create public URL for api
 /*  public URL = 'http://localhost:3000/'; */
  URL = environment.apiUrl;

  constructor(private _http: HttpClient) { }
  getProducts(): Observable<ProductsObject> {
    return this._http.get<ProductsObject>(`${this.URL}Product`);
  }

  createProduct(product: FormData): Observable<ProductObject> {
    return this._http.post<ProductObject>(`${this.URL}product/add`, product);
  }
  deleteProduct(productID: string | undefined): Observable<ProductObject> {
    return this._http.delete<ProductObject>(`${this.URL}product/delete/${productID}`);
  }
  updateProduct(productID: string | undefined, update:FormData): Observable<ProductObject> {
    return this._http.put<ProductObject>(`${this.URL}product/update/${productID}`, update);
  }
  getProduct(productID: string | undefined): Observable<ProductObject> {
    return this._http.get<ProductObject>(`${this.URL}product/${productID}`);
  }
  getOrderProduct(productID: string | undefined): Observable<OrderProductObject> {
    return this._http.get<OrderProductObject>(`${this.URL}product/${productID}`);
  }
  getFeaturedProducts(): Observable<ProductsObject> {
    return this._http.get<ProductsObject>(`${this.URL}product/featured`);
  }
}
