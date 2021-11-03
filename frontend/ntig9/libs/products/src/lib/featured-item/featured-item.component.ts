import { Component } from '@angular/core';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { Product } from '@ntig9/products';

@Component({
    selector: 'products-featured-item',
    templateUrl: './featured-item.component.html',
    styleUrls: ['./featured-item.component.css'],
})
export class FeaturedItemComponent {
    products: Product[] = [];
}
