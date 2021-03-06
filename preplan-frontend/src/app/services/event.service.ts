import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Edition, Event, Position } from '../shared/models/event';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { InscriptionEvent, Contract, Shift } from '../shared/models/inscriptionEvent';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EventService {
  constructor(private http: HttpClient,
              private authService: AuthService) { }

  createEvent(event: Event) {
    const title = event.title;
    const description = event.description;
    return this.http.post<any>(`${environment.apiUrl}/api/dashboard/event`, { title, description }, {
      headers: {
        'x-access-token': this.authService.getToken()
      }
    })
      .pipe(map(response => {
        return response;
      }));
  }

  createEdition(edition: Edition) {
    return this.http.post<any>(`${environment.apiUrl}/api/dashboard/edition`, edition, {
      headers: {
        'x-access-token': this.authService.getToken()
      }
    }).pipe(map(response => {

      return response;
    }));
  }

  createPosition(position: Position) {
    return this.http.post<any>(`${environment.apiUrl}/api/dashboard/position`, position, {
      headers: {
        'x-access-token': this.authService.getToken()
      }
    }).pipe(map(response => {
      return response;
    }));
  }

  getAllEvents() {
    return this.http.get<Event[]>(`${environment.apiUrl}/api/dashboard/events`, {
      headers: {
        'x-access-token': this.authService.getToken()
      }
    }).pipe(map(response => {
      return response;
    }));
  }

  getAllEditions() {
    return this.http.get<Edition[]>(`${environment.apiUrl}/api/dashboard/editions`, {
      headers: {
        'x-access-token': this.authService.getToken()
      }
    }).pipe(map(response => {
      return response;
    }));
  }

  getPositionsbyEditionId(id: string) {
    return this.http.get<Position[]>(`${environment.apiUrl}/api/dashboard/${id}/positions`, {
      headers: {
        'x-access-token': this.authService.getToken()
      }
    }).pipe(map(response => {
      return response;
    }));
  }

  getEditionById(id: string) {
    return this.http.get<Edition>(`${environment.apiUrl}/api/dashboard/edition/${id}`, {
      headers: {
        'x-access-token': this.authService.getToken()
      }
    }).pipe(map(response => {
      return response;
    }));
  }

  updateEdition(edition: Edition) {
    const id = edition.id;
    return this.http.put<Edition>(`${environment.apiUrl}/api/dashboard/edition/${id}`, edition, {
      headers: {
        'x-access-token': this.authService.getToken()
      }
    }).pipe(map(response => {
      return response;
    }));
  }

  updatePositions(positions: Position[]) {
    return this.http.put<Edition>(`${environment.apiUrl}/api/dashboard/positions/`, positions, {
      headers: {
        'x-access-token': this.authService.getToken()
      }
    }).pipe(map(response => {
      return response;
    }));
  }

  createPositions(positions: Position[]) {
    return this.http.post<Edition>(`${environment.apiUrl}/api/dashboard/positions/`, positions, {
      headers: {
        'x-access-token': this.authService.getToken()
      }
    }).pipe(map(response => {
      return response;
    }));
  }

  deletePositions(positions: Position[]) {

    const options = {
      headers: new HttpHeaders({
        'x-access-token': this.authService.getToken()
      }),
      body: positions
    };

    return this.http.delete<Edition>(`${environment.apiUrl}/api/dashboard/positions/`, options).pipe(map(response => {
      return response;
    }));
  }

  updateEvent(event: Event) {
    const id = event.id;
    return this.http.put<Event>(`${environment.apiUrl}/api/dashboard/event/${id}`, event, {
      headers: {
        'x-access-token': this.authService.getToken()
      }
    }).pipe(map(response => {
      return response;
    }));
  }

  createInscriptionEvent(inscription: InscriptionEvent) {
    return this.http.post<any>(`${environment.apiUrl}/api/dashboard/event/inscription`, inscription, {
      headers: {
        'x-access-token': this.authService.getToken()
      }
    }).pipe(map(response => {
      return response;
    }));
  }

  getAllInscriptionByEditionId(id: string) {
    return this.http.get<InscriptionEvent[]>(`${environment.apiUrl}/api/dashboard/edition/${id}/inscriptions`, {
      headers: {
        'x-access-token': this.authService.getToken()
      }
    }).pipe(map(response => {
      return response;
    }));
  }

  getInscriptionByUserId(id: string) {
    return this.http.get<any>(`${environment.apiUrl}/api/dashboard/profile/${id}/inscriptions`, {
      headers: {
        'x-access-token': this.authService.getToken()
      }
    }).pipe(map(response => {
      return response;
    }));
  }

  updateInscriptionStatus(inscription: InscriptionEvent) {
    const inscriptionList: InscriptionEvent[] = [];
    inscriptionList.push(inscription);
    return this.http.put<any>(`${environment.apiUrl}/api/dashboard/inscription/updateAllStatus`, inscriptionList, {
      headers: {
        'x-access-token': this.authService.getToken()
      }
    }).pipe(map(response => {
      return response;
    }));
  }


  updateAllInscriptionStatus(inscriptions: InscriptionEvent[]) {
    return this.http.put<any>(`${environment.apiUrl}/api/dashboard/inscription/updateAllStatus`, inscriptions, {
      headers: {
        'x-access-token': this.authService.getToken()
      }
    }).pipe(map(response => {
      return response;
    }));
  }

  getAllContracts(id: string) {
    return this.http.get<Contract[]>(`${environment.apiUrl}/api/dashboard/contracts/get/${id}`, {
      headers: {
        'x-access-token': this.authService.getToken()
      }
    }).pipe(map(response => {
      return response;
    }));
  }

  createContract(contract: Contract[]) {
    return this.http.post<Contract>(`${environment.apiUrl}/api/dashboard/contracts/`, contract, {
      headers: {
        'x-access-token': this.authService.getToken()
      }
    }).pipe(map(response => {
      return response;
    }));
  }

  deleteContract(contract: Contract[]) {
    return this.http.post<any>(`${environment.apiUrl}/api/dashboard/contracts/delete`, contract, {
      headers: {
        'x-access-token': this.authService.getToken()
      }
    }).pipe(map(response => {
      return response;
    }));
  }

  getAllShifts(id: string) {
    return this.http.get<Shift[]>(`${environment.apiUrl}/api/dashboard/shift/get/${id}`, {
      headers: {
        'x-access-token': this.authService.getToken()
      }
    }).pipe(map(response => {
      return response;
    }));
  }

  addShift(shift: Shift) {
    return this.http.post<Shift>(`${environment.apiUrl}/api/dashboard/shift`, shift, {
      headers: {
        'x-access-token': this.authService.getToken()
      }
    }).pipe(map(response => {
      return response;
    }));
  }

  deleteShift(shift: Shift) {
    return this.http.post<Shift>(`${environment.apiUrl}/api/dashboard/shift/delete`, shift, {
      headers: {
        'x-access-token': this.authService.getToken()
      }
    }).pipe(map(response => {
      return response;
    }));
  }

  getExcelByEditionId(id: string) {
    return this.http.get<any>(`${environment.apiUrl}/api/dashboard/edition/solver/getExcel/${id}`, {
      headers: {
        'x-access-token': this.authService.getToken()
      }
    }).pipe(map(res => {
      console.log(res.url);
      return res.url;
    }));
  }

  getExcelFile(url: string) {
    return this.http.get(url);
  }

  downloadFile(filePath: string, fileType: string, url: string): Observable<any>{
    const fileExtension = fileType;
    const input = filePath;
    return this.http.get(url,
    { responseType: 'blob' })
    .pipe(map(
      (res) => {
            const blob = new Blob([res], {type: fileExtension});
            return blob;
      }));
  }



  startGenerator(id: string) {
    return this.http.post<any>(`${environment.apiUrl}/api/dashboard/edition/startSolving/${id}`, {}, {
      headers: {
        'x-access-token': this.authService.getToken()
      }
    }).pipe(map(response => {
      return response;
    }));
  }

  stopGenerator(id: string) {
    return this.http.post<any>(`${environment.apiUrl}/api/dashboard/edition/stopSolving/${id}`, {}, {
      headers: {
        'x-access-token': this.authService.getToken()
      }
    }).pipe(map(response => {
      return response;
    }));
  }
}
