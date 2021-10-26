import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '@ntig9/products';



@Component({
  selector: 'ui-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {

  @Input() products: Product[] = [];
  productPage = false

  productImage(image:string) {
    console.log(typeof image);
    const newData = image.split('\\')
    return newData[newData.length -1]
  }

  constructor(private router:Router) { }

  ngOnInit(): void {
    if(this.router.url === '/products') {
      this.productPage = true
    }
  }

}
