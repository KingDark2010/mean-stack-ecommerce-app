import { Component, OnInit } from '@angular/core';
import { CartServiceService } from '@ntig9/orders';
import { Product, ProductsService } from '@ntig9/products';

@Component({

  selector: 'ecommerce-store-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {


  products: Product[] = [];
  cartProducts: Product[] = [];

  constructor(private productServices: ProductsService, private cartToken: CartServiceService,) { }

  ngOnInit(): void {
    this.productServices.getProducts().subscribe(products => {
      this.products = products.data;
    });
    this.cartToken.getCartItem().forEach((item: { productId: string; }) => {
      const found = this.products.find(product => product._id === item.productId);
      console.log(found);
    });
    this.cartToken.getCartItem().forEach((item: { productId: string; }) => {
      this.productServices.getProduct(item.productId).subscribe(product => {
        console.log(product);
        this.cartProducts.push(product.data);
      });
    });
  }
}
