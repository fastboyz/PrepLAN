import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Account, Profile } from '../shared/models/user';


@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<Account[]>(`${environment.apiUrl}/users`);
    }

    getProfile() {
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        var token = currentUser['token'];
        console.log(token);
        return this.http.get<Profile>(`${environment.apiUrl}/api/users/profile`, {
            headers: {
                "x-access-token": token
            }
        });
    }
}