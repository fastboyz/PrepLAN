import { Component, OnInit, ViewChild } from '@angular/core';
import { ProfileInscriptionComponent } from './profile-inscription/profile-inscription.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  @ViewChild(ProfileInscriptionComponent) profileInscription: ProfileInscriptionComponent;
  success: boolean;
  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation.extras.state as { success: boolean };
    if (state) {
      this.success = state.success;
      if (this.success) {
        document.getElementById('profile-info-tab').classList.remove('active');
        document.getElementById('my-inscriptions-tab').classList.add('active');
      }
    }
  }

  ngOnInit(): void {

  }

}
