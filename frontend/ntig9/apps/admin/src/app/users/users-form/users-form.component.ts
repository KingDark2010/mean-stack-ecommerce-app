import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {  UsersService } from '@ntig9/products';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';


@Component({
  selector: 'admin-users-form',
  templateUrl: './users-form.component.html',
  styleUrls: ['./users-form.component.css']
})
export class UsersFormComponent implements OnInit, OnDestroy {

  private ngUnsubscribe = new Subject();
  editMode = false;



  get title() {
    return this.editMode ? 'Edit User' : 'Add User';
  }

  get btn() {
    return this.editMode ? 'Update' : 'Add';
  }

  color!: string;

  categoryForm!: FormGroup;

  isSubmitted = false;
  updatePickedColor(value: string) {
    this.categoryForm.get('color')?.patchValue(value);
  }
  constructor(private _fb: FormBuilder, private _usersService: UsersService, private toastr: ToastrService, private location: Location, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.categoryForm = this._fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: [''],
      phone: [''],
      isActive: [false, Validators.required],
      isSeller: [false, Validators.required],
      isAdmin: [false, Validators.required],
    });
    this._checkEditMode();
  }

  editCancel() {
    if(this.editMode) {
      this.toastr.warning('Editing User Canceled', 'Warning');
      this.location.back();
    }
    else {
      this.toastr.warning('Adding User Canceled', 'Warning');
      this.location.back();
    }
  }
  get controls() {
    return this.categoryForm.controls;
  }
  onSubmit() {
    this.isSubmitted = true;
    console.log(this.categoryForm.value);
    if (this.categoryForm.valid) {
      if (this.editMode) {
        this.route.params.pipe(takeUntil(this.ngUnsubscribe)).subscribe(params => {
          this._usersService.updateUser(params.id, this.categoryForm.value).pipe(takeUntil(this.ngUnsubscribe)).subscribe(() => {
            this.toastr.success('User updated successfully');
            this.location.back();
          });
        });
      } else {
        this._usersService.createUser(this.categoryForm.value)
          .pipe(takeUntil(this.ngUnsubscribe)).subscribe(
            ()=> {
              this.toastr.success('Success', 'User Added', {
                timeOut: 3000,
              });
              this.location.back();
            },
            error => {
              if(error.error.message.includes('duplicate key erro')) {
                this.toastr.error(`Error User already exists`, 'User Error', {
                  timeOut: 3000,
                });
              }
              else {
                this.toastr.error('Error', 'User Error', {
                  timeOut: 3000,
                });
              }
            }
          );
      }
    }
  }

  private _checkEditMode() {
    this.route.params.pipe(takeUntil(this.ngUnsubscribe)).subscribe(params => {

      if (params.id) {
        this.editMode = true;
        this._usersService.getUser(params.id).pipe(takeUntil(this.ngUnsubscribe)).subscribe(user => {
          this.categoryForm.setValue({
            firstName: user.data.firstName,
            lastName: user.data.lastName,
            email: user.data.email,
            password: null,
            phone: user.data.phone || "",
            isActive: user.data.isActive,
            isSeller: user.data.isSeller,
            isAdmin: user.data.isAdmin,
          });
        });
      }
    });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
