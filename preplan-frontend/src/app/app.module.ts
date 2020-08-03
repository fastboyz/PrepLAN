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
import { DashboardSidebarComponent } from './dashboard/dashboard-sidebar/dashboard-sidebar.component';
import { EventManagerComponent } from './dashboard/dashboard-organizer/event-manager/event-manager.component';
import { EventVolunteerListComponent } from './dashboard/dashboard-organizer/event-volunteer-list/event-volunteer-list.component';
import { EditionDetailsComponent } from './dashboard/dashboard-organizer/event-manager/edition-details/edition-details.component';
import { EventFormComponent } from './event-form/event-form.component';
import { EditionFormComponent } from './edition-form/edition-form.component';
import { EventTileComponent } from './event-tile/event-tile.component';
import { EventEditionFormComponent } from './event-edition-form/event-edition-form.component';
import { EventListComponent } from './event-list/event-list.component';
import { RoleGuard } from './helpers/role.guard';
import { AuthGuard } from './helpers/auth.guard';
import { EditionManagerComponent } from './edition-manager/edition-manager.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    UserFormComponent,
    UserProfileComponent,
    UserRegistrationComponent,
    DashboardHomeComponent,
    DashboardSidebarComponent,
    EventManagerComponent,
    EventVolunteerListComponent,
    EditionDetailsComponent,
    EventFormComponent,
    EditionFormComponent,
    EventTileComponent,
    EventEditionFormComponent,
    EventListComponent,
    EditionManagerComponent,
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
    RoleGuard,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
