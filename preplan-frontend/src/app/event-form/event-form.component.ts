import { Component, OnInit, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { FormValidators } from 'src/app/shared/validators/formValidators';
import { EventService } from 'src/app/services/event.service';
import { Event, Edition, Position } from 'src/app/shared/models/event';
import { EditionFormComponent } from '../edition-form/edition-form.component';
import * as moment from 'moment';

@Component({
  selector: 'event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.scss']
})
export class EventFormComponent implements OnInit {
  @ViewChild(EditionFormComponent) editionFormComponent: EditionFormComponent;
  @Output() onEventCreated = new EventEmitter<boolean>();
  @Input() activateButton: boolean;
  @Input() event: Event;

  eventForm: FormGroup;
  error: string;


  constructor(private formBuilder: FormBuilder,
    private eventService: EventService) { }

  ngOnInit(): void {
    this.eventForm = this.formBuilder.group({
      eventTitle: ['', { validators: [Validators.required, Validators.minLength(1), FormValidators.trimValue], updateOn: 'blur' }],
      eventDescription: ['', { validators: [Validators.required, Validators.minLength(1), FormValidators.trimValue], updateOn: 'blur' }],
    });

    if (this.event) {
      this.eventForm.patchValue({
        eventTitle: this.event.title,
        eventDescription: this.event.description
      });
    }
  }

  createEvent(event: Event) {
    if (this.eventForm.valid) {
      let newEvent: Event = {
        title: this.eventTitle.value,
        description: this.eventDescription.value
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
                document.getElementById('event-close').click();
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

  get eventTitle() {
    return this.eventForm.get('eventTitle');
  }

  get eventDescription() {
    return this.eventForm.get('eventDescription');
  }

}
