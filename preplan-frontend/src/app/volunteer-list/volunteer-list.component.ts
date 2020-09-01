import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { InscriptionEvent, Availability } from '../shared/models/inscriptionEvent';
import { InscriptionEventFormComponent } from '../inscription-event-form/inscription-event-form.component';
import * as moment from 'moment';
import { EventService } from '../services/event.service';
import { Edition } from '../shared/models/event';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'volunteer-list',
  templateUrl: './volunteer-list.component.html',
  styleUrls: ['./volunteer-list.component.scss']
})
export class VolunteerListComponent implements OnInit {
  @ViewChild(InscriptionEventFormComponent) inscriptionEventFormComponent: InscriptionEventFormComponent;
  @Input() edition: Edition;
  viewOnly = true;

  selectedFilter: any;
  status = Status;
  statusOptions = [];
  allInscriptionCheckboxes: InscriptionCheckbox[] = [];
  inscriptionCheckboxes: InscriptionCheckbox[] = [];
  inscriptionList: InscriptionEvent[] = [];
  inscriptionEvent: InscriptionEvent;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private eventService: EventService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id != null || id !== undefined) {
      this.eventService.getAllInscriptionByEditionId(id).subscribe(async (data) => {
        await this.createData(data);
        this.inscriptionCheckboxes = JSON.parse(JSON.stringify(this.allInscriptionCheckboxes));
      });
    }
    this.statusOptions = Object.keys(this.status);
    this.selectedFilter = 'ALL';
  }

  loadModal(inscription: InscriptionEvent) {
    this.inscriptionEventFormComponent.loadInscriptionValues(inscription);
  }

  async createData(data: InscriptionEvent[]) {
    data.forEach(element => {
      const newEntry: InscriptionCheckbox = {
        inscriptionEvent: element,
        checked: false
      };
      this.allInscriptionCheckboxes.push(newEntry);
    });
  }
  async approveSelected() {
    const approvedStatus = 'APPROVED';
    const selected: InscriptionEvent[] = await this.getSelectedOptions();
    selected.forEach(opt => opt.status = approvedStatus);
    this.eventService.updateAllInscriptionStatus(selected).subscribe();
    this.clearSelection();
  }

  async disapproveSelected() {
    const disapprovedStatus = 'DISAPPROVED';
    const selected: InscriptionEvent[] = await this.getSelectedOptions();
    selected.forEach(opt => opt.status = disapprovedStatus);
    this.eventService.updateAllInscriptionStatus(selected).subscribe();
    this.clearSelection();
  }

  onFilterChange(evt: any) {
    switch (this.selectedFilter) {
      case Status.PENDING:
        this.inscriptionCheckboxes = this.allInscriptionCheckboxes.filter(i =>
          i.inscriptionEvent.status === Status.PENDING
        );
        break;

      case Status.APPROVED:
        this.inscriptionCheckboxes = this.allInscriptionCheckboxes.filter(i =>
          i.inscriptionEvent.status === Status.APPROVED
        );
        break;

      case Status.DISAPPROVED:
        this.inscriptionCheckboxes = this.allInscriptionCheckboxes.filter(i =>
          i.inscriptionEvent.status === Status.DISAPPROVED
        );
        break;

      case Status.CANCELLED:
        this.inscriptionCheckboxes = this.allInscriptionCheckboxes.filter(i =>
          i.inscriptionEvent.status === Status.CANCELLED
        );
        break;

      default:
        this.inscriptionCheckboxes = this.allInscriptionCheckboxes;
        break;
    }
  }
  getSelectedOptions() {
    return this.inscriptionCheckboxes
      .filter(opt => opt.checked)
      .map(opt => opt.inscriptionEvent);
  }

  clearSelection() {
    this.inscriptionCheckboxes
      .filter(opt => opt.checked)
      .forEach(opt => opt.checked = false);
  }

  getAge(date: Date) {
    return moment().diff(date, 'years');
  }

  getShiftCount(availability: Availability[]) {
    return availability.filter(a => a.state === 'DESIRED').length;
  }
}

class InscriptionCheckbox {
  inscriptionEvent: InscriptionEvent;
  checked: boolean;
}

class InscriptionStatus {
  status: Status;
}

enum Status {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  DISAPPROVED = 'DISAPPROVED',
  CANCELLED = 'CANCELLED'
}
