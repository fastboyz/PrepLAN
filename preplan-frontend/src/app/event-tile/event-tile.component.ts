import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Edition } from '../shared/models/event';
import { Router } from '@angular/router';

@Component({
  selector: 'event-tile',
  templateUrl: './event-tile.component.html',
  styleUrls: ['./event-tile.component.scss']
})
export class EventTileComponent implements OnInit {
  @Input() edition: Edition;
  @Input() isEnrollable:boolean;
  @Input() isEnrolled: boolean;
  @Output() onClick = new EventEmitter <Edition>();
  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  
  onButtonClick(event:Event){
    this.onClick.emit(this.edition);
  }

  onEnrollClick(event:Event){
    console.log('Enroll at edition '+ this.edition.name + " of event "+ this.edition.event.title);
    this.router.navigate(['/inscription', this.edition.id]);
  }

  withdrawInscription(){
    // TODO: remove Inscription of this user for this edition.
    console.log("User Removed inscription from " + this.edition.event.title + " - " + this.edition.name );
    document.getElementById('withdraw-confirmation-no').click();
  }
}
