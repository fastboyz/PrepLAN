import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { EmergencyContact, Profile } from '../shared/models/user';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'inscription-event-form',
  templateUrl: './inscription-event-form.component.html',
  styleUrls: ['./inscription-event-form.component.scss']
})
export class InscriptionEventFormComponent implements OnInit {
  profileData: Profile;
  contactData: EmergencyContact;
  departments: any = ['Cashier', 'Patrol', 'Logistic', 'Construction', 'Tech Support', 'Vendor'];
  hoursContract: any = ['4h', '8h', '12h'];
  preferencesForm: FormGroup;
  step: number;
  constructor(private router: Router,
    private formBuilder: FormBuilder, 
    private authService: AuthService,
    private userService: UserService) { }

  ngOnInit(): void {
    this.step =3;

    this.preferencesForm = this.formBuilder.group({
      hoursPreference:['', { validators: [Validators.required], updateOn: 'blur' }],
      firstPreference: ['', { validators: [Validators.required], updateOn: 'blur' }],
      secondPreference: ['', { validators: [Validators.required], updateOn: 'blur' }],
      thirdPreference:  ['', { validators: [Validators.required], updateOn: 'blur' }],
    });

    if (this.authService.currentUserValue) {
      this.userService.getProfile(this.authService.currentUserValue.id).subscribe(user => {
        this.profileData = user;
        this.contactData = this.profileData.emergencyContact;
      });
    }
  }

}
