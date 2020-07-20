import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Edition, Event, Position } from 'src/app/shared/models/event';
import { EventService } from 'src/app/services/event.service';
import { FormBuilder, Validators, FormGroup, FormArray } from '@angular/forms';
import { FormValidators } from 'src/app/shared/validators/formValidators';
import * as moment from 'moment';

@Component({
  selector: 'app-edition-details',
  templateUrl: './edition-details.component.html',
  styleUrls: ['./edition-details.component.scss']
})
export class EditionDetailsComponent implements OnInit {
  edition: Edition;
  isEditable: boolean;
  eventForm: FormGroup;
  editionForm: FormGroup;
  positionForm: FormGroup;
  positionList: Position[];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private eventService: EventService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.isEditable = false;
    this.eventForm = this.formBuilder.group({
      editEventTitle: ['', { validators: [Validators.required, Validators.minLength(1), FormValidators.trimValue], updateOn: 'blur' }],
      editEventDescription: ['', { validators: [Validators.required, Validators.minLength(1), FormValidators.trimValue], updateOn: 'blur' }],
    })
    this.editionForm = this.formBuilder.group({
      editEditionName: ['', { validators: [FormValidators.trimValue], updateOn: 'blur' }],
      editEditionStartDate: ['', { validators: [FormValidators.trimValue], updateOn: 'blur' }],
      editEditionEndDate: ['', { validators: [FormValidators.trimValue], updateOn: 'blur' }],
      editEditionLocation: [''],

    })
    this.positionForm = this.formBuilder.group({
      edition_Positions: this.formBuilder.array([this.formBuilder.group({ positionName: '', positionDescription: '' })]),
    })


    let id = this.route.snapshot.paramMap.get('id');
    this.eventService.getEditionById(id).subscribe(data => {
      this.edition = data;
      if (this.edition) {
        if (this.edition.event) {
          this.eventForm.patchValue({
            editEventTitle: this.edition.event.title,
            editEventDescription: this.edition.event.description
          });
        }

        this.editionForm.patchValue({
          editEditionName: this.edition.name,
          editEditionStartDate: moment(this.edition.startDate).format("YYYY-MM-DDTkk:mm"),
          editEditionEndDate: moment(this.edition.endDate).format("YYYY-MM-DDTkk:mm"),
          editEditionLocation: this.edition.location,
        });

        this.eventService.getPositionsbyEditionId(this.edition.id).subscribe(data => {
          this.positionList = data;
          this.positionList.forEach(element => {
            this.editionPositions.push(this.formBuilder.group({ positionName: element.title, positionDescription: element.description }));
          });
        });
      }
    });

    
  }

  updateEdition(event: any) {
    let newEvent: Event = {
      id: this.edition.event.id,
      title: this.editEventTitle.value,
      description: this.editEventDescription.value
    };
    let newEdition: Edition = {
      id: this.edition.id,
      name: this.editEditionName.value,
      startDate: this.editEditionStartDate.value,
      endDate: this.editEditionEndDate.value,
      location: this.editEditionLocation.value,
      event: newEvent,
      isActive: false,
      isRegistering: false
    }

    if (this.eventForm.touched || this.eventForm.dirty) {
      this.eventService.updateEvent(newEvent).subscribe(data => {
        this.edition.event = data;
      });
    }
    if (this.editionForm.touched || this.editionForm.dirty) {
      this.eventService.updateEdition(newEdition).subscribe(data => {
        this.edition = data;
      });
    }
  }
  toggleIsEditable() {
    this.isEditable = !this.isEditable;
  }


  get editEventTitle() {
    return this.eventForm.get('editEventTitle');
  }

  get editEventDescription() {
    return this.eventForm.get('editEventDescription');
  }

  get editEditionName() {
    return this.editionForm.get('editEditionName');
  }
  get editEditionStartDate() {
    return this.editionForm.get('editEditionStartDate');
  }
  get editEditionEndDate() {
    return this.editionForm.get('editEditionEndDate');
  }

  get editEditionLocation() {
    return this.editionForm.get('editEditionLocation');
  }

  get editionPositions() {
    return this.positionForm.get('edition_Positions') as FormArray;
  }

  addPosition() {
    this.editionPositions.push(this.formBuilder.group({ positionName: '', positionDescription: '' }));
  }

  deletePosition(index) {
    this.editionPositions.removeAt(index);
  }
}
