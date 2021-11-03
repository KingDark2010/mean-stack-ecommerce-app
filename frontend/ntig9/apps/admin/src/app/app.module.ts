import { ModuleWithProviders, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { DashboredComponent } from './dashbored/dashbored.component';
import { DashboardcontentComponent } from './shared/dashboardcontent/dashboardcontent.component';
import { CategoriesListComponent } from './categories/categories-list/categories-list.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CategoriesFormComponent } from './categories/categories-form/categories-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ColorPickerModule } from 'ngx-color-picker';
import { ProductsListComponent } from './products/products-list/products-list.component';
import { ProductsFormComponent } from './products/products-form/products-form.component';
import { UsersFormComponent } from './users/users-form/users-form.component';
import { UsersListComponent } from './users/users-list/users-list.component';
import { OrdersListComponent } from './orders/orders-list/orders-list.component';
import { OrdersDetailsComponent } from './orders/orders-details/orders-details.component';
import { AdminGuard, JwtInterceptor, UsersModule } from '@ntig9/users';

const providers = [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
];

const routes: Routes = [
    {
        path: 'admin',
        component: DashboardcontentComponent,
        canActivate: [AdminGuard],
        children: [
            {
                path: 'dashbored',
                component: DashboredComponent,
            },
            {
                path: 'categories',
                component: CategoriesListComponent,
            },
            {
                path: 'categories/form',
                component: CategoriesFormComponent,
            },
            {
                path: 'categories/form/:id',
                component: CategoriesFormComponent,
            },
            {
                path: 'products',
                component: ProductsListComponent,
            },
            {
                path: 'products/form',
                component: ProductsFormComponent,
            },
            {
                path: 'products/form/:id',
                component: ProductsFormComponent,
            },
            {
                path: 'users',
                component: UsersListComponent,
            },
            {
                path: 'users/form',
                component: UsersFormComponent,
            },
            {
                path: 'users/form/:id',
                component: UsersFormComponent,
            },
            {
                path: 'orders',
                component: OrdersListComponent,
            },
            {
                path: 'orders/details/:id',
                component: OrdersDetailsComponent,
            },
        ],
    },
];

@NgModule({
    declarations: [
        AppComponent,
        DashboardcontentComponent,
        SidebarComponent,
        DashboredComponent,
        CategoriesListComponent,
        CategoriesFormComponent,
        ProductsListComponent,
        ProductsFormComponent,
        UsersFormComponent,
        UsersListComponent,
        OrdersListComponent,
        OrdersDetailsComponent,
    ],
    imports: [
        BrowserModule,
        RouterModule.forRoot(routes, { initialNavigation: 'enabledBlocking' }),
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        ToastrModule.forRoot(),
        ColorPickerModule,
        UsersModule,
    ],
    providers: providers,
    bootstrap: [AppComponent],
})
export class AppModule {}
@NgModule({})
export class AdminAppModule {
    static forRoot(): ModuleWithProviders<AppModule> {
        return {
            ngModule: AppModule,
            providers: providers,
        };
    }
}
