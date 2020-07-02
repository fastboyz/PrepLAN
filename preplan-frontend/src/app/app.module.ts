import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LoginFormComponent } from './login-form/login-form.component';
import { UserFormComponent } from './user/user-form/user-form.component';
import { UserProfileComponent } from './user/user-profile/user-profile.component';
import { UserRegistrationComponent } from './user/user-registration/user-registration.component';
import { DashboardHomeComponent } from './dashboard/dashboard-home/dashboard-home.component';
import { JwtInterceptor } from './helpers/jwt.interceptor';
import { ErrorInterceptor } from './helpers/error.interceptor';
import { fakeBackendProvider } from './helpers/fake-backend';
import { DashboardEventListComponent } from './dashboard/dashboard-volunteer/dashboard-event-list/dashboard-event-list.component';
import { DashboardEventTileComponent } from './dashboard/dashboard-volunteer/dashboard-event-tile/dashboard-event-tile.component';
import { DashboardSidebarComponent } from './dashboard/dashboard-sidebar/dashboard-sidebar.component';
import { DashboardEventDetailComponent } from './dashboard/dashboard-volunteer/dashboard-event-detail/dashboard-event-detail.component';
import { DashboardEventManagerComponent } from './dashboard/dashboard-organizer/dashboard-event-manager/dashboard-event-manager.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    UserFormComponent,
    UserProfileComponent,
    UserRegistrationComponent,
    DashboardHomeComponent,
    DashboardSidebarComponent,
    DashboardEventListComponent,
    DashboardEventTileComponent,
    DashboardEventDetailComponent,
    DashboardEventManagerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, 
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    //fakeBackendProvider  
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
