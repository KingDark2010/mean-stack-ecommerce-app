import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { DashboredcontentComponent } from './shared/dashboredcontent/dashboredcontent.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';

const routes = [
  {
    path: '',
    component: DashboredcontentComponent
  }];

@NgModule({
    declarations: [AppComponent, DashboredcontentComponent, SidebarComponent],
    imports: [
        BrowserModule,
        RouterModule.forRoot(routes, { initialNavigation: 'enabledBlocking' }),
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
