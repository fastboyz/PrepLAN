import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Edition, Event, Position } from 'src/app/shared/models/event';
import { EventService } from 'src/app/services/event.service';
import { FormBuilder, Validators, FormGroup, FormArray } from '@angular/forms';

import { EditionFormComponent } from 'src/app/edition-form/edition-form.component';
import { EventFormComponent } from 'src/app/event-form/event-form.component';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'edition-details',
  templateUrl: './edition-details.component.html',
  styleUrls: ['./edition-details.component.scss']
})
export class EditionDetailsComponent implements OnInit {
  @ViewChild(EditionFormComponent) editionFormComponent: EditionFormComponent;
  @ViewChild(EventFormComponent) eventFormComponent: EventFormComponent;
  @Input() edition: Edition;
  @Input() positionList: Position[];
  isEditable: boolean;
  isOrganizer: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private eventService: EventService,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.isEditable = false;
    // let id = this.route.snapshot.paramMap.get('id');

    // this.eventService.getEditionById(id).subscribe(data => {
    //   this.edition = data;
    // });
    // let id = this.edition?.id;
    // console.log(id);
    // if (id) {
    //   this.eventService.getPositionsbyEditionId(id).subscribe(data => {
    //     this.positionList = data;
    //   });

    //   this.authService.getRole().subscribe(data => {
    //     console.log("data: " + data);
    //     if (data == 'organizer')
    //       this.isOrganizer = true;
    //     else
    //       this.isOrganizer = false;
    //   })
    // }

  }

  updateEdition(event: any) {
    let editionForm = this.editionFormComponent.editionForm;
    let eventForm = this.eventFormComponent.eventForm;
    let newEvent: Event = {
      id: this.edition.event.id,
      title: eventForm.get('eventTitle').value,
      description: eventForm.get('eventDescription').value
    };
    let newEdition: Edition = {
      id: this.edition.id,
      name: editionForm.get('editionName').value,
      startDate: editionForm.get('editionStartDate').value,
      endDate: editionForm.get('editionEndDate').value,
      location: editionForm.get('editionLocation').value,
      event: newEvent,
      isActive: false,
      isRegistering: false
    }

    if (eventForm.touched || eventForm.dirty) {
      this.eventService.updateEvent(newEvent).subscribe(data => {
        this.edition.event = data;
      });
    }
    if (editionForm.touched || editionForm.dirty) {
      let editionPositionForm = editionForm.get('edition_Positions');

      this.eventService.updateEdition(newEdition).subscribe(data => {
        this.edition = data;
      });

      if (editionPositionForm.touched || editionPositionForm.dirty) {
        for (let index = 0; index < editionPositionForm.value.length; index++) {
          let position: Position = {
            title: editionPositionForm.value[index].positionName,
            description: editionPositionForm.value[index].positionDescription,
            edition: this.edition
          };
          // call update
          // TODO-Steve: 
          // untouched = positionList,
          // touched = editionPositionForm (formArray)
          // this.eventService.method(param).subscribe(data=>{});
        }
      }

      }
    }

    toggleIsEditable() {
      this.isEditable = !this.isEditable;
    }
  }
