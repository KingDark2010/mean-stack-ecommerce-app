import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product, ProductsService } from '@ntig9/products';
import { cartItem, CartServiceService} from '@ntig9/orders';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'ecommerce-store-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.css']
})
export class SingleProductComponent implements OnInit {

  checked = false;
  productQuantity = 1;
  product: Product = {} as Product;
  productImage(image:string) {
    console.log(typeof image);
    const newData = image.split('\\')
    return newData[newData.length -1]
  }
  constructor(private productServices: ProductsService, private router:ActivatedRoute, private cartToken: CartServiceService, private switchRouter: Router, private toastr: ToastrService) { }
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
    window.location.reload();
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
    this.switchRouter.navigate(['/cart']);
  }

  ngOnInit(): void {
    this.router.params.subscribe(params => {
        this.productServices.getProduct(params.id).subscribe(product => {
          this.product = product.data;
        })
    });
  }
}
