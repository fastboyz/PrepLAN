import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { EmergencyContact, Profile } from '../shared/models/user';

@Component({
  selector: 'inscription-event-form',
  templateUrl: './inscription-event-form.component.html',
  styleUrls: ['./inscription-event-form.component.scss']
})
export class InscriptionEventFormComponent implements OnInit {
  profileData: Profile;
  contactData: EmergencyContact;
  constructor(private router: Router, 
    private authService: AuthService,
    private userService: UserService) { }

  ngOnInit(): void {
    if (this.authService.currentUserValue) {
      this.userService.getProfile(this.authService.currentUserValue.id).subscribe(user => {
        this.profileData = user;
        this.contactData = this.profileData.emergencyContact;
      });
    }
  }

}
