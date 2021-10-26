import { Component } from '@angular/core';
import { CartServiceService } from '@ntig9/orders';

@Component({
  selector: 'ecommerce-store-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor(private cartToken: CartServiceService) { }
  cartdata = this.cartToken.getCartItem();

}
