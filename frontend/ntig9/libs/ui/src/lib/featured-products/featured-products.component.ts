import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product, ProductsService } from '@ntig9/products';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'ui-featured-products',
  templateUrl: './featured-products.component.html',
  styleUrls: ['./featured-products.component.css']
})
export class FeaturedProductsComponent implements OnInit, OnDestroy {

  private ngUnsubscribe = new Subject();
  products: Product [] = [];
  productImage(image:string) {
    console.log(typeof image);
    const newData = image.split('\\')
    return newData[newData.length -1]
  }

  constructor(private productsServices: ProductsService) { }

  ngOnInit(): void {
    this.productsServices.getFeaturedProducts()
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(products => this.products = products.data);
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
