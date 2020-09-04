import { Component, OnInit, Input } from '@angular/core';
import { EventService } from '../services/event.service';
import { Edition, Position } from '../shared/models/event';
import { Router } from '@angular/router';

@Component({
  selector: 'event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent implements OnInit {
  @Input() preparedData: Edition[];
  editionList: Edition[];
  editionDetails: Edition;
  positionList: Position[];

  constructor(private router: Router,
              private eventService: EventService) { }

  ngOnInit(): void {
    if (this.preparedData == null) {
      this.loadAllEditions();
    } else {
      this.editionList = this.preparedData;
    }
  }

  loadAllEditions() {
    this.eventService.getAllEditions().subscribe(data => {
      this.editionList = data;
    });
  }

  openDetails(data: Edition) {
    this.editionDetails = data;
    this.eventService.getPositionsbyEditionId(this.editionDetails.id).subscribe(data => {
      this.positionList = data;
    });
    // this.router.navigate(['/edition', data.id]);
  }
}
