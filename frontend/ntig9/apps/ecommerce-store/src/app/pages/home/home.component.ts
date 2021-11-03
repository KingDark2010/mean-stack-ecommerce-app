import { AfterViewInit, Component } from '@angular/core';

@Component({
    selector: 'ecommerce-store-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
})
export class HomeComponent implements AfterViewInit {
    loading = true;
    constructor() {
        this.loading = true;
    }

    ngAfterViewInit() {
        setTimeout(() => {
            this.loading = false;
        }, 200);
    }
}
