import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoriesService, Category, Product, ProductsService } from '@ntig9/products';

@Component({
  selector: 'ecommerce-store-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {

  products: Product [] = [];
  editedProduct: Product[] = [];
  categories: Category [] = [];
  //filter array of categories
  filteredCategories: string [] = [];
  filtrerStatus = false;

  constructor(private productsServices: ProductsService, private categoriesServices: CategoriesService, private router:ActivatedRoute ) { }

  ngOnInit(): void {
    this.router.params.subscribe(params => {
      if(params.categoryname) {
        this.filtrerStatus = true;
        this.productsServices.getProducts().subscribe(products => {
          products.data.forEach(product => {
            if (product.category.name === params.categoryname) {
              this.products.push(product);
            }
          })
        })
      }else {
        this.filtrerStatus = false;
        this.productsServices.getProducts().subscribe(products => {
          this.products = products.data;
          this.editedProduct = products.data;
        });
        this.categoriesServices.getCategories().subscribe(categories => {
          this.categories = categories.data;
        });
      }
    });
  }


  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  categoryFilter($event: any, value: string) {
    if ($event.target.checked) {
      this.filteredCategories.push(value);
      console.log(this.filteredCategories);
      this.products = []
      this.editedProduct.forEach(product => {
        if (this.filteredCategories.includes(product.category.name)) {
          this.products.push(product);
        }
      });
    } else if(!$event.target.checked) {
      this.filteredCategories = this.filteredCategories.filter(category => category !== value);
      this.products = []
      if(this.filteredCategories.length > 0) {
        this.editedProduct.forEach(product => {
          if (this.filteredCategories.includes(product.category.name)) {
            this.products.push(product);
          }
        });
      }else {
        this.products = this.editedProduct;
      }
    }
  }
}
