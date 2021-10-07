import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CategoriesService } from '@ntig9/products';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'admin-categories-form',
  templateUrl: './categories-form.component.html',
  styleUrls: ['./categories-form.component.css']
})
export class CategoriesFormComponent implements OnInit {


  editMode = false;



  get title() {
    return this.editMode ? 'Edit Category' : 'Add Category';
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
  constructor(private _fb: FormBuilder, private _categoriesService: CategoriesService, private toastr: ToastrService, private location: Location, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.categoryForm = this._fb.group({
      name: ['', [Validators.required, Validators.minLength(6)]],
      icon: ['', [Validators.required]],
      color: ['', [Validators.required]]
    });
    this._checkEditMode();
  }

  editCancel() {
    if(this.editMode) {
      this.toastr.warning('Editing Category Canceled', 'Warning');
      this.location.back();
    }
    else {
      this.toastr.warning('Adding Category Canceled', 'Warning');
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
        this.route.params.subscribe(params => {
          this._categoriesService.updateCategory(params.id, this.categoryForm.value).subscribe(() => {
            this.toastr.success('Category updated successfully');
            this.location.back();
          });
        });
      } else {
        this._categoriesService.createCategory(this.categoryForm.value)
          .subscribe(
            ()=> {
              this.toastr.success('Success', 'Category Added', {
                timeOut: 3000,
              });
              this.location.back();
            },
            error => {
              if(error.error.message.includes('duplicate key erro')) {
                this.toastr.error(`Error Category already exists`, 'Category Error', {
                  timeOut: 3000,
                });
              }
              else {
                this.toastr.error('Error', 'Category Error', {
                  timeOut: 3000,
                });
              }
            }
          );
      }
    }
  }

  private _checkEditMode() {
    this.route.params.subscribe(params => {

      if (params.id) {
        this.editMode = true;
        this._categoriesService.getCategory(params.id).subscribe(category => {
          this.categoryForm.setValue({
            name: category.data.name,
            icon: category.data.icon,
            color: category.data.color
          });
          this.color = this.categoryForm.value.color;
        });
      }
    });
  }


}
