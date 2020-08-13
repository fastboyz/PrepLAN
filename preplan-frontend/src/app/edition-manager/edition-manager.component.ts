import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EventService } from '../services/event.service';
import { Edition, Position } from '../shared/models/event';

@Component({
  selector: 'app-edition-manager',
  templateUrl: './edition-manager.component.html',
  styleUrls: ['./edition-manager.component.scss']
})
export class EditionManagerComponent implements OnInit {
  edition: Edition;
  positionList: Position[];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private eventService:EventService) { }

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      this.eventService.getEditionById(id).subscribe(data => {
        this.edition = data;
      });
      this.eventService.getPositionsbyEditionId(id).subscribe(data => {
        this.positionList = data;
      });
    }
  }


  onUpdate(isUpdated:boolean){
    if(isUpdated){
      location.reload();
    }
  }
}
