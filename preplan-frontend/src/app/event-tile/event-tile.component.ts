import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Edition } from '../shared/models/event';

@Component({
  selector: 'event-tile',
  templateUrl: './event-tile.component.html',
  styleUrls: ['./event-tile.component.scss']
})
export class EventTileComponent implements OnInit {
  @Input() edition: Edition;
  @Output() onClick = new EventEmitter <Edition>();
  constructor() { }

  ngOnInit(): void {
  }
  onButtonClick(event:Event){
    this.onClick.emit(this.edition);
  }
}
