import { Component, OnInit, ViewChild } from '@angular/core';
import { Edition, Position } from 'src/app/shared/models/event';
import { EventService } from 'src/app/services/event.service';
import { AuthService } from 'src/app/services/auth.service';
import { EventListComponent } from 'src/app/event-list/event-list.component';

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
  
  constructor(
    private eventService: EventService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    // TODO:  Get editions of events of which the user signed up for

    // this.eventService.getInscriptionByUserId(this.authService.getCurrentUserId()).subscribe(data => {
    //   this.editionsData = data;
    // });

    this.eventService.getAllEditions().subscribe(data => {
      let value = data.length / 2;
      this.editionList = data.slice(0, value);
     
    });

  }
  
  openDetails(data: Edition) {
    this.editionDetails = data;
    this.eventService.getPositionsbyEditionId(this.editionDetails.id).subscribe(data => {
      this.positionList = data;
    });
  }
}
