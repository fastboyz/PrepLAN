import { Component, OnInit, ViewChild } from '@angular/core';
import { Account, User, Profile, EmergencyContact } from 'src/app/shared/models/user';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { UserFormComponent } from '../user-form/user-form.component';
import { AccountFormComponent } from '../account-form/account-form.component';
import { EmergencyContactFormComponent } from '../emergency-contact-form/emergency-contact-form.component';

@Component({
  selector: 'user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.scss']
})
export class UserRegistrationComponent implements OnInit {
  @ViewChild(AccountFormComponent) accountFormComponent: AccountFormComponent;
  @ViewChild(UserFormComponent) userFormComponent: UserFormComponent;
  @ViewChild(EmergencyContactFormComponent) contactFormComponent: EmergencyContactFormComponent;
  
  error: string;
  profileData: Profile;
  contactData: EmergencyContact;
  accountData: Account;

  constructor(private router:Router,
    private authService: AuthService) { }

  ngOnInit(): void {
  }

  addUser(data: FormData){
    /*var userAccount:Account = {
      username: data.get("username").value,
      password: data.get("password").value,
      email: data.get("email").value
    };

    var userInfo: User = {
      account: userAccount,
      firstName: data.get("firstName").value,
      lastName: data.get("lastName").value,
      pronoun: data.get("pronoun").value,
      birthday: data.get("birthday").value,
      discord: data.get("discord").value,
      phoneNumber: data.get("phoneNumber").value
    };

    var emergencyContactInfo: EmergencyContact = {
      firstName: data.get("firstNameEmergency").value,
      lastName: data.get("lastNameEmergency").value,
      relationship: data.get("relationshipEmergency").value,
      phoneNumber: data.get("emergencyNumber").value
    }

    var profile: Profile = {
      user: userInfo,
      tshirtSize: null,
      allergy: data.get("allergy").value,
      certification: data.get("certification").value,
      emergencyContact: emergencyContactInfo
    }

    var profileJson = JSON.stringify(profile);
    console.log(profileJson);*/

    this.authService.signup(data).subscribe(
      data =>{
        this.router.navigate(['login']);
      },
      error => {
        this.error = error;
        //TODO add logger
      }
    )

  }

  onSubmitForm(){
    
  }

  onCancelForm(){
    this.router.navigate(['login']);
  }
}
