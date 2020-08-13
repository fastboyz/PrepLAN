import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginFormComponent } from './login-form/login-form.component';
import { UserProfileComponent } from './user/user-profile/user-profile.component';
import { UserRegistrationComponent } from './user/user-registration/user-registration.component';
import { DashboardHomeComponent } from './dashboard/dashboard-home/dashboard-home.component';
import { AuthGuard } from './helpers/auth.guard';
import { RoleGuard } from './helpers/role.guard';
import { EventManagerComponent } from './dashboard/dashboard-organizer/event-manager/event-manager.component';
import { EventListComponent } from './event-list/event-list.component';
import { EditionManagerComponent } from './edition-manager/edition-manager.component';
import { InscriptionEventFormComponent } from './inscription-event-form/inscription-event-form.component';

const routes: Routes = [
  { path: '', component: DashboardHomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginFormComponent },
  { path: 'register', component: UserRegistrationComponent },
  { path: 'profile', component: UserProfileComponent, canActivate: [AuthGuard] },
  { path: 'event-list', component: EventListComponent, canActivate: [AuthGuard] },
  {
    path: 'event-manager', 
    component: EventManagerComponent, 
    canActivate: [RoleGuard],
    data: {
      expectedRole: 'organizer'
    }
  },
  { path: 'test', component: InscriptionEventFormComponent, canActivate: [AuthGuard] },
  {path: 'inscription/:id', component: InscriptionEventFormComponent, canActivate: [AuthGuard]},
  {path: 'edition/:id', component: EditionManagerComponent, canActivate: [AuthGuard]},
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
