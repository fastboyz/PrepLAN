import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Edition } from '../shared/models/event';

@Component({
  selector: 'event-tile',
  templateUrl: './event-tile.component.html',
  styleUrls: ['./event-tile.component.scss']
})
export class EventTileComponent implements OnInit {
  @Input() edition: Edition;
  @Input() isEnrollable:boolean;
  @Output() onClick = new EventEmitter <Edition>();
  constructor() { }

  ngOnInit(): void {
  }
  
  onButtonClick(event:Event){
    this.onClick.emit(this.edition);
  }

  onEnrollClick(event:Event){
    console.log('Enroll at edition '+ this.edition.name + " of event "+ this.edition.event.title);
  }
}
