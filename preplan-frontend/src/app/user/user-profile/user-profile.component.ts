import { Component, OnInit, ViewChild } from '@angular/core';

import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';

import { Profile, EmergencyContact, Account, User } from 'src/app/shared/models/user';

import { UserFormComponent } from '../user-form/user-form.component';
import { AccountFormComponent } from '../account-form/account-form.component';
import { EmergencyContactFormComponent } from '../emergency-contact-form/emergency-contact-form.component';


@Component({
  selector: 'profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  @ViewChild(AccountFormComponent) accountFormComponent: AccountFormComponent;
  @ViewChild(UserFormComponent) userFormComponent: UserFormComponent;
  @ViewChild(EmergencyContactFormComponent) contactFormComponent: EmergencyContactFormComponent;

  profileData: Profile;
  contactData: EmergencyContact;
  accountData: Account;
  constructor(private userService: UserService,
    private authService: AuthService) { }

  ngOnInit(): void {
    if (this.authService.currentUserValue) {
      this.userService.getUserProfile(this.authService.currentUserValue.id).subscribe(user => {
        this.profileData = user;
        this.accountData= this.profileData.user.account;
        this.contactData = this.profileData.emergencyContact;
      });
    }
  }

  updateAccount() {
    let accountForm = this.accountFormComponent.accountForm;
    if (accountForm.valid && (accountForm.touched || accountForm.dirty)) {
      let account: Account = {
        username: accountForm.get("username").value,
        password: accountForm.get("password").value,
        email: accountForm.get("email").value,
        role: accountForm.get("role").value,
        id: this.accountData.id
      }

      this.userService.updateAccount(account).subscribe();
    }
  }

  updateUserProfile() {
    let userForm = this.userFormComponent.userForm;
    if (userForm.valid && (userForm.touched || userForm.dirty)) {
      let userInfo: User = {
        id: this.profileData.user.id,
        account: this.accountData,
        firstName: userForm.get("firstName").value,
        lastName: userForm.get("lastName").value,
        pronoun: userForm.get("pronoun").value,
        birthday: userForm.get("birthday").value,
        discord: userForm.get("discord").value,
        phoneNumber: userForm.get("phoneNumber").value
      };

      let userProfile: Profile = {
        id: this.profileData.id,
        user: userInfo,
        tshirtSize: userForm.get("tshirtSize").value,
        allergy: userForm.get("allergy").value,
        certification: userForm.get("certification").value,
        emergencyContact: this.contactData
      }

      this.userService.updateUserProfile(userProfile).subscribe();
    }
  }

  updateContact() {
    let contactForm = this.contactFormComponent.contactForm;
    if (contactForm.valid && (contactForm.touched || contactForm.dirty)) {
      let emergencyContact: EmergencyContact = {
        id: this.contactData.id,
        firstName: contactForm.get("firstName").value,
        lastName: contactForm.get("lastName").value,
        relationship: contactForm.get("relationship").value,
        phoneNumber: contactForm.get("phoneNumber").value
      }

      this.userService.updateEmergencyContact(emergencyContact).subscribe();
    }
  }
}
