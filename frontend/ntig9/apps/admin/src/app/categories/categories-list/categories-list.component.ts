import { Component, OnInit } from '@angular/core';
import { Categories, CategoriesService } from '@ntig9/products';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'admin-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.css']
})
export class CategoriesListComponent implements OnInit {

  categories:Categories[] = [];

  constructor(private categoriesService: CategoriesService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.categoriesService.getCategories().subscribe(categories => this.categories = categories.data);
  }

  deleteCategory(categoryID:string | undefined):void {
    this.categoriesService.deleteCategory(categoryID).subscribe(() => {
      this.categories = this.categories.filter(c => c._id !== categoryID);
      this.toastr.success('Success', 'Category Deleted', {
        timeOut: 3000,
      });
    },
    () => this.toastr.error('Error', "couldn't delete"));
  }
  cancelbtn():void {
    this.toastr.info('Item Deletion was Canceled', 'Cancel', {
      timeOut: 3000,
    });
  }
}
