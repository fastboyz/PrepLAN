import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LoginFormComponent } from './login-form/login-form.component';
import { UserFormComponent } from './user/user-form/user-form.component';
import { UserProfileComponent } from './user/user-profile/user-profile.component';
import { UserRegistrationComponent } from './user/user-registration/user-registration.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    UserFormComponent,
    UserProfileComponent,
    UserRegistrationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, 
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
