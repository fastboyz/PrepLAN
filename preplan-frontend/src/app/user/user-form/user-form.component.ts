import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormValidators } from '../../shared/validators/formValidators';
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
  @Input('profileData') profileData: Profile;
  @Output() onSubmit = new EventEmitter();
  @Output() onCancel = new EventEmitter();
  @Input() viewOnly: boolean;
  userForm: FormGroup;
  namePattern = '^[a-zA-Z]+(([\',. -][a-zA-Z ])?[a-zA-Z]*)*$';
  submitted = false;
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
      firstName: [{ value: '', disabled: this.viewOnly },
      { validators: [Validators.required, Validators.minLength(1), FormValidators.trimValue], updateOn: 'blur' }],
      lastName: [{ value: '', disabled: this.viewOnly },
      { validators: [Validators.required, Validators.minLength(1), FormValidators.trimValue], updateOn: 'blur' }],
      pronoun: [{ value: '', disabled: this.viewOnly },
      { validators: [Validators.required], updateOn: 'blur' }],
      birthday: [{ value: '', disabled: this.viewOnly },
      { validators: [Validators.required, Validators.pattern(FormValidators.datePattern)], updateOn: 'blur' }],
      phoneNumber: [{ value: '', disabled: this.viewOnly },
      { validators: [Validators.required, Validators.pattern(FormValidators.phoneNumberPattern)], updateOn: 'blur' }],
      discord: [{ value: '', disabled: this.viewOnly },
      { validators: [Validators.pattern(FormValidators.discordPattern)], updateOn: 'blur' }],
      tshirtSize: [{ value: '', disabled: this.viewOnly },
      { validators: [Validators.required], updateOn: 'blur' }],
      allergy: [{ value: '', disabled: this.viewOnly },
      { validators: [FormValidators.trimValue], updateOn: 'blur' }],
      certification: [{ value: '', disabled: this.viewOnly },
      { validators: [FormValidators.trimValue], updateOn: 'blur' }],
    });

    if (this.viewOnly) {
      if (this.profileData) {
        this.setUserFormValues(this.profileData);
      }
    } else {
      if (this.authService.currentUserValue) {
        this.userService.getProfile(this.authService.currentUserValue.id).subscribe(profile => {
          this.setUserFormValues(profile);
        });
      }

    }
  }

  setUserFormValues(profile: Profile) {
    this.userProfile = profile;
    this.userForm.setValue({
      firstName: profile.user.firstName,
      lastName: profile.user.lastName,
      pronoun: profile.user.pronoun,
      phoneNumber: profile.user.phoneNumber,
      birthday: moment.utc(profile.user.birthday).format('YYYY-MM-DD'),
      discord: profile.user.discord,
      tshirtSize: profile.tshirtSize,
      allergy: profile.allergy,
      certification: profile.certification,
    });

  }
  onSubmitForm() {
    this.submitted = true;
    if (this.userForm.invalid) { return; }

    const formData = (this.userForm.value as FormData);
    // formData['idAccount'] =  this.user?.idAccount;
    // formData['idUser'] = this.user?.idUser;
    // formData['idProfile'] = this.user?.idProfile;
    // formData['idEmergencyContact'] = this.user?.idEmergencyContact;
    const newUser: User = {
      id: this.userProfile.user.id,
      firstName: this.firstName.value,
      lastName: this.lastName.value,
      birthday: this.birthday.value,
      pronoun: this.pronoun.value,
      phoneNumber: this.phoneNumber.value,
      discord: this.discord.value,
      account: this.userProfile.user.account
    };

    const newUserProfile: Profile = {
      id: this.userProfile.id,
      user: newUser,
      allergy: this.allergy.value,
      certification: this.certification.value,
      tshirtSize: this.tshirtSize.value,
      emergencyContact: this.userProfile.emergencyContact
    };

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
