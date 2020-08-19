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

  constructor(private router: Router,
    private authService: AuthService) { }

  ngOnInit(): void {
  }

  onSubmitForm() {
    if (this.accountFormComponent.accountForm.valid &&
      this.userFormComponent.userForm.valid &&
      this.contactFormComponent.contactForm.valid) {
        let accountForm = this.accountFormComponent.accountForm;
        let userForm =  this.userFormComponent.userForm;
        let contactForm =  this.contactFormComponent.contactForm;

      var userAccount: Account = {
        username: accountForm.get("username").value,
        password: accountForm.get("password").value,
        email: accountForm.get("email").value,
        role: accountForm.get("role").value
      };

      var userInfo: User = {
        account: userAccount,
        firstName: userForm.get("firstName").value,
        lastName: userForm.get("lastName").value,
        pronoun: userForm.get("pronoun").value,
        birthday: userForm.get("birthday").value,
        discord: userForm.get("discord").value,
        phoneNumber: userForm.get("phoneNumber").value
      };

      var emergencyContactInfo: EmergencyContact = {
        firstName: contactForm.get("firstName").value,
        lastName: contactForm.get("lastName").value,
        relationship: contactForm.get("relationship").value,
        phoneNumber: contactForm.get("phoneNumber").value
      }

      var profile: Profile = {
        user: userInfo,
        tshirtSize:userForm.get("tshirtSize").value,
        allergy: userForm.get("allergy").value,
        certification: userForm.get("certification").value,
        emergencyContact: emergencyContactInfo
      }

      this.authService.signUp(profile).subscribe(
        data => {
          this.router.navigate(['login']);
        },
        error => {
          this.error = error;
          //TODO add logger
        }
      )
    }
  }

  onCancelForm() {
    this.router.navigate(['login']);
  }
}
