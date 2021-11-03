import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { cartItem, CartServiceService } from '@ntig9/orders';
import { Product } from '@ntig9/products';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'ui-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {

  @Input() products: Product[] = [];
  productPage = false

  constructor(private router:Router, private cartToken: CartServiceService, private toastr: ToastrService) { }

  ngOnInit(): void {
    if(this.router.url === '/products') {
      this.productPage = true
    }
  }

  addToCart(product: Product) {
    const data: cartItem = {
      productID: product._id,
      quantity: 1
    }
    this.cartToken.setCart(data);
    this.toastr.success('Product added to cart', 'Success');
  }

  buyNow(product: Product) {
    const data: cartItem = {
      productID: product._id,
      quantity: 1
    }
    this.cartToken.setCart(data);
    this.router.navigateByUrl('/cart');
  }
}
