import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardHomeComponent } from './dashboard/dashboard-home/dashboard-home.component';
import { JwtInterceptor } from './helpers/jwt.interceptor';
import { ErrorInterceptor } from './helpers/error.interceptor';
import { DashboardSidebarComponent } from './dashboard/dashboard-sidebar/dashboard-sidebar.component';
import { EventManagerComponent } from './dashboard/dashboard-organizer/event-manager/event-manager.component';
import { EditionDetailsComponent } from './dashboard/dashboard-organizer/event-manager/edition-details/edition-details.component';
import { EventFormComponent } from './event-form/event-form.component';
import { EditionFormComponent } from './edition-form/edition-form.component';
import { EventTileComponent } from './event-tile/event-tile.component';
import { EventEditionFormComponent } from './event-edition-form/event-edition-form.component';
import { EventListComponent } from './event-list/event-list.component';
import { RoleGuard } from './helpers/role.guard';
import { AuthGuard } from './helpers/auth.guard';
import { UserModule } from './user/user.module';
import { InscriptionEventFormComponent } from './inscription-event-form/inscription-event-form.component';
import { jqxGridModule } from 'jqwidgets-ng/jqxgrid';
import { jqxSchedulerModule } from 'jqwidgets-ng/jqxscheduler';
import { EditionManagerComponent } from './edition-manager/edition-manager.component';
import { ProfileInscriptionComponent } from './profile/profile-inscription/profile-inscription.component';
import { ProfileComponent } from './profile/profile.component';
import { VolunteerListComponent } from './volunteer-list/volunteer-list.component';
import { GeneratorSettingsComponent } from './generator-settings/generator-settings.component';
import { ScheduleGeneratorComponent } from './schedule-generator/schedule-generator.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardHomeComponent,
    DashboardSidebarComponent,
    EventManagerComponent,
    EditionDetailsComponent,
    EventFormComponent,
    EditionFormComponent,
    EventTileComponent,
    EventEditionFormComponent,
    EventListComponent,
    EditionManagerComponent,
    InscriptionEventFormComponent,
    ProfileComponent,
    ProfileInscriptionComponent,
    VolunteerListComponent,
    GeneratorSettingsComponent,
    ScheduleGeneratorComponent,
  ],
  imports: [
    UserModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    jqxSchedulerModule,
    
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
