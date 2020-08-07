import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { EmergencyContact, Profile } from '../shared/models/user';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { jqxSchedulerComponent } from 'jqwidgets-ng/jqxscheduler';
import { EventService } from '../services/event.service';
import { Edition } from '../shared/models/event';
import * as moment from 'moment';
import { Availability } from '../shared/models/availability';

@Component({
  selector: 'inscription-event-form',
  templateUrl: './inscription-event-form.component.html',
  styleUrls: ['./inscription-event-form.component.scss']
})
export class InscriptionEventFormComponent implements OnInit {
  @ViewChild("schedulerReference") scheduler: jqxSchedulerComponent;
  profileData: Profile;
  contactData: EmergencyContact;
  departments: any = ['Cashier', 'Patrol', 'Logistic', 'Construction', 'Tech Support', 'Vendor'];
  hoursContract: any = ['4h', '8h', '12h'];
  preferencesForm: FormGroup;
  step: number;
  edition: Edition;
  availabilities: any = [];
  selectedAvailabilities: Availability[] = [];

  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private userService: UserService,
    private eventService: EventService) { }

  ngOnInit(): void {
    this.step = 1;

    this.preferencesForm = this.formBuilder.group({
      hoursPreference: ['', { validators: [Validators.required], updateOn: 'blur' }],
      firstPreference: ['', { validators: [Validators.required], updateOn: 'blur' }],
      secondPreference: ['', { validators: [Validators.required], updateOn: 'blur' }],
      thirdPreference: ['', { validators: [Validators.required], updateOn: 'blur' }],
    });

    if (this.authService.currentUserValue) {
      this.userService.getProfile(this.authService.currentUserValue.id).subscribe(user => {
        this.profileData = user;
        this.contactData = this.profileData.emergencyContact;
      });
    }

    this.eventService.getEditionById('5f0d2b68aba69d4518005438').subscribe(edition => {
      this.edition = edition;
      this.getEditionDays();
    });
  }

  submit(){

  }
  
  goToLastStep() {
    this.step--;
  }

  goToNextStep() {
    if (this.step == 2) {
      this.getSelectedOptions();
    }
    this.step++;
  }

  getSelectedOptions() {
    this.selectedAvailabilities = []
    this.availabilities.forEach(element => {
      element.shiftsInDay.forEach(shift => {
        if (shift.checked) {
          this.selectedAvailabilities.push(this.getAvailability(element.date, shift.value, "DESIRED"));
        } else {
          this.selectedAvailabilities.push(this.getAvailability(element.date, shift.value, "UNAVAILABLE"));
        }
      });
    });
    console.log(this.selectedAvailabilities);

  }

  getAvailability(date: moment.Moment, value: number, state: string) {
    let newAvailability: Availability;
    switch (value) {
      case 0:
        newAvailability = new Availability();
        newAvailability.startDate = (date.clone().startOf('day')).toDate();
        newAvailability.endDate = (date.clone().set('hour', 8).set('minute', 0)).toDate();
        break;
      case 1:
        newAvailability = new Availability();
        newAvailability.startDate = (date.clone().set('hour', 8).set('minute', 0)).toDate();
        newAvailability.endDate = (date.clone().set('hour', 12).set('minute', 0)).toDate();
        break;
      case 2:
        newAvailability = new Availability();
        newAvailability.startDate = (date.clone().set('hour', 12).set('minute', 0)).toDate();
        newAvailability.endDate = (date.clone().set('hour', 16).set('minute', 0)).toDate();
        break;
      case 3:
        newAvailability = new Availability();
        newAvailability.startDate = (date.clone().set('hour', 16).set('minute', 0)).toDate();
        newAvailability.endDate = (date.clone().set('hour', 20).set('minute', 0)).toDate();
        break;
      case 4:
        newAvailability = new Availability();
        newAvailability.startDate = (date.clone().set('hour', 20).set('minute', 0)).toDate();
        newAvailability.endDate = (date.clone().endOf('day')).toDate();
        break;
    }
    newAvailability.state = state;
    newAvailability.edition = this.edition;
    newAvailability.profile = this.profileData;
    return newAvailability;
  }

  getEditionDays() {
    let startDate: moment.Moment = moment(this.edition.startDate);
    let endDate: moment.Moment = moment(this.edition.endDate);

    for (var d = startDate; d <= endDate; d = d.add(1, 'd')) {
      this.availabilities.push({
        date: d.clone(),
        shiftsInDay: [
          { value: 0, name: '00h00 - 08h00', checked: false },
          { value: 1, name: '08h00 - 12h00', checked: false },
          { value: 2, name: '12h00 - 16h00', checked: false },
          { value: 3, name: '16h00 - 20h00', checked: false },
          { value: 4, name: '20h00 - 00h00', checked: false }
        ]
      });
    }
  }

}
