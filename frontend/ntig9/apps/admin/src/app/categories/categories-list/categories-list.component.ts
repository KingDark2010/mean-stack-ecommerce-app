import { Component, OnDestroy, OnInit } from '@angular/core';
import { CategoriesService } from '@ntig9/products';
import { Category } from '@ntig9/main-lib';

import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'admin-categories-list',
    templateUrl: './categories-list.component.html',
    styleUrls: ['./categories-list.component.css'],
})
export class CategoriesListComponent implements OnInit, OnDestroy {
    private ngUnsubscribe = new Subject();
    categories: Category[] = [];

    constructor(
        private categoriesService: CategoriesService,
        private toastr: ToastrService
    ) {}

    ngOnInit(): void {
        this.categoriesService
            .getCategories()
            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe((categories) => (this.categories = categories.data));
    }

    deleteCategory(categoryID: string | undefined): void {
        this.categoriesService
            .deleteCategory(categoryID)
            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe(
                () => {
                    this.categories = this.categories.filter(
                        (category) => category._id !== categoryID
                    );
                    this.toastr.success('Success', 'Category Deleted', {
                        timeOut: 3000,
                    });
                },
                () => this.toastr.error('Error', "couldn't delete")
            );
    }
    cancelbtn(): void {
        this.toastr.info('Item Deletion was Canceled', 'Cancel', {
            timeOut: 3000,
        });
    }

    ngOnDestroy(): void {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }
}
