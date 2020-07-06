import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegistrationFormValidators } from 'src/app/shared/validators/registrationFormValidators';

@Component({
  selector: 'create-event-form',
  templateUrl: './create-event-form.component.html',
  styleUrls: ['./create-event-form.component.scss']
})
export class CreateEventFormComponent implements OnInit {
  eventForm:FormGroup;
  editionForm:FormGroup;
  
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.eventForm = this.formBuilder.group({
      eventTitle: ['', { validators: [Validators.required, Validators.minLength(6), RegistrationFormValidators.trimValue], updateOn: 'blur' }],
      eventDescription: ['', { validators: [Validators.required, Validators.minLength(6), RegistrationFormValidators.trimValue], updateOn: 'blur' }],
    })
    this.editionForm = this.formBuilder.group({
      editionName: ['', { validators: [Validators.required, Validators.minLength(6), RegistrationFormValidators.trimValue], updateOn: 'blur' }],
      editionStartDate: ['', { validators: [Validators.required, Validators.minLength(6), RegistrationFormValidators.trimValue], updateOn: 'blur' }],
      editionEndDate: ['', { validators: [Validators.required, Validators.minLength(6), RegistrationFormValidators.trimValue], updateOn: 'blur' }],
    })
  }

  createEvent(event: Event){
    
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
