import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegistrationFormValidators } from 'src/app/shared/validators/registrationFormValidators';
import { EventService } from 'src/app/services/event.service';
import { Event, Edition } from 'src/app/shared/models/event';

@Component({
  selector: 'create-event-form',
  templateUrl: './create-event-form.component.html',
  styleUrls: ['./create-event-form.component.scss']
})
export class CreateEventFormComponent implements OnInit {
  eventForm:FormGroup;
  editionForm:FormGroup;
  error:string;
  
  constructor(private formBuilder: FormBuilder,
    private eventService: EventService) { }

  ngOnInit(): void {
    this.eventForm = this.formBuilder.group({
      eventTitle: ['', { validators: [Validators.required, Validators.minLength(1), RegistrationFormValidators.trimValue], updateOn: 'blur' }],
      eventDescription: ['', { validators: [Validators.required, Validators.minLength(1), RegistrationFormValidators.trimValue], updateOn: 'blur' }],
    })
    this.editionForm = this.formBuilder.group({
      editionName: ['', { validators: [ RegistrationFormValidators.trimValue], updateOn: 'blur' }],
      editionStartDate: ['', { validators: [ RegistrationFormValidators.trimValue], updateOn: 'blur' }],
      editionEndDate: ['', { validators: [ RegistrationFormValidators.trimValue], updateOn: 'blur' }],
    })
  }

  createEvent(event: Event){
    let newEvent: Event = {
      title: this.eventTitle.value,
      description: this.eventDescription.value
    };
    let newEdition: Edition ={
      name: this.editionName.value,
      startDate: this.editionStartDate.value,
      endDate: this.editionStartDate.value,
      event: newEvent
    }
    this.eventService.createEvent(newEvent).subscribe(
      data =>{
        //alert(data);
        console.log(data);
        newEdition.event = data;
        this.eventService.createEdition(newEdition).subscribe(
          editionData =>{
            //alert(data);
            console.log(editionData);
          }, 
          error => {
            this.error = error;
            console.log(error);
          }
        )
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

}
