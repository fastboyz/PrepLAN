import { Component, OnInit } from '@angular/core';
import { Edition } from 'src/app/shared/models/event';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'event-manager',
  templateUrl: './event-manager.component.html',
  styleUrls: ['./event-manager.component.scss']
})
export class EventManagerComponent implements OnInit {
  editionList: Edition[];
  constructor(
    private eventService: EventService) { }

  ngOnInit(): void {
    this.eventService.getAllEditions().subscribe(data => {
      console.log("Data: " + data);
      this.editionList = data;
    });

  }

}
