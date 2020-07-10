import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Edition, Event } from '../shared/models/event';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class EventService {
    constructor(private http: HttpClient,
        private authService: AuthService) { }

    createEvent(event: Event) {
        let title = event.title;
        let description = event.description;
        return this.http.post<any>(`${environment.apiUrl}/api/dashboard/create/event`, { title, description }, {
            headers: {
                "x-access-token": this.authService.getToken()
            }
        })
            .pipe(map(response => {
                console.log("Response : " + response)
                var id = response.id;
                console.log("Id =  " + id);
                // this.createEdition(edition).pipe(map(resp => {
                //     return resp;
                // }));
                return response;
            }));
    }

    createEdition(edition: Edition) {
        return this.http.post<any>(`${environment.apiUrl}/api/dashboard/create/edition`, edition, {
            headers: {
                "x-access-token": this.authService.getToken()
            }
        }).pipe(map(response => {
            
            return response
        }));
    }

    getAllEvents(): Event[] {
        return null;
    }
}
