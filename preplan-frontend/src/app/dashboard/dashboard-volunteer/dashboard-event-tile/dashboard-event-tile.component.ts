import { Component, OnInit, Input, Output,EventEmitter} from '@angular/core';
import { Edition } from 'src/app/shared/models/event';

@Component({
  selector: 'event-tile',
  templateUrl: './dashboard-event-tile.component.html',
  styleUrls: ['./dashboard-event-tile.component.scss']
})
export class DashboardEventTileComponent implements OnInit {
  @Input() edition: Edition;
  @Output() onClick = new EventEmitter <Edition>();
  constructor() { }

  ngOnInit(): void {
  }

  onButtonClick(event:Event){
    this.onClick.emit(this.edition);
  }
}
