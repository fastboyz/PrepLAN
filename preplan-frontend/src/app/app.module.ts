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
import { CoordinatorPanelComponent } from './dashboard/dashboard-organizer/coordinator-panel/coordinator-panel.component';
import { EventManagerComponent } from './dashboard/dashboard-organizer/event-manager/event-manager.component';
import { EventVolunteerListComponent } from './dashboard/dashboard-organizer/event-volunteer-list/event-volunteer-list.component';
import { CreateEventFormComponent } from './dashboard/dashboard-organizer/event-manager/create-event-form/create-event-form.component';
import { CreateEditionFormComponent } from './dashboard/dashboard-organizer/event-manager/create-edition-form/create-edition-form.component';



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
    CoordinatorPanelComponent,
    EventManagerComponent,
    EventVolunteerListComponent,
    CreateEventFormComponent,
    CreateEditionFormComponent,
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
