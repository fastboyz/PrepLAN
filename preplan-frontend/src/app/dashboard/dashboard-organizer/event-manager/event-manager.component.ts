import { Component, OnInit } from '@angular/core';
import { Edition, Position } from 'src/app/shared/models/event';
import { EventService } from 'src/app/services/event.service';
import { Router } from '@angular/router';

@Component({
  selector: 'event-manager',
  templateUrl: './event-manager.component.html',
  styleUrls: ['./event-manager.component.scss']
})
export class EventManagerComponent implements OnInit {
  editionList: Edition[];
  editionDetails: Edition;
  positionList:Position[];
  constructor(
    private router: Router,
    private eventService: EventService) { }

  ngOnInit(): void {
    this.loadAllEditions();
  }

  loadAllEditions(){
    this.eventService.getAllEditions().subscribe(data => {
      this.editionList = data;
    });
  }
  openDetails(data: Edition){
    this.editionDetails = data;
    this.eventService.getPositionsbyEditionId(this.editionDetails.id).subscribe(data => {
      this.positionList = data;
    });
    // this.router.navigate(['/edition', data.id]);
  }

  onEventCreated(isCreated :boolean){
    if(isCreated){
      this.loadAllEditions();
    }
  }

}
