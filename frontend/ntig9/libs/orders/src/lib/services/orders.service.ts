import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OrderObject, OrdersObject } from '../interfaces/orders';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  // create public URL for api
  public URL = 'http://localhost:3000/order/';

  constructor(private _http: HttpClient) { }
  getOrders(): Observable<OrdersObject> {
    return this._http.get<OrdersObject>(`${this.URL}`);
  }

  createOrder(order: OrdersObject): Observable<OrderObject> {
    return this._http.post<OrderObject>(`${this.URL}add`, order);
  }
  deleteOrder(orderID: string | undefined): Observable<OrderObject> {
    return this._http.delete<OrderObject>(`${this.URL}${orderID}`);
  }
  updateOrder(orderID: string | undefined, update:OrderObject): Observable<OrderObject> {
    return this._http.put<OrderObject>(`${this.URL}${orderID}`, update);
  }
  getOrder(orderID: string | undefined): Observable<OrderObject> {
    return this._http.get<OrderObject>(`${this.URL}${orderID}`);
  }
}
