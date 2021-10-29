import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OrderObject, OrdersObject } from '../interfaces/orders';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { environment } from '../../../../../apps/admin/src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  // create public URL for api
  /* public URL = 'http://localhost:3000/order/'; */
  //get apiUrl from environment
  URL = environment.apiUrl;


  constructor(private _http: HttpClient) { }
  getOrders(): Observable<OrdersObject> {
    return this._http.get<OrdersObject>(`${this.URL}order`);
  }

  createOrder(order: OrdersObject): Observable<OrderObject> {
    return this._http.post<OrderObject>(`${this.URL}add`, order);
  }
  deleteOrder(orderID: string | undefined): Observable<OrderObject> {
    return this._http.delete<OrderObject>(`${this.URL}order/${orderID}`);
  }
  updateOrder(orderID: string | undefined, update:OrderObject): Observable<OrderObject> {
    return this._http.put<OrderObject>(`${this.URL}order/${orderID}`, update);
  }
  getOrder(orderID: string | undefined): Observable<OrderObject> {
    return this._http.get<OrderObject>(`${this.URL}order/${orderID}`);
  }
}
