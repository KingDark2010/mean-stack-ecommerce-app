import { Component, OnDestroy, OnInit } from '@angular/core';
import { TokenstorageService } from '../services/tokenstorage.service';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { UsersService } from '@ntig9/products';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'users-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit, OnDestroy {
    isSubmitted = false;
    private ngUnsubscribe = new Subject();
    registerForm!: FormGroup;

    get registerControls() {
        return this.registerForm.controls;
    }
    constructor(
        private localToken: TokenstorageService,
        private router: Router,
        private fb: FormBuilder,
        private usersServices: UsersService
    ) {}

    ngOnInit(): void {
        if (this.localToken.getToken()) {
            this.router.navigate(['/']);
        }
        this.registerForm = this.fb.group(
            {
                firstName: ['', Validators.required],
                lastName: ['', Validators.required],
                email: ['', [Validators.required, Validators.email]],
                password: ['', [Validators.required, Validators.minLength(6)]],
                confirmPassword: ['', Validators.required],
            },
            {
                validator: this.MustMatch('password', 'confirmPassword'),
            }
        );
    }

    MustMatch(controlName: string, matchingControlName: string) {
        return (formGroup: FormGroup) => {
            const control = formGroup.controls[controlName];
            const matchingControl = formGroup.controls[matchingControlName];

            if (matchingControl.errors && !matchingControl.errors.mustMatch) {
                return;
            }

            if (control.value !== matchingControl.value) {
                matchingControl.setErrors({ mustMatch: true });
            } else {
                matchingControl.setErrors(null);
            }
        };
    }
    onregister() {
        this.isSubmitted = true;
        if (this.registerForm.invalid) {
            return;
        }
        this.usersServices
            .createUser(this.registerForm.value)
            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe(
                () => {
                    this.router.navigate(['/login']);
                },
                (error) => {
                    console.log(error);
                }
            );
    }

    ngOnDestroy(): void {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }
}
