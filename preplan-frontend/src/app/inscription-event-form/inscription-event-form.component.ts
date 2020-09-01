import { Component, OnInit, AfterViewInit, ViewChild, Input } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { EmergencyContact, Profile, User } from '../shared/models/user';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EventService } from '../services/event.service';
import { Edition, Position } from '../shared/models/event';
import * as moment from 'moment';
import { Availability, InscriptionEvent, Contract } from '../shared/models/inscriptionEvent';
import { UserFormComponent } from '../user/user-form/user-form.component';
import { EmergencyContactFormComponent } from '../user/emergency-contact-form/emergency-contact-form.component';

@Component({
  selector: 'inscription-event-form',
  templateUrl: './inscription-event-form.component.html',
  styleUrls: ['./inscription-event-form.component.scss']
})
export class InscriptionEventFormComponent implements OnInit {
  @ViewChild(UserFormComponent) userFormComponent: UserFormComponent;
  @ViewChild(EmergencyContactFormComponent) contactFormComponent: EmergencyContactFormComponent;
  @Input() viewOnly: boolean;
  @Input() inscriptionEvent: InscriptionEvent;
  edition: Edition;
  profileData: Profile;
  contactData: EmergencyContact;
  positions: Position[];
  contracts: Contract[];
  firstPosition: Position;
  secondPosition: Position;
  thirdPosition: Position;
  selectedContract: Contract;
  anyDeptId: string = "any-departements-id";
  preferencesForm: FormGroup;
  step: number;
  availabilities: any = [];
  selectedAvailabilities: Availability[] = [];
  errorNoChecked: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private userService: UserService,
    private eventService: EventService) { }

  ngOnInit(): void {
    let editionId = this.route.snapshot.paramMap.get('id');
    this.step = 1;
    this.preferencesForm = this.formBuilder.group({
      hoursPreference: [{ value: '', disabled: this.viewOnly }, { validators: [Validators.required], updateOn: 'blur' }],
      firstPreference: [{ value: '', disabled: this.viewOnly }, { validators: [Validators.required], updateOn: 'blur' }],
      secondPreference: [{ value: '', disabled: this.viewOnly }, { validators: [Validators.required], updateOn: 'blur' }],
      thirdPreference: [{ value: '', disabled: this.viewOnly }, { validators: [Validators.required], updateOn: 'blur' }],
    });

    if (!this.viewOnly) {

      if (this.authService.currentUserValue) {
        this.userService.getProfile(this.authService.currentUserValue.id).subscribe(user => {
          this.profileData = user;
          this.contactData = this.profileData.emergencyContact;
        });
      }
      this.eventService.getEditionById(editionId).subscribe(edition => {
        this.edition = edition;
        this.getEditionDays();
        this.getPositions(this.edition);
        this.eventService.getAllContracts(this.edition.id).subscribe(data=>{
          this.contracts= data;
        });
      });
    } else {
      if (this.inscriptionEvent != null) {
        this.loadInscriptionValues(this.inscriptionEvent);
      }
    }
  }

  async submit() {
    if (this.preferencesForm.valid) {
      await this.updateUserProfile;
      await this.updateContact;

      await this.getSelectedOptions();

      let newInscription: InscriptionEvent = {
        edition: this.edition,
        profile: this.profileData,
        availabilities: this.selectedAvailabilities,
        positions: this.getSelectedPositions(),
        contract: this.selectedContract,
        status: "PENDING",
        inscriptionDate: moment().toDate(),
        lastUpdated: moment().toDate()
      }

      this.eventService.createInscriptionEvent(newInscription).subscribe(data => {
        if (data.message.includes('success')) {
          this.router.navigate(['event-list']);
        }
      });

    }
  }

  async updateUserProfile() {
    let userForm = this.userFormComponent.userForm;
    if (userForm.valid && (userForm.touched || userForm.dirty)) {
      let userInfo: User = {
        id: this.profileData.user.id,
        account: this.profileData.user.account,
        firstName: userForm.get("firstName").value,
        lastName: userForm.get("lastName").value,
        pronoun: userForm.get("pronoun").value,
        birthday: userForm.get("birthday").value,
        discord: userForm.get("discord").value,
        phoneNumber: userForm.get("phoneNumber").value
      };

      let userProfile: Profile = {
        id: this.profileData.id,
        user: userInfo,
        tshirtSize: userForm.get("tshirtSize").value,
        allergy: userForm.get("allergy").value,
        certification: userForm.get("certification").value,
        emergencyContact: this.contactData
      }

      this.userService.updateUserProfile(userProfile).subscribe(profile => {
        this.profileData = profile;
      });
    }
  }

  async updateContact() {
    let contactForm = this.contactFormComponent.contactForm;
    if (contactForm.valid && (contactForm.touched || contactForm.dirty)) {
      let emergencyContact: EmergencyContact = {
        id: this.contactData.id,
        firstName: contactForm.get("firstName").value,
        lastName: contactForm.get("lastName").value,
        relationship: contactForm.get("relationship").value,
        phoneNumber: contactForm.get("phoneNumber").value
      }

      this.userService.updateEmergencyContact(emergencyContact).subscribe(contact => {
        this.contactData = contact;
      });
    }
  }

  goToLastStep() {
    this.step--;
  }

  goToNextStep() {
    if (this.step == 2) {
      var checkboxes = document.querySelectorAll('input[type="checkbox"]');
      var checkedOne = Array.prototype.slice.call(checkboxes).some(x => x.checked);
      if (!checkedOne) {
        this.errorNoChecked = true;
        return;
      } else { this.errorNoChecked = false; }
    }
    this.step++;
  }

  async loadInscriptionValues(inscription: InscriptionEvent) {
    this.inscriptionEvent = inscription;
    this.contactData = this.inscriptionEvent.profile.emergencyContact;
    this.profileData = this.inscriptionEvent.profile;
    this.userFormComponent.setUserFormValues(this.inscriptionEvent.profile);
    this.contactFormComponent.setContactFormValue(this.inscriptionEvent.profile.emergencyContact);

    this.preferencesForm.setValue({
      hoursPreference: this.inscriptionEvent.contract.maximumMinutesPerDay,
      firstPreference: '',
      secondPreference: '',
      thirdPreference: ''
    });
    this.edition = this.inscriptionEvent.edition;

    this.getPositions(this.edition);
    this.eventService.getAllContracts(this.edition.id).subscribe(data=>{
      this.contracts= data;
    });

    this.availabilities = [];
    await this.getEditionDays();
    this.setAvailability();
  }

  getPositions(edition: Edition) {
    this.eventService.getPositionsbyEditionId(edition.id).subscribe(data => {
      this.positions = data;
      let position: Position = {
        id: this.anyDeptId,
        title: "Any Departments",
        edition: edition,
        description: "All and any the departments"
      }
      this.positions.unshift(position);
    });
  }

  getSelectedPositions() {
    if (this.firstPosition.id == this.anyDeptId ||
      this.secondPosition.id == this.anyDeptId ||
      this.thirdPosition.id == this.anyDeptId) {
        return this.positions.slice(1, this.positions.length);
    }

    let selectedPositions: Position[] = this.positions
      .filter(pos =>
        pos.id == this.firstPosition.id||
        pos.id == this.secondPosition.id ||
        pos.id == this.thirdPosition.id
      )
    return selectedPositions;
  }

  getSelectedContract() {
    let selectedContract: Contract = this.contracts.find(contract => {
      contract.name == this.hoursPreference.value
    })
    return selectedContract;
  }

  async getSelectedOptions() {
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
  }

  getAvailability(date: moment.Moment, value: number, state: string) {
    let newAvailability: Availability;
    switch (value) {
      case 0:
        newAvailability = new Availability();
        newAvailability.startDateTime = (date.clone().utc().startOf('day')).toDate();
        newAvailability.endDateTime = (date.clone().utc().set('hour', 8).set('minute', 0)).toDate();
        break;
      case 1:
        newAvailability = new Availability();
        newAvailability.startDateTime = (date.clone().utc().set('hour', 8).set('minute', 0)).toDate();
        newAvailability.endDateTime = (date.clone().utc().set('hour', 12).set('minute', 0)).toDate();
        break;
      case 2:
        newAvailability = new Availability();
        newAvailability.startDateTime = (date.clone().utc().set('hour', 12).set('minute', 0)).toDate();
        newAvailability.endDateTime = (date.clone().utc().set('hour', 16).set('minute', 0)).toDate();
        break;
      case 3:
        newAvailability = new Availability();
        newAvailability.startDateTime = (date.clone().utc().set('hour', 16).set('minute', 0)).toDate();
        newAvailability.endDateTime = (date.clone().utc().set('hour', 20).set('minute', 0)).toDate();
        break;
      case 4:
        newAvailability = new Availability();
        newAvailability.startDateTime = (date.clone().utc().set('hour', 20).set('minute', 0)).toDate();
        newAvailability.endDateTime = (date.clone().utc().endOf('day')).toDate();
        break;
    }
    newAvailability.state = state;
    return newAvailability;
  }

  setAvailability() {
    let sameSize = this.inscriptionEvent.availabilities.length == (this.availabilities.length * this.availabilities[0].shiftsInDay.length);
    if (sameSize) {
      let index = 0;
      for (let day = 0; day < this.availabilities.length; day++) {
        for (let shift = 0; shift < this.availabilities[day].shiftsInDay.length; shift++) {
          let isDesired = this.inscriptionEvent.availabilities[index].state == "DESIRED";
          this.availabilities[day].shiftsInDay[shift].checked = isDesired;
          index++;
        }
      }
    }
  }

  async getEditionDays() {
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

  get hoursPreference() {
    return this.preferencesForm.get('hoursPreference');
  }
  get firstPreference() {
    return this.preferencesForm.get('firstPreference');
  }
  get secondPreference() {
    return this.preferencesForm.get('secondPreference');
  }
  get thirdPreference() {
    return this.preferencesForm.get('thirdPreference');
  }
}
