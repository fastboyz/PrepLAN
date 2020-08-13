import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Account, Profile, CombinedUser, EmergencyContact } from '../shared/models/user';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';
import * as moment from 'moment';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient, private authService: AuthService) { }

  getAll() {
    return this.http.get<Account[]>(`${environment.apiUrl}/users`);
  }

  updateProfile(profile: any) {
    return this.http
      .put<Account[]>(`${environment.apiUrl}/api/users/profile`, profile, {
        headers: {
          'x-access-token': this.authService.getToken(),
        },
      })
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  getProfile(id: string) {
    return this.http
      .get<Profile>(`${environment.apiUrl}/api/users/profile/${id}`, {
        headers: {
          'x-access-token': this.authService.getToken(),
        },
      })
      .pipe(
        map((response) => {
          let cUser: CombinedUser = new CombinedUser();
          cUser.idAccount = response.user.account.id;
          cUser.idEmergencyContact = response.emergencyContact.id;
          cUser.idProfile = response.id;
          cUser.idUser = response.user.id;
          cUser.allergy = response.allergy;
          cUser.certification = response.certification;
          cUser.tshirtSize = response.tshirtSize;
          cUser.emergencyNumber = response.emergencyContact.phoneNumber;
          cUser.firstNameEmergency = response.emergencyContact.firstName;
          cUser.lastNameEmergency = response.emergencyContact.lastName;
          cUser.relationshipEmergency = response.emergencyContact.relationship;
          cUser.firstName = response.user.firstName;
          cUser.lastName = response.user.lastName;
          cUser.birthday = moment.utc(response.user.birthday).format('YYYY-MM-DD');
          cUser.phoneNumber = response.user.phoneNumber;
          cUser.discord = response.user.discord;
          cUser.pronoun = response.user.pronoun;
          cUser.email = response.user.account.email;
          cUser.username = response.user.account.username;
          cUser.password = response.user.account.password;
          cUser.role = response.user.account.role;
          return response;
        })
      );
  }

  getUserProfile(id: string) {
    return this.http
      .get<Profile>(`${environment.apiUrl}/api/users/profile/${id}`, {
        headers: {
          'x-access-token': this.authService.getToken(),
        },
      })
      .pipe(
        map((response) => {
          return response;
        }));
  }


  updateAccount(account: Account) {
    console.log("Updated Account");
    return this.http
      .put<Account>(`${environment.apiUrl}/api/users/account`, account, {
        headers: {
          'x-access-token': this.authService.getToken(),
        },
      })
      .pipe(
        map((response) => {
          console.log("response :" + response);
          return response;
        })
      );
  }

  updateUserProfile(profile: Profile) {
    console.log("Updated User Profile");
    return this.http
      .put<Profile>(`${environment.apiUrl}/api/users/profile`, profile, {
        headers: {
          'x-access-token': this.authService.getToken(),
        },
      })
      .pipe(
        map((response) => {
          return response;
        })
      );

  }

  updateEmergencyContact(contact: EmergencyContact) {
    console.log("Updated Contact");
    return this.http
      .put<EmergencyContact>(`${environment.apiUrl}/api/users/contact`, contact, {
        headers: {
          'x-access-token': this.authService.getToken(),
        },
      })
      .pipe(
        map((response) => {
          return response;
        })
      );
  }
}
