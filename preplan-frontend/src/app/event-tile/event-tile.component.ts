import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Edition } from '../shared/models/event';
import { Router } from '@angular/router';
import { EventService } from '../services/event.service';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { InscriptionEvent } from '../shared/models/inscriptionEvent';

@Component({
  selector: 'event-tile',
  templateUrl: './event-tile.component.html',
  styleUrls: ['./event-tile.component.scss']
})
export class EventTileComponent implements OnInit {
  @Input() edition: Edition;
  @Input() inscription: InscriptionEvent;
  @Input() isEnrollable: boolean;
  @Input() isEnrolled: boolean;
  @Output() onClick = new EventEmitter<Edition>();
  constructor(private router: Router, private eventService: EventService) { }

  ngOnInit(): void {
  }

  onButtonClick(event: Event) {
    this.onClick.emit(this.edition);
  }

  onEnrollClick(event: Event) {
    this.router.navigate(['/inscription', this.edition.id]);
  }

  withdrawInscription() {
    this.inscription.status = 'CANCELLED';
    this.eventService.updateInscriptionStatus(this.inscription).subscribe(d => {
      document.getElementById('withdraw-confirmation-no').click();
    });

  }
}
