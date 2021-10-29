/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { OrdersService } from '@ntig9/orders';
import { ProductsService, UsersService } from '@ntig9/products';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'admin-dashbored',
  templateUrl: './dashbored.component.html',
  styleUrls: ['./dashbored.component.css']
})
export class DashboredComponent implements OnInit, OnDestroy {

  private ngUnsubscribe = new Subject();

  productsCounter = 0;
  Products = 0;

  CustomersCounter = 0;
  Customers = 0;

  ordersCounter = 0;
  Orders = 0;

  totalSalesCounter = 0;


  productCountStop: any = setInterval(() => {
    this.productsCounter++;
    if(this.productsCounter == this.Products){
      clearInterval(this.productCountStop);
    }
  }, 300);

  CustomersCountStop: any = setInterval(() => {
    this.CustomersCounter++;
    if(this.CustomersCounter == this.Customers){
      clearInterval(this.CustomersCountStop);
    }
  }, 300);

  orderesCountStop: any = setInterval(() => {
    this.ordersCounter++;
    if(this.ordersCounter == this.Orders){
      clearInterval(this.orderesCountStop);
    }
  }, 300);

  totalSalesCounterStop: any = setInterval(() => {
    this.totalSalesCounter++;
    if(this.totalSalesCounter == 1502){
      clearInterval(this.totalSalesCounterStop);
    }
  },);

  constructor(private usersServices: UsersService, private productsServices: ProductsService, private ordersServices: OrdersService) { }

  ngOnInit(): void {
    this.productsServices.getProducts().pipe(takeUntil(this.ngUnsubscribe)).subscribe(products => {
      this.Products = products.data.length;
    });
    this.usersServices.getUsers().pipe(takeUntil(this.ngUnsubscribe)).subscribe(users => {
      this.Customers = users.data.length;
    });
    this.ordersServices.getOrders().pipe(takeUntil(this.ngUnsubscribe)).subscribe(orders => {
      this.Orders = orders.data.length;
    });
  }


  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
