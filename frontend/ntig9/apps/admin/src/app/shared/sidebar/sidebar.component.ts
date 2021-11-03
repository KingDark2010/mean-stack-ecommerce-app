import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { UserLoginService } from '@ntig9/users';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'admin-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnDestroy {
    private ngUnsubscribe = new Subject();
    token = localStorage.getItem('AuthToken');
    constructor(
        private userLoginService: UserLoginService,
        private router: Router
    ) {}

    logoutUser() {
        this.userLoginService
            .logout(this.token)
            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe(() => {
                localStorage.removeItem('AuthToken');
                this.router.navigate(['/login']);
            });
    }

    ngOnDestroy(): void {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }
}
