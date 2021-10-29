import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { UsersService} from  '@ntig9/products';
import { Subject } from 'rxjs';
import { TokenstorageService } from '../services/tokenstorage.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'users-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  private ngUnsubscribe = new Subject();
  loginForm!: FormGroup;
  isSubmited = false;
  invalidData = false;

  get controls() {
    return this.loginForm.controls;
  }
  constructor( private fb: FormBuilder, private _usersService: UsersService, private localToken: TokenstorageService, private router: Router) { }

  ngOnInit(): void {
    //check and if logged in redirect to home
    if (this.localToken.getToken()) {
      this.router.navigate(['/']);
    }
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onlogin() {
    this.isSubmited = true;
    if (this.loginForm.invalid) {
      return;
    }
    this._usersService.login(this.loginForm.value).pipe(takeUntil(this.ngUnsubscribe)).subscribe( data => {
      this.localToken.setToken(data.data.token);
      this.router.navigate(['/']).then(() => {
        window.location.reload();
      });
    },
    () => {
      this.invalidData = true;
    });

  }


  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
