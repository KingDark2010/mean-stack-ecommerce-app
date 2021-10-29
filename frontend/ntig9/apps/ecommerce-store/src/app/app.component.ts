import { Component } from '@angular/core';
import { Router,NavigationEnd } from '@angular/router';

@Component({
  selector: 'ecommerce-store-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'ecommerce-store';
  adminRoute = false
  constructor(router:Router) {
    // use location to determine if we are on the admin route
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (event.url.includes('admin')) {
          this.adminRoute = true;
        } else {
          this.adminRoute = false;
        }
      }
    });
  }
}
