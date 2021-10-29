/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CategoriesService, Category, ProductsService, User, UsersService } from '@ntig9/products';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';


@Component({
  selector: 'admin-products-form',
  templateUrl: './products-form.component.html',
  styleUrls: ['./products-form.component.css']
})
export class ProductsFormComponent implements OnInit, OnDestroy {

  private ngUnsubscribe = new Subject();

  categories:Category[] = [];
  editMode = false;
  users: User[] = [];

  get title() {
    return this.editMode ? 'Edit Product' : 'Add Product';
  }

  get btn() {
    return this.editMode ? 'Update' : 'Add';
  }

  color!: string;

  productForm!: FormGroup;

  isSubmitted = false;
  updatePickedColor(value: string) {
    this.productForm.get('color')?.patchValue(value);
  }
  constructor(private _fb: FormBuilder, private _categoriesService: CategoriesService, private toastr: ToastrService, private location: Location, private route:ActivatedRoute, private _productsServices: ProductsService, private _usersServices: UsersService) { }

  ngOnInit(): void {
    this._categoriesService.getCategories().pipe(takeUntil(this.ngUnsubscribe)).subscribe(categories => this.categories = categories.data);
    this._usersServices.getUsers().pipe(takeUntil(this.ngUnsubscribe)).subscribe(users => {
      users.data.forEach(user => {
        if(user.isSeller) {
          this.users.push(user);
        }
      });
    });
    this.productForm = this._fb.group({
      name: ['', [Validators.required, Validators.minLength(6)]],
      brand: ['', [Validators.required]],
      price: ['', [Validators.required]],
      countInStock: ['', [Validators.required, Validators.max(100)]],
      category: ['', [Validators.required]],
      descriptionLite: ['', [Validators.required, Validators.minLength(50)]],
      description: ['', [Validators.required, Validators.minLength(200)]],
      image: ['', [Validators.required]],
      seller: ['', [Validators.required]],
      isFeatured: [false, [Validators.required]]
    });
    this._checkEditMode();
  }

  editCancel() {
    if(this.editMode) {
      this.toastr.warning('Editing Product Canceled', 'Warning');
      this.location.back();
    }
    else {
      this.toastr.warning('Adding Product Canceled', 'Warning');
      this.location.back();
    }
  }
  get controls() {
    return this.productForm.controls;
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onImageUpload(event: any) {
    const file = event.target.files[0];
    console.log(file);
    if(file) {
      this.productForm.patchValue({image: file});
      this.productForm.get('image')?.updateValueAndValidity();
    }
  }
  onSubmit() {
    this.isSubmitted = true;
    console.log(this.productForm.value);

    if (this.productForm.valid) {
      if (this.editMode) {
        this.route.params.pipe(takeUntil(this.ngUnsubscribe)).subscribe(params => {
          const productFormData = new FormData();
          for(const key in this.productForm.value) {
            productFormData.append(key, this.productForm.value[key]);
          }
          this._productsServices.updateProduct(params.id, productFormData).pipe(takeUntil(this.ngUnsubscribe)).subscribe(() => {
            this.toastr.success('Product updated successfully');
            this.location.back();
          });
        });
      } else {
        const productFormData = new FormData();
        for(const key in this.productForm.value) {
          productFormData.append(key, this.productForm.value[key]);
        }
        this._productsServices.createProduct(productFormData)
          .pipe(takeUntil(this.ngUnsubscribe)).subscribe(
            ()=> {
              this.toastr.success('Success', 'Product Added', {
                timeOut: 3000,
              });
              this.location.back();
            },
            error => {
              if(error.error.message.includes('duplicate key erro')) {
                this.toastr.error(`Error Product already exists`, 'Product Error', {
                  timeOut: 3000,
                });
              }
              else {
                this.toastr.error('Error', 'Product Error', {
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
        this._productsServices.getProduct(params.id).pipe(takeUntil(this.ngUnsubscribe)).subscribe(product => {
          this.productForm.setValue({
            name: product.data.name,
            brand: product.data.brand,
            price: product.data.price,
            countInStock: product.data.countInStock,
            category: product.data.category.name,
            descriptionLite: product.data.descriptionLite,
            description: product.data.description,
            image: product.data.image,
            seller: product.data.seller.firstName,
            isFeatured: product.data.isFeatured
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
