import { Component, OnInit, ViewChild } from '@angular/core';
import { InscriptionEvent, Availability } from '../shared/models/inscriptionEvent';
import { InscriptionEventFormComponent } from '../inscription-event-form/inscription-event-form.component';
import * as moment from 'moment';

@Component({
  selector: 'volunteer-list',
  templateUrl: './volunteer-list.component.html',
  styleUrls: ['./volunteer-list.component.scss']
})
export class VolunteerListComponent implements OnInit {
  @ViewChild(InscriptionEventFormComponent) inscriptionEventFormComponent: InscriptionEventFormComponent;
  viewOnly:boolean = true;
  inscriptionEvent: InscriptionEvent;
   json = '{"edition":{"startDate":"2020-07-17T15:14:00.000Z","endDate":"2020-07-20T03:14:00.000Z","name":"2020 hi ","isRegistering":false,"isActive":false,"location":"My backyard hi noon","event":{"title":"LanETS hi","description":"woohooo","id":"5f0d2326aba69d4518005435"},"id":"5f0d232baba69d4518005436"},"profile":{"tshirtSize":"M","allergy":"","certification":"","id":"5f3cbcfd8aeb2e555058629d","emergencyContact":{"firstName":"Mum","lastName":"Dad","phoneNumber":"111-222-3333","relationship":"Parent","id":"5f3cbcfd8aeb2e555058629c"},"canEdit":true,"user":{"firstName":"Testy","lastName":"Tester","birthday":"1999-02-21T00:00:00.000Z","phoneNumber":"123-123-1234","discord":"Rawr#1234","pronoun":"She/Her","account":{"email":"volunteer@rawr.test","username":"volunteer","password":"$2a$08$1FDiD.DUlej3qWv6jcw5S.DCzeZIRdCjwqfvDL7faJ63ecNTnhrxa","id":"5f3cbcfd8aeb2e555058629a","role":"volunteer"},"id":"5f3cbcfd8aeb2e555058629b"}},"availability":[{"startDate":"2020-07-17T04:00:00.000Z","endDate":"2020-07-17T12:00:00.000Z","state":"DESIRED"},{"startDate":"2020-07-17T12:00:00.000Z","endDate":"2020-07-17T16:00:00.000Z","state":"DESIRED"},{"startDate":"2020-07-17T16:00:00.000Z","endDate":"2020-07-17T20:00:00.000Z","state":"DESIRED"},{"startDate":"2020-07-17T20:00:00.000Z","endDate":"2020-07-18T00:00:00.000Z","state":"DESIRED"},{"startDate":"2020-07-18T00:00:00.000Z","endDate":"2020-07-18T03:59:59.999Z","state":"DESIRED"},{"startDate":"2020-07-18T04:00:00.000Z","endDate":"2020-07-18T12:00:00.000Z","state":"UNAVAILABLE"},{"startDate":"2020-07-18T12:00:00.000Z","endDate":"2020-07-18T16:00:00.000Z","state":"DESIRED"},{"startDate":"2020-07-18T16:00:00.000Z","endDate":"2020-07-18T20:00:00.000Z","state":"DESIRED"},{"startDate":"2020-07-18T20:00:00.000Z","endDate":"2020-07-19T00:00:00.000Z","state":"DESIRED"},{"startDate":"2020-07-19T00:00:00.000Z","endDate":"2020-07-19T03:59:59.999Z","state":"UNAVAILABLE"},{"startDate":"2020-07-19T04:00:00.000Z","endDate":"2020-07-19T12:00:00.000Z","state":"UNAVAILABLE"},{"startDate":"2020-07-19T12:00:00.000Z","endDate":"2020-07-19T16:00:00.000Z","state":"UNAVAILABLE"},{"startDate":"2020-07-19T16:00:00.000Z","endDate":"2020-07-19T20:00:00.000Z","state":"UNAVAILABLE"},{"startDate":"2020-07-19T20:00:00.000Z","endDate":"2020-07-20T00:00:00.000Z","state":"UNAVAILABLE"},{"startDate":"2020-07-20T00:00:00.000Z","endDate":"2020-07-20T03:59:59.999Z","state":"UNAVAILABLE"}],"preference":{"dailyMaxHours":"12h","departments":["Cashier","Patrol","Logistic","Construction","Tech Support","Vendor"]},"status":"PENDING"}'

  constructor() { }

  ngOnInit(): void {
    this.inscriptionEvent = JSON.parse(this.json);
  }

  loadModal(){
    this.inscriptionEvent = JSON.parse(this.json);
    this.inscriptionEventFormComponent.loadInscriptionValues(this.inscriptionEvent);
  }

  getAge(date: Date){
    return moment().diff(date, 'years');
  }

  getShiftCount(availability: Availability[]){
    return availability.filter(a=> a.state =="DESIRED").length;
  }
}
