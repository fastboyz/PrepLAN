import { Component, OnInit } from '@angular/core';
import { Event } from 'src/app/shared/models/event';
import { AuthService } from 'src/app/services/auth.service';
import { EventService } from 'src/app/services/event.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegistrationFormValidators } from 'src/app/shared/validators/registrationFormValidators';
import { timingSafeEqual } from 'crypto';

@Component({
  selector: 'create-edition-form',
  templateUrl: './create-edition-form.component.html',
  styleUrls: ['./create-edition-form.component.scss']
})
export class CreateEditionFormComponent implements OnInit {
  eventList: Event[];
  editionForm: FormGroup;
  constructor(private formBuilder: FormBuilder,
    private eventService: EventService) { }

  ngOnInit(): void {
    this.eventList = this.eventService.getAllEvents();
    this.editionForm = this.formBuilder.group({
      event: ['', { validators: [Validators.required, RegistrationFormValidators.trimValue], updateOn: 'blur' }],
      editName: ['', { validators: [Validators.required, Validators.minLength(6), RegistrationFormValidators.trimValue], updateOn: 'blur' }],
      editStartDate: ['', { validators: [Validators.required, Validators.minLength(6), RegistrationFormValidators.trimValue], updateOn: 'blur' }],
      editEndDate: ['', { validators: [Validators.required, Validators.minLength(6), RegistrationFormValidators.trimValue], updateOn: 'blur' }],
    })
  }

  createEdition(event: any) {

  }

  get event() {
    return this.editionForm.get('event');
  }
  get editName() {
    return this.editionForm.get('editName');
  }
  get editStartDate() {
    return this.editionForm.get('editStartDate');
  }
  get editEndDate() {
    return this.editionForm.get('editEndDate');
  }
}
