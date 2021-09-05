import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import {UiModule} from '@ntig9/ui';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { ProductsComponent } from './pages/products/products.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'products', component: ProductsComponent }
  ]
@NgModule({
  declarations: [AppComponent, HomeComponent, ProductsComponent, NavbarComponent, FooterComponent],
  imports: [BrowserModule, RouterModule.forRoot(routes), UiModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
