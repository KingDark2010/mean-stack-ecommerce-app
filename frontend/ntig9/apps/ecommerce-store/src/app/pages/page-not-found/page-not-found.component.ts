import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ecommerce-store-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
    //redirect to home page after 5 seconds
    setTimeout(()=>{
      this.router.navigate(['/']);
    },5000);
  }

}
