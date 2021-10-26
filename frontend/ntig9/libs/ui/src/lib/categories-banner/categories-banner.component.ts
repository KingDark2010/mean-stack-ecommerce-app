import { Component, OnDestroy, OnInit } from '@angular/core';
import { Category, CategoriesService } from '@ntig9/products';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'ui-categories-banner',
  templateUrl: './categories-banner.component.html',
  styleUrls: ['./categories-banner.component.css']
})
export class CategoriesBannerComponent implements OnInit, OnDestroy{

  private ngUnsubscribe = new Subject();
  categories:Category[] = [];

  constructor(private categoriesService: CategoriesService) { }

  ngOnInit(): void {
    this.categoriesService.getCategories().pipe(takeUntil(this.ngUnsubscribe)).subscribe(categories => this.categories = categories.data);
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
