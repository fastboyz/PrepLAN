import { Component, OnInit } from '@angular/core';
import { Event, Edition } from 'src/app/shared/models/event';
import { EventService } from 'src/app/services/event.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegistrationFormValidators } from 'src/app/shared/validators/registrationFormValidators';

@Component({
  selector: 'create-edition-form',
  templateUrl: './create-edition-form.component.html',
  styleUrls: ['./create-edition-form.component.scss']
})
export class CreateEditionFormComponent implements OnInit {
  eventList: Event[];
  editionForm: FormGroup;
  error: string;
  constructor(private formBuilder: FormBuilder,
    private eventService: EventService) { }

  ngOnInit(): void {
    this.eventService.getAllEvents().subscribe(data => {
      console.log("Data: " + data);
      this.eventList = data;
    }
    );
    this.editionForm = this.formBuilder.group({
      event: ['', { validators: [Validators.required, RegistrationFormValidators.trimValue], updateOn: 'blur' }],
      editName: ['', { validators: [Validators.required, Validators.minLength(6), RegistrationFormValidators.trimValue], updateOn: 'blur' }],
      editStartDate: ['', { validators: [Validators.required, Validators.minLength(6), RegistrationFormValidators.trimValue], updateOn: 'blur' }],
      editEndDate: ['', { validators: [Validators.required, Validators.minLength(6), RegistrationFormValidators.trimValue], updateOn: 'blur' }],
      editLocation: ['', { validators: [Validators.required, Validators.minLength(6), RegistrationFormValidators.trimValue], updateOn: 'blur' }],
    })
  }

  createEdition(event: any) {
    let newEdition: Edition = {
      name: this.editName.value,
      startDate: this.editStartDate.value,
      endDate: this.editEndDate.value,
      location: this.editLocation.value,
      event: this.event.value.id,
      isActive: false,
      isRegistering: false
    }
    this.eventService.createEdition(newEdition).subscribe(
      editionData => {
        console.log(editionData);
      },
      error => {
        this.error = error;
        console.log(error);
      }
    )
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
  get editLocation() {
    return this.editionForm.get('editLocation');
  }
}

