import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import * as _ from 'lodash';
import { ActivatedRoute, Router } from '@angular/router';
import { Edition, Event, Position } from 'src/app/shared/models/event';
import { EventService } from 'src/app/services/event.service';

import { EditionFormComponent } from 'src/app/edition-form/edition-form.component';
import { EventFormComponent } from 'src/app/event-form/event-form.component';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'edition-details',
  templateUrl: './edition-details.component.html',
  styleUrls: ['./edition-details.component.scss'],
})
export class EditionDetailsComponent implements OnInit {
  @ViewChild(EditionFormComponent) editionFormComponent: EditionFormComponent;
  @ViewChild(EventFormComponent) eventFormComponent: EventFormComponent;
  @Input() edition: Edition;
  @Input() positionList: Position[];
  @Input() isEnrollable: boolean;
  @Input() isEnrolled: boolean;
  @Input() isEditableOption: boolean;
  @Output() onUpdate = new EventEmitter<boolean>();
  isEditable: boolean;
  isOrganizer: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private eventService: EventService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.isEditable = false;
    this.authService.getRole().subscribe((data) => {
      if (data.name === 'organizer') {
        this.isOrganizer = true;
      } else {
        this.isOrganizer = false;
      }
    });
  }

  onEnrollClick(event: any) {
    document.getElementById('close-event-list-modal').click();
    this.router.navigate(['/inscription', this.edition.id]);
  }

  updateEdition(event: any) {
    const editionForm = this.editionFormComponent.editionForm;
    const eventForm = this.eventFormComponent.eventForm;
    const newEvent: Event = {
      id: this.edition.event.id,
      title: eventForm.get('eventTitle').value,
      description: eventForm.get('eventDescription').value,
    };
    const newEdition: Edition = {
      id: this.edition.id,
      name: editionForm.get('editionName').value,
      startDate: editionForm.get('editionStartDate').value,
      endDate: editionForm.get('editionEndDate').value,
      location: editionForm.get('editionLocation').value,
      event: newEvent,
      isActive: false,
      tenantId: this.edition.tenantId,
      isRegistering: false,
    };

    if (eventForm.touched || eventForm.dirty) {
      this.eventService.updateEvent(newEvent).subscribe((data) => {
        this.edition.event = data;
      });
    }
    if (editionForm.touched || editionForm.dirty) {
      const editionPositionForm = editionForm.get('edition_Positions');

      this.eventService.updateEdition(newEdition).subscribe((data) => {
        this.edition = data;
      });

      if (editionPositionForm.touched || editionPositionForm.dirty) {
        const deleted = this.positionList.filter(
          this.editionListCompare(editionPositionForm.value)
        );
        const added = editionPositionForm.value.filter(
          this.editionListCompare(this.positionList)
        );
        const toUpdate = JSON.parse(JSON.stringify(editionPositionForm.value));
        const filtered = JSON.parse(JSON.stringify(deleted));
        _.remove(toUpdate, (el: any) => {
          return !el.id;
        });

        this.addEditionToPosition(deleted, newEdition);
        this.addEditionToPosition(toUpdate, newEdition);
        this.addEditionToPosition(added, newEdition);

        if (deleted.length > 0) {
          this.eventService.deletePositions(deleted).subscribe();
        }

        if (toUpdate.length > 0) {
          this.eventService.updatePositions(toUpdate).subscribe();
        }

        if (added.length > 0) {
          this.eventService.createPositions(added).subscribe();
        }
      }
    }
    this.onUpdate.emit(true);
    document.getElementById('close-edition-details-modal').click();
  }

  toggleIsEditable() {
    this.isEditable = !this.isEditable;
  }

  editionListCompare(list: any) {
    return (current: any) => {
      return (
        list.filter((other: { id: any }) => {
          return other.id && current.id && other.id === current.id;
        }).length === 0
      );
    };
  }

  editionListToUpdate(list: any) {
    return (current: any) => {
      return (
        list.filter((other: { id: any }) => {
          return other.id && current.id && other.id !== current.id;
        }).length === 0
      );
    };
  }

  addEditionToPosition(positions: any, edition: Edition) {
    positions.forEach((e: { [x: string]: Edition }) => {
      e.edition = edition;
    });
  }
}
