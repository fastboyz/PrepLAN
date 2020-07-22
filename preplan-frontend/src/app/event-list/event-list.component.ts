import { Component, OnInit } from '@angular/core';
import { EventService } from '../services/event.service';
import { Edition } from '../shared/models/event';
import { Router } from '@angular/router';

@Component({
  selector: 'event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent implements OnInit {
  editionList:Edition[];
  constructor(private router:Router,
    private eventService:EventService) { }

  ngOnInit(): void {
    this.loadAllEditions();
  }

  loadAllEditions(){
    this.eventService.getAllEditions().subscribe(data => {
      this.editionList = data;
    });
  }
  
  openDetails(data: Edition){
    this.router.navigate(['/edition', data.id]);
  }
}
