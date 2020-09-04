import { Component, OnInit, ViewChild } from '@angular/core';
import { Edition, Position } from 'src/app/shared/models/event';
import { EventService } from 'src/app/services/event.service';
import { AuthService } from 'src/app/services/auth.service';
import { EventListComponent } from 'src/app/event-list/event-list.component';
import { InscriptionEvent } from 'src/app/shared/models/inscriptionEvent';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'profile-inscription',
  templateUrl: './profile-inscription.component.html',
  styleUrls: ['./profile-inscription.component.scss']
})
export class ProfileInscriptionComponent implements OnInit {
  @ViewChild(EventListComponent) private eventList: EventListComponent;
  editionList: Edition[];
  positionList: Position[];
  editionDetails: Edition;
  inscriptions: InscriptionEvent[];
  
  constructor(
    private eventService: EventService,
    private authService: AuthService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.userService.getUserProfile(this.authService.getCurrentUserId()).subscribe(user => {
      this.eventService.getInscriptionByUserId(user.id).subscribe(data => {
        this.inscriptions = data;
      });
    });
 
  }
  
  openDetails(data: Edition) {
    this.editionDetails = data;
    this.eventService.getPositionsbyEditionId(this.editionDetails.id).subscribe(data => {
      this.positionList = data;
    });
  }
}
