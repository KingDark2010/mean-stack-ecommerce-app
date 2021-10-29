import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product, ProductsService } from '@ntig9/products';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'admin-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit, OnDestroy {

  private ngUnsubscribe = new Subject();
  Products: Product[] = [];

  deleteProduct(id:string) {
    console.log(id);
  }
  productImage(image:string) {
    console.log(typeof image);
    const newData = image.split('\\')
    return newData[newData.length -1]
  }

  constructor( private productService: ProductsService,  private toastr: ToastrService) { }

  ngOnInit(): void {
    this._getProducts();
  }

  private _getProducts() {
    this.productService.getProducts().pipe(takeUntil(this.ngUnsubscribe)).subscribe(products => {
      this.Products = products.data;
    });
  }
  productDelete(productID:string | undefined):void {
    this.productService.deleteProduct(productID).pipe(takeUntil(this.ngUnsubscribe)).subscribe(() => {
      this.Products = this.Products.filter(product => product._id !== productID);
      this.toastr.success('Success', 'Product Deleted', {
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

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
