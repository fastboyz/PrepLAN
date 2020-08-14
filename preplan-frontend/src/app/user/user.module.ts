import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { LoginFormComponent } from '../login-form/login-form.component';

import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { AccountFormComponent } from './account-form/account-form.component';
import { UserFormComponent } from './user-form/user-form.component';
import { EmergencyContactFormComponent } from './emergency-contact-form/emergency-contact-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    LoginFormComponent,
    UserFormComponent,
    UserProfileComponent,
    UserRegistrationComponent, 
    AccountFormComponent,
    EmergencyContactFormComponent 
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,   
    ReactiveFormsModule,
  ],
  exports: [UserFormComponent, EmergencyContactFormComponent, UserProfileComponent],

})

export class UserModule { }
