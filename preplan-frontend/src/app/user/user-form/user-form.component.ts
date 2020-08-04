import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormValidators } from '../../shared/validators/formValidators'
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { CombinedUser, Profile, User } from 'src/app/shared/models/user';
import * as moment from 'moment';

@Component({
  selector: 'user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  @Input("profileData") profileData: Profile;
  @Output() onSubmit = new EventEmitter();
  @Output() onCancel = new EventEmitter();

  userForm: FormGroup;
  namePattern = "^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$";
  submitted: boolean = false;
  userProfile: Profile;
  user: CombinedUser;

  tshirtSizeOptions: any = ['S', 'M', 'L', 'XL', 'XXL', 'XXXL'];
  pronounOptions: any = ['He/Him', 'She/Her', 'They/Them'];
  roleOption: any = ['admin', 'volunteer', 'organizer'];

  constructor(private router: Router,
    private userService: UserService,
    private authService: AuthService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      firstName: ['', { validators: [Validators.required, Validators.minLength(1), FormValidators.trimValue], updateOn: 'blur' }],
      lastName: ['', { validators: [Validators.required, Validators.minLength(1), FormValidators.trimValue], updateOn: 'blur' }],
      pronoun: ['', { validators: [Validators.required], updateOn: 'blur' }],
      birthday: ['', { validators: [Validators.required, Validators.pattern(FormValidators.datePattern)], updateOn: 'blur' }],
      phoneNumber: ['', { validators: [Validators.required, Validators.pattern(FormValidators.phoneNumberPattern)], updateOn: 'blur' }],
      discord: ['', { validators: [Validators.pattern(FormValidators.discordPattern)], updateOn: 'blur' }],
      tshirtSize: ['', { validators: [Validators.required], updateOn: 'blur' }],
      allergy: ['', { validators: [FormValidators.trimValue], updateOn: 'blur' }],
      certification: ['', { validators: [FormValidators.trimValue], updateOn: 'blur' }],
    })

    if (this.authService.currentUserValue) {
      this.userService.getProfile(this.authService.currentUserValue.id).subscribe(profile => {
        this.userProfile = profile;
        this.userForm.setValue({
          firstName: this.userProfile.user.firstName,
          lastName: this.userProfile.user.lastName,
          pronoun: this.userProfile.user.pronoun,
          phoneNumber: this.userProfile.user.phoneNumber,
          birthday: moment.utc(this.userProfile.user.birthday).format('YYYY-MM-DD'),
          discord: this.userProfile.user.discord,
          tshirtSize: this.userProfile.tshirtSize, 
          allergy: this.userProfile.allergy,
          certification: this.userProfile.certification,
        });
      });
    }

  }

  onSubmitForm() {
    this.submitted = true;
    if (this.userForm.invalid) return;

    let formData = (this.userForm.value as FormData);
    // formData['idAccount'] =  this.user?.idAccount;
    // formData['idUser'] = this.user?.idUser;
    // formData['idProfile'] = this.user?.idProfile;
    // formData['idEmergencyContact'] = this.user?.idEmergencyContact;
    let newUser: User = {
      id: this.userProfile.user.id,
      firstName: this.firstName.value,
      lastName: this.lastName.value,
      birthday: this.birthday.value,
      pronoun: this.pronoun.value,
      phoneNumber: this.phoneNumber.value,
      discord: this.discord.value,
      account: this.userProfile.user.account
    }

    let newUserProfile: Profile = {
      id: this.userProfile.id,
      user: newUser,
      allergy: this.allergy.value,
      certification: this.certification.value,
      tshirtSize: this.tshirtSize.value,
      emergencyContact: this.userProfile.emergencyContact
    }
    
    // this.onSubmit.emit(formData);
    this.onSubmit.emit(newUserProfile);
  }

  onCancelForm() {
    this.onCancel.emit();
  }

  get firstName() {
    return this.userForm.get('firstName');
  }
  get lastName() {
    return this.userForm.get('lastName');
  }
  get pronoun() {
    return this.userForm.get('pronoun');
  }
  get birthday() {
    return this.userForm.get('birthday');
  }
  get phoneNumber() {
    return this.userForm.get('phoneNumber');
  }
  get discord() {
    return this.userForm.get('discord');
  }
  get tshirtSize() {
    return this.userForm.get('tshirtSize');
  }
  get allergy() {
    return this.userForm.get('allergy');
  }
  get certification() {
    return this.userForm.get('certification');
  }
}
