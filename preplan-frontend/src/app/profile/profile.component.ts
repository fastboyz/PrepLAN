import { Component, OnInit, ViewChild } from '@angular/core';
import { ProfileInscriptionComponent } from './profile-inscription/profile-inscription.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  @ViewChild(ProfileInscriptionComponent) profileInscription: ProfileInscriptionComponent;
  constructor() { }

  ngOnInit(): void {
  }

}
