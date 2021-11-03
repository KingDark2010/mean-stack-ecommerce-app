import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '@ntig9/products';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'admin-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnDestroy {

  private ngUnsubscribe = new Subject();
  token = localStorage.getItem('AuthToken');
  constructor(private usersServices: UsersService, private router: Router) { }

  logoutUser() {
    this.usersServices.logout(this.token).pipe(takeUntil(this.ngUnsubscribe)).subscribe(
      () => {
        localStorage.removeItem('AuthToken');
        this.router.navigate(['/login']);
      }
    );
  }


  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
