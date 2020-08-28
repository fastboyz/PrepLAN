import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Account, Profile } from '../shared/models/user';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private currentUserSubject: BehaviorSubject<Account>;
    public currentUser: Observable<Account>;
    private token: string;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<Account>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): Account {
        return this.currentUserSubject.value;
    }

    login(username: string, password: string) {
        return this.http.post<any>(`${environment.apiUrl}/api/auth/signin`, { username, password }
        ).pipe(map(response => {
            localStorage.setItem('currentUser', JSON.stringify(response));
            this.setRefreshedValue("0");
            this.currentUserSubject.next(response);
            return response
        }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        localStorage.removeItem('refreshed');
        this.currentUserSubject.next(null);
    }

    signup(userRegistration: FormData) {
        return this.http.post<any>(`${environment.apiUrl}/api/auth/signup`, userRegistration)
            .pipe(map(response => {
                return response
            }));
    }

    signUp(userProfile: Profile) {
        return this.http.post<any>(`${environment.apiUrl}/api/auth/signup`, userProfile)
            .pipe(map(response => {
                return response
            }));
    }

    getRole() {
        let id = this.getCurrentUserId();
        return this.http.get<any>(`${environment.apiUrl}/api/auth/role/${id}`).pipe(map(response => {
            return response;
        }));
    }

    getToken() {
        if (!this.token) {
            var currentUser = JSON.parse(localStorage.getItem('currentUser'));
            this.token = currentUser['token'];
        }
        return this.token;
    }

    getCurrentUserId() {
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        return currentUser['id'];
    }

    setRefreshedValue(value: string) {
        localStorage.setItem('refreshed', value);
    }

    getRefreshedValue() {
        let value: number = JSON.parse(localStorage.getItem('refreshed'));
        return value;
    }
}