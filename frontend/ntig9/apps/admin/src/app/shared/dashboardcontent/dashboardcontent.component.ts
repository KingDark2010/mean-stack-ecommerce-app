import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'admin-dashboardcontent',
  templateUrl: './dashboardcontent.component.html',
  styleUrls: ['./dashboardcontent.component.css']
})
export class DashboardcontentComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    if(this.router.url == '/'){
      this.router.navigate(['/dashbored']);
    }
  }

}
