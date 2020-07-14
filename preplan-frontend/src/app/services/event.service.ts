import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Edition, Event, Position } from '../shared/models/event';
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

    createPosition(position: Position){
        return this.http.post<any>(`${environment.apiUrl}/api/dashboard/create/position`, position, {
            headers: {
                "x-access-token": this.authService.getToken()
            }
        }).pipe(map(response => {
            return response
        }));
    }

    getAllEvents(){
        return this.http.get<Event[]>(`${environment.apiUrl}/api/dashboard/events`, {
            headers: {
                "x-access-token":  this.authService.getToken()
            }
        }).pipe(map(response => {
            console.log(response);
            return response;
        }));
    }

    getAllEditions(){
        return this.http.get<Edition[]>(`${environment.apiUrl}/api/dashboard/editions`, {
            headers: {
                "x-access-token":  this.authService.getToken()
            }
        }).pipe(map(response => {
            console.log("Editions: " + response);
            return response;
        }));
    }

    getPositionsbyEditionId(id: string){
        return this.http.get<Position[]>(`${environment.apiUrl}/api/dashboard/${id}/positions`, {
            headers: {
                "x-access-token":  this.authService.getToken()
            }
        }).pipe(map(response => {
            return response;
        }));
    }

    getEditionById(id:string){
        return this.http.get<Edition>(`${environment.apiUrl}/api/dashboard/edition/${id}`, {
            headers: {
                "x-access-token":  this.authService.getToken()
            }
        }).pipe(map(response => {
            return response;
        }));
    }

    updateEdition(edition:Edition){
        let id = edition.id;
        return this.http.put<Edition>(`${environment.apiUrl}/api/dashboard/edition/${id}`, edition, {
            headers: {
                "x-access-token":  this.authService.getToken()
            }
        }).pipe(map(response => {
            return response;
        }));
    }

    updateEvent(event:Event){
        let id = event.id;
        return this.http.put<Event>(`${environment.apiUrl}/api/dashboard/event/${id}`, event, {
            headers: {
                "x-access-token":  this.authService.getToken()
            }
        }).pipe(map(response => {
            return response;
        }));
    }
}
