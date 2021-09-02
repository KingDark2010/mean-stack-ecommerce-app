import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RegisterService } from 'src/app/services/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  myRegister = new FormGroup({
    //first name should be required and should be string and should be min 6 and can't be empty
    firstName: new FormControl('',[Validators.required,Validators.minLength(6),Validators.maxLength(32)]),
    lastName: new FormControl('',[Validators.required,Validators.minLength(6),Validators.maxLength(32)]),
    //email should be required and should be string and should be min 8 and can't be empty
    password: new FormControl('',[Validators.required,Validators.minLength(8)]),
    // should be the same as password and should be min 8 and can't be empty
    confirmPassword: new FormControl('', [Validators.required,Validators.minLength(8)]),
    email: new FormControl('',[Validators.required,Validators.email]),
    gender: new FormControl('', Validators.required),
    isSeller: new FormControl('', Validators.required),
    terms: new FormControl('', Validators.required)
  });

  // make controls in the myRegister form group
  get controls(){
    return this.myRegister.controls;
  }


  constructor(private _data:RegisterService) { }

  ngOnInit(): void {


  }
  onRegister(){
    console.log(this.myRegister.value)
    this._data.register(this.myRegister.value).subscribe(
      (data)=>{
        console.log(data)
      }
    )
  }
}
