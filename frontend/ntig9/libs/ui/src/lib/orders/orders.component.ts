import { Component, OnInit } from '@angular/core';
import {CartServiceService } from '@ntig9/orders';

@Component({
  selector: 'ui-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  cartData = 0;

  constructor(private cartToken: CartServiceService) { }

  ngOnInit(): void {
    this.cartToken.cart$.subscribe(cart => {
      this.cartData = cart.length
    })
  }
}
