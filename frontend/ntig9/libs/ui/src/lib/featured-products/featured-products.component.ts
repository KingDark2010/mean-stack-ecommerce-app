import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from '@ntig9/products';
import { Product } from '@ntig9/main-lib';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'ui-featured-products',
    templateUrl: './featured-products.component.html',
    styleUrls: ['./featured-products.component.css'],
})
export class FeaturedProductsComponent implements OnInit, OnDestroy {
    private ngUnsubscribe = new Subject();
    products: Product[] = [];


    constructor(private productsServices: ProductsService) {}

    ngOnInit(): void {
        this.productsServices
            .getFeaturedProducts()
            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe((products) => (this.products = products.data));
    }

    ngOnDestroy(): void {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }
}
