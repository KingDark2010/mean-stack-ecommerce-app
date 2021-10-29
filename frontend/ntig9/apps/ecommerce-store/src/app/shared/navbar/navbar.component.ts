import { Component, OnInit } from '@angular/core';
import { TokenstorageService } from '@ntig9/users';


@Component({
  selector: 'ecommerce-store-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLoggedIn = false;
  isAdmin = true;
  constructor(private localToken: TokenstorageService) {
  }
  ngOnInit() {
    //check if there is a token in local storage
    if (this.localToken.getToken()) {
      const AuthToken = localStorage.getItem('AuthToken');
      if (AuthToken) {
        const user = JSON.parse(atob(AuthToken.split('.')[1]));
        if (user.dod === 1) {
          this.isAdmin = true;
          this.isLoggedIn = true;
        }
      }
    }
  }

}
