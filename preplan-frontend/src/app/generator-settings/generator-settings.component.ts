import { Component, OnInit, Input } from '@angular/core';
import { Contract } from '../shared/models/inscriptionEvent';
import { EventService } from '../services/event.service';
import { Edition } from '../shared/models/event';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'generator-settings',
  templateUrl: './generator-settings.component.html',
  styleUrls: ['./generator-settings.component.scss']
})
export class GeneratorSettingsComponent implements OnInit {
  @Input() edition: Edition;
  newContract: Contract;
  contracts: Contract[] = [];
  constructor(
    private route: ActivatedRoute,
    private eventService: EventService
  ) { }

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      this.eventService.getEditionById(id).subscribe(data => {
        this.edition = data;
        this.loadContracts();
      });
    }
    this.newContract = new Contract();
  }

  loadContracts() {
    this.eventService.getAllContracts(this.edition.id).subscribe(data => {
      this.contracts = data;
    });
  }

  addContract() {
    if (this.newContract.name != null && this.newContract.maximumMinutesPerDay != null) {
      this.newContract.edition = this.edition;
      let newContracts: Contract[] = [];
      newContracts.push(this.newContract);
      this.eventService.createContract(newContracts).subscribe(data => {
        this.loadContracts();
      });
      console.log("Added Contract:\nName: " + this.newContract.name + " . Max Min per Day: " + this.newContract.maximumMinutesPerDay)
    }
  }

  deleteContract(contract: Contract) {
    let deletedContracts: Contract[] = [];
    deletedContracts.push(contract);
    this.eventService.deleteContract(deletedContracts).subscribe(data => {
      if(true){
        this.loadContracts();
      }
    });
    console.log("Delete Contract:\nName: " + contract.name + " . Max Min per Day: " + contract.maximumMinutesPerDay)
  }
}
