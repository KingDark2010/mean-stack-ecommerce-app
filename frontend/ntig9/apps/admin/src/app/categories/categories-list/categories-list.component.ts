import { Component, OnInit } from '@angular/core';
import { Categories, CategoriesService } from '@ntig9/products';

@Component({
  selector: 'admin-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.css']
})
export class CategoriesListComponent implements OnInit {

  categories:Categories[] = [];

  constructor(private categoriesService: CategoriesService) { }

  ngOnInit(): void {
    this.categoriesService.getCategories().subscribe(categories => this.categories = categories.data);
  }
}
