import { Component, OnInit, Input } from '@angular/core';
import { Contract, Shift } from '../shared/models/inscriptionEvent';
import { EventService } from '../services/event.service';
import { Edition, Position } from '../shared/models/event';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'generator-settings',
  templateUrl: './generator-settings.component.html',
  styleUrls: ['./generator-settings.component.scss']
})
export class GeneratorSettingsComponent implements OnInit {
  @Input() edition: Edition;
  newContract: Contract;
  newShift: Shift;
  contracts: Contract[] = [];
  shifts: Shift[] = [];
  positions: Position[] = [];
  numVolunteers: number;

  constructor(
    private route: ActivatedRoute,
    private eventService: EventService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.loadData(id);
    this.newContract = new Contract();
    this.newShift = new Shift();
  }

  async loadData(id: string) {
    await this.loadContracts(id);
    await this.loadShifts(id);
    this.edition = this.contracts[0]?.edition;
    this.eventService.getPositionsbyEditionId(id).subscribe(data => {
      this.positions = data;
    });
  }

  async loadContracts(id: string) {
    this.eventService.getAllContracts(id).subscribe(data => {
      this.contracts = data;
    });
  }

  async loadShifts(id: string) {
    this.eventService.getAllShifts(id).subscribe(data => {
      this.shifts = data;
    });
  }

  getDate(date: Date) {
    return moment(date).format('YYYY-MM-DDTHH:mm');
  }
  getDateName(date: Date) {
    return moment(date).format('MMM Do YYYY');
  }

  getTime(date: Date) {
    return moment(date).format('HH:mm');
  }

  addContract() {
    if (this.newContract.name != null && this.newContract.maximumMinutesPerDay != null) {
      this.newContract.edition = this.edition;
      const newContracts: Contract[] = [];
      newContracts.push(this.newContract);
      this.eventService.createContract(newContracts).subscribe(data => {
        this.loadContracts(this.edition.id);
        this.newContract = new Contract();
      });
    }
  }

  deleteContract(contract: Contract) {
    const deletedContracts: Contract[] = [];
    deletedContracts.push(contract);
    this.eventService.deleteContract(deletedContracts).subscribe(data => {
      if (true) {
        this.loadContracts(contract.edition.id);
      }
    });
  }

  addShift() {
    if (
      this.newShift.startDateTime != null &&
      this.newShift.endDateTime != null &&
      this.newShift.position != null &&
      this.newShift.numberVolunteers > 0
    ) {
      this.newShift.endDateTime = moment(this.newShift.endDateTime).toDate();
      this.newShift.startDateTime = moment(this.newShift.startDateTime).toDate();
      this.newShift.edition = this.edition;
      this.eventService.addShift(this.newShift).subscribe(data => {
        this.loadShifts(this.edition.id);
        this.newShift = new Shift();
      });
    }
  }
  deleteShift(shift: Shift) {
    this.eventService.deleteShift(shift).subscribe(data => {
      this.loadShifts(this.edition.id);
    });
  }
}
