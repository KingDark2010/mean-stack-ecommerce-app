import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'admin-categories-form',
  templateUrl: './categories-form.component.html',
  styleUrls: ['./categories-form.component.css']
})
export class CategoriesFormComponent implements OnInit {

  categoryForm!: FormGroup;

  constructor(private _fb: FormBuilder) { }

  ngOnInit(): void {
    this.categoryForm = this._fb.group({
      name: ['', Validators.required, Validators.minLength(3)],
      icon: ['', Validators.required]
    });

  }

  get controls() {
    return this.categoryForm.controls;
  }
  onSubmit() {
    console.log(this.controls.name.value);
  }

}
