import { Component, OnInit } from '@angular/core';
import { Product } from '@ntig9/products';

@Component({
  selector: 'products-featured-item',
  templateUrl: './featured-item.component.html',
  styleUrls: ['./featured-item.component.css']
})
export class FeaturedItemComponent implements OnInit {

  products: Product[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
