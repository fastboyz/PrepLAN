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

    createEvent(edition: Edition){
        console.log(edition.event);
        return this.http.post<any>(`${environment.apiUrl}/api/dashboard/create/event`, edition.event, {
            headers: {
                "x-access-token": this.authService.getToken()
            }
        })
        .pipe(map(response => {
            var event = JSON.parse(response);
            var id = event['id'];
            edition.event.id = id;
            this.createEdition(edition).pipe(map(resp=>{
                return [response, resp];
            }));
            return [response]
        }));
    }

    createEdition(edition:Edition){
        return this.http.post<any>(`${environment.apiUrl}/api/event/create/event)`, edition, {
            headers: {
                "x-access-token": this.authService.getToken()
            }
        });
    }

    getAllEvents(): Event[]{
        return null;
    }
}
