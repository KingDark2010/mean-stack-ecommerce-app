import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoriesService, ProductsService } from '@ntig9/products';
import { Category, Product } from '@ntig9/main-lib';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'ecommerce-store-products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit, AfterViewInit, OnDestroy {
    loading = true;
    private ngUnsubscribe = new Subject();
    products: Product[] = [];
    editedProduct: Product[] = [];
    categories: Category[] = [];
    //filter array of categories
    filteredCategories: string[] = [];
    filtrerStatus = false;

    constructor(
        private productsServices: ProductsService,
        private categoriesServices: CategoriesService,
        private router: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.loading = true;
        this.router.params
            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe((params) => {
                if (params.categoryname) {
                    this.filtrerStatus = true;
                    this.productsServices
                        .getProducts()
                        .pipe(takeUntil(this.ngUnsubscribe))
                        .subscribe((products) => {
                            products.data.forEach((product) => {
                                if (
                                    product.category.name ===
                                    params.categoryname
                                ) {
                                    this.products.push(product);
                                }
                            });
                        });
                } else {
                    this.filtrerStatus = false;
                    this.productsServices
                        .getProducts()
                        .pipe(takeUntil(this.ngUnsubscribe))
                        .subscribe((products) => {
                            this.products = products.data;
                            this.editedProduct = products.data;
                        });
                    this.categoriesServices
                        .getCategories()
                        .pipe(takeUntil(this.ngUnsubscribe))
                        .subscribe((categories) => {
                            this.categories = categories.data;
                        });
                }
            });
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    categoryFilter($event: any, value: string) {
        if ($event.target.checked) {
            this.filteredCategories.push(value);
            this.products = [];
            this.editedProduct.forEach((product) => {
                if (this.filteredCategories.includes(product.category.name)) {
                    this.products.push(product);
                }
            });
        } else if (!$event.target.checked) {
            this.filteredCategories = this.filteredCategories.filter(
                (category) => category !== value
            );
            this.products = [];
            if (this.filteredCategories.length > 0) {
                this.editedProduct.forEach((product) => {
                    if (
                        this.filteredCategories.includes(product.category.name)
                    ) {
                        this.products.push(product);
                    }
                });
            } else {
                this.products = this.editedProduct;
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
