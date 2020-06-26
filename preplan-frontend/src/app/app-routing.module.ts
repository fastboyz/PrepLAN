import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginFormComponent } from './login-form/login-form.component';
import { UserProfileComponent } from './user/user-profile/user-profile.component';
import { UserFormComponent } from './user/user-form/user-form.component';
import { UserRegistrationComponent } from './user/user-registration/user-registration.component';

const routes: Routes = [
  {path: '', redirectTo:'/login', pathMatch: 'full' },
  {path: 'login', component: LoginFormComponent },
  {path: 'register', component: UserRegistrationComponent },
  {path: 'user-profile', component: UserProfileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
