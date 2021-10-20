/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
//import jsonwebtoken from 'jsonwebtoken


@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const AuthToken = localStorage.getItem('AuthToken');
    if (AuthToken) {
      const user = JSON.parse(atob(AuthToken.split('.')[1]));
      if (user.dod === 1) {
        return true;
    }
  }
  this.router.navigate(['/login']);
    return false
  }
}
