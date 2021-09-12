import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { DashboredComponent } from './dashbored/dashbored.component';
import { DashboardcontentComponent } from './shared/dashboardcontent/dashboardcontent.component';
import { CategoriesListComponent } from './categories/categories-list/categories-list.component';
import { HttpClientModule } from '@angular/common/http';
import { CategoriesFormComponent } from './categories/categories-form/categories-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: DashboardcontentComponent,
    children: [
      {
        path: 'dashbored',
        component: DashboredComponent
      },
      {
        path: 'categories',
        component: CategoriesListComponent
      },
      {
        path: 'form',
        component: CategoriesFormComponent
      }
    ]
  }];

@NgModule({
    declarations: [AppComponent, DashboardcontentComponent, SidebarComponent, DashboredComponent, CategoriesListComponent, CategoriesFormComponent],
    imports: [
        BrowserModule,
        RouterModule.forRoot(routes, { initialNavigation: 'enabledBlocking' }),
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
