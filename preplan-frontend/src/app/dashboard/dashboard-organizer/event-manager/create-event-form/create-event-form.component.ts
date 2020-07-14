import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { RegistrationFormValidators } from 'src/app/shared/validators/registrationFormValidators';
import { EventService } from 'src/app/services/event.service';
import { Event, Edition, Position } from 'src/app/shared/models/event';

@Component({
  selector: 'create-event-form',
  templateUrl: './create-event-form.component.html',
  styleUrls: ['./create-event-form.component.scss']
})
export class CreateEventFormComponent implements OnInit {
  //@Input() edition: Edition;
  eventForm: FormGroup;
  editionForm: FormGroup;
  error: string;

  constructor(private formBuilder: FormBuilder,
    private eventService: EventService) { }

  ngOnInit(): void {
    this.eventForm = this.formBuilder.group({
      eventTitle: ['', { validators: [Validators.required, Validators.minLength(1), RegistrationFormValidators.trimValue], updateOn: 'blur' }],
      eventDescription: ['', { validators: [Validators.required, Validators.minLength(1), RegistrationFormValidators.trimValue], updateOn: 'blur' }],
    })
    this.editionForm = this.formBuilder.group({
      editionName: ['', { validators: [RegistrationFormValidators.trimValue], updateOn: 'blur' }],
      editionStartDate: ['', { validators: [RegistrationFormValidators.trimValue], updateOn: 'blur' }],
      editionEndDate: ['', { validators: [RegistrationFormValidators.trimValue], updateOn: 'blur' }],
      editionLocation: ['', { validators: [RegistrationFormValidators.trimValue], updateOn: 'blur' }],
      edition_Positions: this.formBuilder.array([this.formBuilder.group({ positionName: '', positionDescription: '' })]),
    })
  }

  createEvent(event: Event) {
    let newEvent: Event = {
      title: this.eventTitle.value,
      description: this.eventDescription.value
    };
    let newEdition: Edition = null;
    if (this.editionForm.touched || this.editionForm.dirty) {
      newEdition = {
        name: this.editionName.value,
        startDate: this.editionStartDate.value,
        endDate: this.editionEndDate.value,
        location: this.editionLocation.value,
        event: newEvent,
        isActive: false,
        isRegistering: false
      }
    }

    this.eventService.createEvent(newEvent).subscribe(
      data => {
        if (newEdition !== null) {
          newEdition.event = data;
          this.eventService.createEdition(newEdition).subscribe(
            editionData => {
              for (let index = 0; index <  this.editionPositions.value.length; index++) {
                let position: Position =  {
                  title: this.editionPositions.value[index].positionName,
                  description: this.editionPositions.value[index].positionDescription,
                  edition: editionData
                };
                this.eventService.createPosition(position).subscribe(positionData=>{

                },
                error => {
                  this.error = error;
                  console.log(error);
                });
              }
              document.getElementById('create-event-close').click();
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
      }
    )

  }

  get eventTitle() {
    return this.eventForm.get('eventTitle');
  }

  get eventDescription() {
    return this.eventForm.get('eventDescription');
  }

  get editionName() {
    return this.editionForm.get('editionName');
  }
  get editionStartDate() {
    return this.editionForm.get('editionStartDate');
  }
  get editionEndDate() {
    return this.editionForm.get('editionEndDate');
  }

  get editionLocation() {
    return this.editionForm.get('editionLocation');
  }

  get editionPositions() {
    return this.editionForm.get('edition_Positions') as FormArray;
  }

  addPosition() {
    this.editionPositions.push(this.formBuilder.group({ positionName: '', positionDescription: '' }));
  }

  deletePosition(index) {
    this.editionPositions.removeAt(index);
  }

}
