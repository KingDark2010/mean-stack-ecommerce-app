import { Component, OnDestroy, OnInit } from '@angular/core';
import { UsersService } from '@ntig9/products';
import { User } from '@ntig9/main-lib';

import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'admin-users-list',
    templateUrl: './users-list.component.html',
    styleUrls: ['./users-list.component.css'],
})
export class UsersListComponent implements OnInit, OnDestroy {
    private ngUnsubscribe = new Subject();

    Users: User[] = [];

    constructor(
        private userService: UsersService,
        private toastr: ToastrService
    ) {}

    ngOnInit(): void {
        this._getUsers();
    }

    private _getUsers() {
        this.userService
            .getUsers()
            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe((Users) => {
                this.Users = Users.data;
            });
    }
    userDelete(userID: string | undefined): void {
        this.userService
            .deleteUser(userID)
            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe(
                () => {
                    this.Users = this.Users.filter(
                        (user) => user._id !== userID
                    );
                    this.toastr.success('Success', 'User Deleted', {
                        timeOut: 3000,
                    });
                },
                () => this.toastr.error('Error', "couldn't delete")
            );
    }
    cancelbtn(): void {
        this.toastr.info('Item Deletion was Canceled', 'Cancel', {
            timeOut: 3000,
        });
    }

    ngOnDestroy(): void {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }
}
