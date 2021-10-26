import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BannerComponent } from './banner/banner.component';
import { SliderComponent } from './slider/slider.component';
import { CategoriesBannerComponent } from './categories-banner/categories-banner.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FeaturedProductsComponent } from './featured-products/featured-products.component';
import { ProductItemComponent } from './product-item/product-item.component';

@NgModule({
    imports: [CommonModule, RouterModule, HttpClientModule],
    declarations: [
      BannerComponent,
      SliderComponent,
      CategoriesBannerComponent,
      FeaturedProductsComponent,
      ProductItemComponent,
    ],
    exports: [
      BannerComponent,
      SliderComponent,
      CategoriesBannerComponent,
      FeaturedProductsComponent,
      ProductItemComponent,
    ],
})
export class UiModule {}
