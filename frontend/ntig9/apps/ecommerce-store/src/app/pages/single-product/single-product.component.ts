import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product, ProductsService } from '@ntig9/products';
import { cartItem, CartServiceService} from '@ntig9/orders';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'ecommerce-store-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.css']
})
export class SingleProductComponent implements OnInit, AfterViewInit, OnDestroy {

  loading = true
  private ngUnsubscribe = new Subject();
  checked = false;
  productQuantity = 1;
  product: Product = {} as Product;
  constructor(private productServices: ProductsService, private router:ActivatedRoute, private cartToken: CartServiceService, private switchRouter: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.loading = true;
    this.router.params.pipe(takeUntil(this.ngUnsubscribe)).subscribe(params => {
        this.productServices.getProduct(params.id).pipe(takeUntil(this.ngUnsubscribe)).subscribe(product => {
          this.product = product.data;
        })
    });
  }

  addToCart(product: Product) {
    this.checked = true;
    if(this.checked && (this.productQuantity > product.countInStock || this.productQuantity <= 0 )) {
      return;
    }
    const data: cartItem = {
      productID: product._id,
      quantity: this.productQuantity
    }
    this.cartToken.setCart(data);
    this.toastr.success('Product added to cart', 'Success');
  }

  buyNow(product: Product) {
    this.checked = true;
    if(this.checked && (this.productQuantity > product.countInStock || this.productQuantity <= 0 )) {
      return;
    }
    const data: cartItem = {
      productID: product._id,
      quantity: this.productQuantity
    }
    this.cartToken.setCart(data);
    this.switchRouter.navigateByUrl('/cart');
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
