import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'ecommerce-store-thank-you',
    templateUrl: './thank-you.component.html',
    styleUrls: ['./thank-you.component.css'],
})
export class ThankYouComponent implements OnInit {
    constructor(private router: Router) {}

    ngOnInit() {
        //go to home page after 5 seconds
        setTimeout(() => {
            this.router.navigate(['/']).then(() => {
                window.location.reload();
            }
            );
        }, 5000);
    }
}
