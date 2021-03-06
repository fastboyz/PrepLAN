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

  constructor(private eventService: EventService) { }

  ngOnInit(): void {
  }

  createEvent(event: Event) {
    const eventForm = this.eventFormComponent.eventForm;
    if (eventForm.valid) {
      const newEvent: Event = {
        title: eventForm.get('eventTitle').value,
        description: eventForm.get('eventDescription').value
      };

      this.eventService.createEvent(newEvent).subscribe(
        data => {
          const editionForm = this.editionFormComponent.editionForm;
          if ((editionForm.touched || editionForm.dirty) /* && editionForm.valid*/) {
            const newEdition: Edition = {
              name: editionForm.get('editionName').value,
              startDate: editionForm.get('editionStartDate').value,
              endDate: editionForm.get('editionEndDate').value,
              location: editionForm.get('editionLocation').value,
              event: data,
              isActive: false,
              isRegistering: false
            };
            this.eventService.createEdition(newEdition).subscribe(
              editionData => {
                const editionPositions = this.editionFormComponent.editionForm.get('edition_Positions') as FormArray;
                for (const element of editionPositions.value) {
                  const position: Position = {
                    title: element.title,
                    description: element.description,
                    edition: editionData
                  };
                  this.eventService.createPosition(position).subscribe(positionData => {
                  },
                    error => {
                      this.error = error;
                      // TODO add logger
                    });
                }
                // for (let index = 0; index < editionPositions.value.length; index++) {
                //   const position: Position = {
                //     title: editionPositions.value[index].title,
                //     description: editionPositions.value[index].description,
                //     edition: editionData
                //   };
                //   this.eventService.createPosition(position).subscribe(positionData => {
                //   },
                //     error => {
                //       this.error = error;
                //       // TODO add logger
                //     });
                // }
                document.getElementById('event-edition-close').click();
                this.onEventCreated.emit(true);
              },
              error => {
                this.error = error;
                // TODO add logger

              });
          }
        },
        error => {
          this.error = error;
          // TODO add logger
        });
    }
  }

}
