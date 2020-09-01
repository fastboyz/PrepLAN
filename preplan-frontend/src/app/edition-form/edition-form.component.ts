import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Event, Edition, Position } from 'src/app/shared/models/event';
import { EventService } from 'src/app/services/event.service';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { FormValidators } from 'src/app/shared/validators/formValidators';
import * as moment from 'moment';

@Component({
  selector: 'edition-form',
  templateUrl: './edition-form.component.html',
  styleUrls: ['./edition-form.component.scss'],
})
export class EditionFormComponent implements OnInit {
  @Input() edition: Edition;
  @Input() positionList: Position[];
  @Input() activateButton: boolean;
  @Output() onEventCreated = new EventEmitter<boolean>();
  eventList: Event[];
  editionForm: FormGroup;
  error: string;
  constructor(
    private formBuilder: FormBuilder,
    private eventService: EventService
  ) { }

  ngOnInit(): void {
    this.editionForm = this.formBuilder.group({
      event: [
        '',
        {
          validators: [Validators.required, FormValidators.trimValue],
          updateOn: 'blur',
        },
      ],
      editionName: [
        '',
        {
          validators: [
            Validators.required,
            Validators.minLength(2),
            FormValidators.trimValue,
          ],
          updateOn: 'blur',
        },
      ],
      editionStartDate: [
        '',
        {
          validators: [Validators.required, FormValidators.trimValue],
          updateOn: 'blur',
        },
      ],
      editionEndDate: [
        '',
        {
          validators: [Validators.required, FormValidators.trimValue],
          updateOn: 'blur',
        },
      ],
      editionLocation: [
        '',
        {
          validators: [Validators.required, FormValidators.trimValue],
          updateOn: 'blur',
        },
      ],
      edition_Positions: this.formBuilder.array([
        this.formBuilder.group({ title: '', description: '', id: '', spotId: 0, skillId: 0 }),
      ]),
    });

    this.eventService.getAllEvents().subscribe((data) => {
      this.eventList = data;
    });

    if (this.edition) {
      this.editionForm.patchValue({
        event: this.edition.event,
        editionName: this.edition.name,
        editionStartDate: moment(this.edition.startDate).format(
          'YYYY-MM-DDTkk:mm'
        ),
        editionEndDate: moment(this.edition.endDate).format('YYYY-MM-DDTkk:mm'),
        editionLocation: this.edition.location,
      });

      if (this.positionList && this.positionList.length > 0) {
        console.log(this.positionList);
        this.editionPositions.clear();
        this.positionList.forEach((position) => {
          this.editionPositions.push(
            this.formBuilder.group({
              title: position.title,
              description: position.description,
              id: position.id,
              spotId: position.spotId,
              skillId: position.skillId,
            })
          );
        });
      }
    }
  }

  createEdition(event: any) {
    let selectedEvent = this.eventList.find(
      (evt) => evt.id === this.event.value.id
    );
    let newEdition: Edition = {
      name: this.editionName.value,
      startDate: this.editionStartDate.value,
      endDate: this.editionEndDate.value,
      location: this.editionLocation.value,
      event: selectedEvent,
      isActive: false,
      isRegistering: false,
    };

    this.eventService.createEdition(newEdition).subscribe(
      (editionData) => {

        for (
          let index = 0;
          index < this.editionPositions.value.length;
          index++
        ) {
          let position: Position = {
            title: this.editionPositions.value[index].title,
            description: this.editionPositions.value[index].description,
            edition: editionData,
          };
          this.eventService.createPosition(position).subscribe(
            (positionData) => { },
            (error) => {
              this.error = error;
              //TODO add logger
            }
          );
        }
        document.getElementById('edition-close').click();
        this.onEventCreated.emit(true);
      },
      (error) => {
        this.error = error;
        //TODO add logger
      }
    );
  }

  get event() {
    return this.editionForm.get('event');
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
    this.editionPositions.push(
      this.formBuilder.group({ title: '', description: '', id: '' })
    );
  }

  deletePosition(index) {
    this.editionPositions.removeAt(index);
    this.editionForm.markAsDirty();
    this.editionForm.get('edition_Positions').markAsTouched();
  }
}
