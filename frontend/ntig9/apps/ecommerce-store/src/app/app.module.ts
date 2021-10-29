import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import {UiModule} from '@ntig9/ui';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { ProductsComponent } from './pages/products/products.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SingleProductComponent } from './pages/single-product/single-product.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CartComponent } from './pages/cart/cart.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { AdminAppModule } from '../../../admin/src/app/app.module'

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'products', component: ProductsComponent },
  { path: "categoryproducts/:categoryname", component: ProductsComponent },
  { path: 'product/:id', component: SingleProductComponent },
  { path: 'cart', component: CartComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'admin', loadChildren: () => AdminAppModule }
  ]
@NgModule({
  declarations: [AppComponent, HomeComponent, ProductsComponent, NavbarComponent, FooterComponent, SingleProductComponent, CartComponent, CheckoutComponent],
  imports: [BrowserModule,BrowserAnimationsModule, RouterModule.forRoot(routes), UiModule, HttpClientModule,FormsModule, ReactiveFormsModule, ToastrModule.forRoot(), AdminAppModule.forRoot()],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
