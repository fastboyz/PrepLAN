import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Account, Profile, CombinedUser } from '../shared/models/user';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';


@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient, private authService:AuthService) { }

    getAll() {
        return this.http.get<Account[]>(`${environment.apiUrl}/users`);
    }

    getProfile(id: string) {
        return this.http.get<Profile>(`${environment.apiUrl}/api/users/profile/${id}`, {
            headers: {
                "x-access-token": this.authService.getToken()
            }
        }).pipe(map(response => {
            let cUser: CombinedUser = new CombinedUser;
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
            let date = new Date(response.user.birthday);
            let year = date.getUTCFullYear();
            let month = date.getUTCMonth() + 1;
            let dt = date.getUTCDate();
            let day = '';
            let mnt = ''
            if (dt < 10) {
                day= '0' + dt;
            }
            if (month < 10) {
                mnt = '0' + month;
            }
            cUser.birthday = year + '-' + mnt + '-' + day
            cUser.phoneNumber = response.user.phoneNumber;
            cUser.discord = response.user.discord;
            cUser.pronoun = response.user.pronoun;
            cUser.email = response.user.account.email;
            cUser.username = response.user.account.username;
            cUser.password = response.user.account.password;
            return cUser;
        }));
    }
}