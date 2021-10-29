import { Component, OnDestroy, OnInit } from '@angular/core';
import {CartServiceService } from '@ntig9/orders';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'ui-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit, OnDestroy {

  private ngUnsubscribe = new Subject();
  cartData = 0;

  constructor(private cartToken: CartServiceService) { }

  ngOnInit(): void {
    this.cartToken.cart$.pipe(takeUntil(this.ngUnsubscribe)).subscribe(cart => {
      this.cartData = cart.length
    })
  }
  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
