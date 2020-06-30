import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Account } from '../shared/models/user';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private currentUserSubject: BehaviorSubject<Account>;
    public currentUser: Observable<Account>;

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
            this.currentUserSubject.next(response);
            return response
        }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }

    signup(userRegistration: string){
        return this.http.post<any>(`${environment.apiUrl}/api/auth/signup`, userRegistration)
        .pipe(map(response => {
            return response
        }));
    }
}