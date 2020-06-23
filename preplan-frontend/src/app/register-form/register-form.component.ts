import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { User } from '../shared/models/user'
import { RegistrationFormValidators } from '../shared/validators/registrationFormValidators'

@Component({
  selector: 'register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {
  registrationForm: FormGroup;
  namePattern = "^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$";
  emailPattern = "^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$";
  phoneNumberPattern = ""
  discordPattern = ""
  birthdayPattern = ""
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.registrationForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(6), RegistrationFormValidators.trimValue]],
      password: ['', [Validators.required, Validators.minLength(6), RegistrationFormValidators.trimValue]],
      email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      firstName: ['', [Validators.required, Validators.minLength(1), RegistrationFormValidators.trimValue]],
      lastName: ['', [Validators.required, Validators.minLength(1),RegistrationFormValidators.trimValue]],
      pronoun: ['', [Validators.required, RegistrationFormValidators.trimValue]],
      birthday: ['', [Validators.required, Validators.pattern(this.birthdayPattern)]],
      mobileNumber: ['', [Validators.required, Validators.pattern(this.phoneNumberPattern)]],
      discord: ['', [Validators.pattern(this.discordPattern)]],
      allergy: ['', [RegistrationFormValidators.trimValue]],
      certification: ['', [RegistrationFormValidators.trimValue]],
      firstNameEmergency: ['', [Validators.required, Validators.minLength(1),RegistrationFormValidators.trimValue]],
      lastNameEmergency: ['', [Validators.required, Validators.minLength(1),RegistrationFormValidators.trimValue]],
      emergencyNumber: ['', [Validators.required, Validators.pattern(this.phoneNumberPattern)]],
      relationshipEmergency: ['', [Validators.required, Validators.minLength(1), RegistrationFormValidators.trimValue]],
    })
  }

  get username() {
    return this.registrationForm.get('username');
  }
  get password() {
    return this.registrationForm.get('password');
  }
  get email() {
    return this.registrationForm.get('email');
  }

  get firstName() {
    return this.registrationForm.get('firstName');
  }
  get lastName() {
    return this.registrationForm.get('lastName');
  }

  get pronoun() {
    return this.registrationForm.get('pronoun');
  }

  get birthday() {
    return this.registrationForm.get('birthday');
  }
  get mobileNumber() {
    return this.registrationForm.get('mobileNumber');
  }
  get discord() {
    return this.registrationForm.get('discord');
  }

  get allergy() {
    return this.registrationForm.get('allergy');
  }

  get certification() {
    return this.registrationForm.get('certification');
  }
  
  
  get firstNameEmergency() {
    return this.registrationForm.get('firstNameEmergency');
  }
  get lastNameEmergency() {
    return this.registrationForm.get('lastNameEmergency');
  }
  get emergencyNumber() {
    return this.registrationForm.get('emergencyNumber');
  }
  get relationshipEmergency() {
    return this.registrationForm.get('relationshipEmergency');
  }
}
