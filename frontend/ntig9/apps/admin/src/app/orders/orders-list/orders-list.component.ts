import { Component, OnDestroy, OnInit } from '@angular/core';
import { OrdersService } from '@ntig9/orders';
import { Order } from '@ntig9/main-lib';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'admin-orders-list',
    templateUrl: './orders-list.component.html',
    styleUrls: ['./orders-list.component.css'],
})
export class OrdersListComponent implements OnInit, OnDestroy {
    private ngUnsubscribe = new Subject();

    Orders: Order[] = [];

    constructor(
        private _orderServices: OrdersService,
        private toastr: ToastrService
    ) {}

    ngOnInit(): void {
        this._getOrders();
    }

    private _getOrders() {
        this._orderServices
            .getOrders()
            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe((Orders) => {
                this.Orders = Orders.data;
            });
    }
    deleteOrder(orderID: string | undefined): void {
        this._orderServices
            .deleteOrder(orderID)
            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe(
                () => {
                    this.Orders = this.Orders.filter(
                        (order) => order._id !== orderID
                    );
                    this.toastr.success('Success', 'Order Deleted', {
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
