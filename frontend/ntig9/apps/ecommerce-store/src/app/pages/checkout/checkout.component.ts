import { Location } from '@angular/common';
import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { CartServiceService, OrderItems, OrdersService } from '@ntig9/orders';
import { OrderProduct, ProductsService } from '@ntig9/products';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TokenstorageService } from '@ntig9/users';
import { Router } from '@angular/router';


@Component({
  selector: 'ecommerce-store-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit, AfterViewInit, OnDestroy {

  loading = true;
  private ngUnsubscribe = new Subject();
  orderForm!: FormGroup;
  cartProducts: OrderProduct[] = [];
  singleproduct:OrderProduct = {} as OrderProduct;

  userID = ""
  orderItems: OrderItems[] = [];

  isSubmitted = false;
  productImage(image:string) {
    const newData = image.split('\\')
    return newData[newData.length -1]
  }
  constructor(private productServices: ProductsService, private cartToken: CartServiceService, private location: Location,
    private orderServices:OrdersService, private fb:FormBuilder, private localToken: TokenstorageService, private router: Router) { }

  ngOnInit(): void {
    this.orderForm = this.fb.group({
      orderItems: [''],
      shippingAddress1: ['',[Validators.required, Validators.minLength(5)]],
      shippingAddress2: [''],
      shippingCity: ['',[Validators.required, Validators.minLength(3)]],
      shippingZip: ['',[Validators.required, Validators.minLength(4), Validators.maxLength(6)]],
      shippingCountry: ['', Validators.required],
      shippingPhone: ['',[Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      user: [''],
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
  //get form controls
  get formControls() {
    return this.orderForm.controls;
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
  placeOrder() {
    this.isSubmitted = true;
    // timeout issubmitted to false after 3 seconds
    setTimeout(() => {
      this.isSubmitted = false;
    }, 3000);
    if(this.orderForm.valid) {
      this.getOrderItems();
      this.getUser();
      this.orderForm.patchValue({
        user: this.userID,
        orderItems: this.orderItems
      });
      this.orderServices.createOrder(this.orderForm.value).pipe(takeUntil(this.ngUnsubscribe)).subscribe(()=> {
        //empty cart
        this.cartToken.emptyCart();
        //redirect to thank you page
        this.router.navigate(['/thankyou']);
      });
    }
  }


  getOrderItems() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.cartToken.getCartItem().forEach((item: any) => {
      const orderItem: OrderItems = {
        quantity: item.quantity,
        product: item.productID
      };
      this.orderItems.push(orderItem);
    })
  }

  getUser() {
    if (this.localToken.getToken()) {
      const AuthToken = localStorage.getItem('AuthToken');
      if (AuthToken) {
        const user = JSON.parse(atob(AuthToken.split('.')[1]));
        this.userID = user._id;
      }
    }
  }


  ngAfterViewInit(): void {
    setTimeout(() => {
      this.loading = false;
    }, 200);
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
