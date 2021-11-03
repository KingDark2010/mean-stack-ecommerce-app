import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '@ntig9/products';
import { TokenstorageService } from '@ntig9/users';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';


@Component({
  selector: 'ecommerce-store-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  isLoggedIn = false;
  isAdmin = true;
  private ngUnsubscribe = new Subject();
  token = localStorage.getItem('AuthToken');
  constructor(private localToken: TokenstorageService, private usersServices: UsersService, private router: Router) { }

  ngOnInit() {
    //check if there is a token in local storage
    if (this.localToken.getToken()) {
      const AuthToken = localStorage.getItem('AuthToken');
      if (AuthToken) {
        const user = JSON.parse(atob(AuthToken.split('.')[1]));
        if (user.dod === 1) {
          this.isAdmin = true;
          this.isLoggedIn = true;
        } else if (user.dod === 2) {
          this.isAdmin = false;
          this.isLoggedIn = true;
        }
      }
    }
  }

  logoutUser() {
    this.usersServices.logout(this.token).pipe(takeUntil(this.ngUnsubscribe)).subscribe(
      () => {
        localStorage.removeItem('AuthToken');
        this.router.navigate(['/login']).then(() => {
          window.location.reload();
        });
      });
  }
  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
