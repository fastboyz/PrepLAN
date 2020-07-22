import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { EditionFormComponent } from '../edition-form/edition-form.component';
import { EventFormComponent } from '../event-form/event-form.component';
import { EventService } from '../services/event.service';
import { Event, Edition, Position } from '../shared/models/event';
import { FormArray } from '@angular/forms';

@Component({
  selector: 'event-edition-form',
  templateUrl: './event-edition-form.component.html',
  styleUrls: ['./event-edition-form.component.scss']
})
export class EventEditionFormComponent implements OnInit {
  @ViewChild(EditionFormComponent) editionFormComponent: EditionFormComponent;
  @ViewChild(EventFormComponent) eventFormComponent: EventFormComponent;
  @Output() onEventCreated = new EventEmitter<boolean>();

  error: string;

  constructor(private eventService:EventService) { }

  ngOnInit(): void {
  }

  createEvent(event: Event) {
    let eventForm =  this.eventFormComponent.eventForm;
    if (eventForm.valid) {
      let newEvent: Event = {
        title: eventForm.get('eventTitle').value,
        description: eventForm.get('eventDescription').value
      };

      this.eventService.createEvent(newEvent).subscribe(
        data => {
          let editionForm = this.editionFormComponent.editionForm;
          if ((editionForm.touched || editionForm.dirty) /* && editionForm.valid*/) {
            console.log(this.editionFormComponent.editionForm.value);
            let newEdition: Edition = {
              name: editionForm.get('editionName').value,
              startDate: editionForm.get('editionStartDate').value,
              endDate: editionForm.get('editionEndDate').value,
              location: editionForm.get('editionLocation').value,
              event: data,
              isActive: false,
              isRegistering: false
            }
            this.eventService.createEdition(newEdition).subscribe(
              editionData => {
                let editionPositions = this.editionFormComponent.editionForm.get('edition_Positions') as FormArray;
                for (let index = 0; index < editionPositions.value.length; index++) {
                  let position: Position = {
                    title: editionPositions.value[index].positionName,
                    description: editionPositions.value[index].positionDescription,
                    edition: editionData
                  };
                  this.eventService.createPosition(position).subscribe(positionData => {
                  },
                    error => {
                      this.error = error;
                      console.log(error);
                    });
                }
                document.getElementById('event-edition-close').click();
                this.onEventCreated.emit(true);
              },
              error => {
                this.error = error;
                console.log(error);

              });
          }
        },
        error => {
          this.error = error;
          console.log(error);
        });
    }
  }

}
