import { Component, OnInit, ViewChild } from '@angular/core';
import { Profile, EmergencyContact, Account } from 'src/app/shared/models/user';
import { UserService } from 'src/app/services/user.service';
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
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    //  this.formData = new FormData();


    // if (this.authService.currentUserValue) {
    //   this.userService.getProfile(this.authService.currentUserValue.id).subscribe(user => {
    //     this.user = user;
    //     this.userForm.patchValue(user)
    //   });
    // }
  }

  editUser(event: any) {
    this.userService.updateProfile(event).subscribe();
    location.reload();
  }

  cancel() {

  }
}
