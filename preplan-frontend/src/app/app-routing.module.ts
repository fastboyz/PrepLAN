import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginFormComponent } from './login-form/login-form.component';
import { UserProfileComponent } from './user/user-profile/user-profile.component';
import { UserRegistrationComponent } from './user/user-registration/user-registration.component';
import { DashboardHomeComponent } from './dashboard/dashboard-home/dashboard-home.component';
import { AuthGuard } from './helpers/auth.guard';
import { DashboardEventListComponent } from './dashboard/dashboard-volunteer/dashboard-event-list/dashboard-event-list.component';
import { EditionDetailsComponent } from './dashboard/dashboard-organizer/event-manager/edition-details/edition-details.component';
import { EventManagerComponent } from './dashboard/dashboard-organizer/event-manager/event-manager.component';

const routes: Routes = [
  {path: '', component: DashboardHomeComponent, canActivate: [AuthGuard] },
  {path: 'login', component: LoginFormComponent },
  {path: 'register', component: UserRegistrationComponent },
  {path: 'profile', component: UserProfileComponent, canActivate: [AuthGuard]},
  {path: 'event-list', component: DashboardEventListComponent,canActivate: [AuthGuard]},
  {path: 'event-manager', component: EventManagerComponent,canActivate: [AuthGuard]},
  {path: 'edition/:id', component: EditionDetailsComponent, canActivate: [AuthGuard]},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
