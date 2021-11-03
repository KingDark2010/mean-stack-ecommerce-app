import { Location } from '@angular/common';
import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartServiceService } from '@ntig9/orders';
import { OrderProduct, ProductsService } from '@ntig9/products';
import { TokenstorageService } from '@ntig9/users';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({

  selector: 'ecommerce-store-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, AfterViewInit, OnDestroy {

  loading = true;
  private ngUnsubscribe = new Subject();
  cartProducts: OrderProduct[] = [];
  singleproduct:OrderProduct = {} as OrderProduct;

  productImage(image:string) {
    const newData = image.split('\\')
    return newData[newData.length -1]
  }
  constructor(private productServices: ProductsService, private cartToken: CartServiceService, private location: Location,
    private router:Router, private localToken: TokenstorageService) { }

  ngOnInit(): void {
    this.loading = true;
    this.cartToken.cart$.pipe().pipe(takeUntil(this.ngUnsubscribe)).subscribe(cart => {
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
    const cart = this.cartToken.cart$.getValue();
    if (cart.length > 0) {
      if (this.localToken.getToken()) {
        this.router.navigate(['/checkout']);
      } else {
        this.router.navigate(['/login']);
      }
    } else {
      alert('Cart is empty');
    }
  }

  ngAfterViewInit(): void {
    //timeout to wait for the cart to load
    setTimeout(() => {
      this.loading = false;
    }, 200);
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
