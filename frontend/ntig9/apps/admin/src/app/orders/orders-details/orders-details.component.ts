import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { OrderItems, OrdersService } from '@ntig9/orders';
import {  User } from '@ntig9/products';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'admin-orders-details',
  templateUrl: './orders-details.component.html',
  styleUrls: ['./orders-details.component.css']
})
export class OrdersDetailsComponent implements OnInit {

  orderItems: OrderItems[] = [];
  user: User = {} as User;

  orderForm!: FormGroup;

  isSubmitted = false;

  _id = "";
  dateOfOrder: Date = new Date();
  paymentStatus:string | boolean = "";
  shippingAddress1 = "";
  shippingPhone: string | boolean = "";
  totalPrice = 0;
  constructor(private _fb: FormBuilder, private _orderServices: OrdersService, private toastr: ToastrService, private location: Location, private route:ActivatedRoute) { }


  ngOnInit(): void {
    this.orderForm = this._fb.group({
      shipmentStatus: ['', Validators.required],
    });
    this._checkOrder()
  }

  editCancel() {
      this.toastr.warning('Editing Category Canceled', 'Warning');
      this.location.back();
  }
  get controls() {
    return this.orderForm.controls;
  }
  onSubmit() {
    this.isSubmitted = true;
    console.log(this.orderForm.value);
    if (this.orderForm.valid) {
        this.route.params.subscribe(params => {
          this._orderServices.updateOrder(params.id, this.orderForm.value).subscribe(() => {
            this.toastr.success('Category updated successfully');
            this.location.back();
          });
      });
    }
  }

  private _checkOrder() {
    this.route.params.subscribe(params => {
      if (params.id) {
        this._orderServices.getOrder(params.id).subscribe(order => {
          this.orderForm.setValue({
            shipmentStatus: order.data.shipmentStatus,
          });
          this._id = order.data._id;
          this.dateOfOrder = order.data.dateOfOrder;
          this.paymentStatus = order.data.paymentStatus;
          this.shippingAddress1 = order.data.shippingAddress1;
          this.shippingPhone = order.data.shippingPhone;
          this.totalPrice = order.data.totalPrice;
          this.orderItems = order.data.orderItems;
          this.user = order.data.user;
        });
      }
    });
  }
}

