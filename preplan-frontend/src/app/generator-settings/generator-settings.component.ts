import { Component, OnInit, Input } from '@angular/core';
import { Contract, Shift } from '../shared/models/inscriptionEvent';
import { EventService } from '../services/event.service';
import { Edition, Position } from '../shared/models/event';
import { ActivatedRoute } from '@angular/router';

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
    let id = this.route.snapshot.paramMap.get('id');
    this.loadData(id);
    this.newContract = new Contract();
    this.newShift = new Shift();
  }

  async loadData(id: string){
    await this.loadContracts(id);
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

  addContract() {
    if (this.newContract.name != null && this.newContract.maximumMinutesPerDay != null) {
      this.newContract.edition = this.edition;
      let newContracts: Contract[] = [];
      newContracts.push(this.newContract);
      this.eventService.createContract(newContracts).subscribe(data => {
        this.loadContracts(this.edition.id);
        this.newContract = new Contract();
      });
      console.log("Added Contract:\nName: " + this.newContract.name + " . Max Min per Day: " + this.newContract.maximumMinutesPerDay)
    }
  }

  deleteContract(contract: Contract) {
    let deletedContracts: Contract[] = [];
    deletedContracts.push(contract);
    this.eventService.deleteContract(deletedContracts).subscribe(data => {
      if (true) {
        this.loadContracts(contract.edition.id);
      }
    });
    console.log("Delete Contract:\nName: " + contract.name + " . Max Min per Day: " + contract.maximumMinutesPerDay)
  }

  addShift() {
    
    console.log("Add Shift :\n Start: " + this.newShift.startDateTime + " . End: " + this.newShift.endDateTime + "Position: " + this.newShift.position);


  }
  deleteShift(shift: Shift) {
    console.log("Delete Shift :\n Start: " + shift.startDateTime + " . End: " + shift.endDateTime + "Position: " + shift.position);
  }
}