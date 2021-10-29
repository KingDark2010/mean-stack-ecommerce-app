import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartServiceService } from '@ntig9/orders';
import { OrderProduct, ProductsService } from '@ntig9/products';
import { FormGroup, FormBuilder } from '@angular/forms'
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';


@Component({
  selector: 'ecommerce-store-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit, OnDestroy {

  private ngUnsubscribe = new Subject();
  orderForm!: FormGroup;
  cartProducts: OrderProduct[] = [];
  singleproduct:OrderProduct = {} as OrderProduct;

  productImage(image:string) {
    const newData = image.split('\\')
    return newData[newData.length -1]
  }
  constructor(private productServices: ProductsService, private cartToken: CartServiceService, private location: Location, private router:Router, private fb:FormBuilder) { }

  ngOnInit(): void {
    this.orderForm = this.fb.group({
      shippingAddress1: [''],
      shippingAddress2: [''],
      shippingCity: [''],
      shippingZip: [''],
      shippingCountry: [''],
      shippingPhone: [''],
      user: [''],
      orderItems: [''],
    });
    this.cartToken.cart$.pipe(takeUntil(this.ngUnsubscribe)).subscribe(cart => {
      cart.forEach(item => {
        this.productServices.getOrderProduct(item.productID).pipe(takeUntil(this.ngUnsubscribe)).subscribe(product => {
          this.singleproduct = product.data
          this.singleproduct.quantity = item.quantity
          this.cartProducts.push(this.singleproduct);
        });
      })
    });
  }
  //get subtotal price from cartProducts
  get getSubTotal() {
    let total = 0;
    this.cartProducts.forEach(item => {
      total += item.quantity * item.price;
    });
    const tax = total * 0.08;
    return {total, tax};
  }

  //remove item from cart and update cart
  removeItem(productID:string) {
    this.cartToken.deleteItem(productID);
    this.cartProducts = this.cartProducts.filter(item => item._id !== productID);
  }
  goBack() {
    this.location.back();
  }
  checkout() {
    this.router.navigate(['/checkout']);
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
