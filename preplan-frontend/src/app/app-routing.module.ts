import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginFormComponent } from './login-form/login-form.component';
import { UserProfileComponent } from './user/user-profile/user-profile.component';
import { UserFormComponent } from './user/user-form/user-form.component';
import { UserRegistrationComponent } from './user/user-registration/user-registration.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './helpers/auth.guard';

const routes: Routes = [
  {path: '', component: DashboardComponent, canActivate: [AuthGuard] },
  //{path: '', redirectTo:'/login', pathMatch: 'full' },
  {path: 'login', component: LoginFormComponent },
  {path: 'register', component: UserRegistrationComponent },
  {path: 'profile', component: UserProfileComponent},
  
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
