import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Account } from '../../shared/models/user'
import { RegistrationFormValidators } from '../../shared/validators/registrationFormValidators'
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  @Input() formData: FormData;
  @Output() onSubmit = new EventEmitter();
  @Output() onCancel = new EventEmitter();

  userForm: FormGroup;
  namePattern = "^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$";
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  phoneNumberPattern = "";
  discordPattern = ""; //"^((.+?)*#\d{4})$";
  birthdayPattern = "";
  submitted: boolean = false;

  tshirtSizeOptions: any = ['S', 'M', 'L', 'XL', 'XXL', 'XXXL'];
  pronounOptions: any = ['He/Him', 'She/Her', 'They/Them'];

  constructor(private router: Router,
    private userService: UserService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      username: ['', { validators: [Validators.required, Validators.minLength(6), RegistrationFormValidators.trimValue], updateOn: 'blur' }],
      password: ['', { validators: [Validators.required, Validators.minLength(6), RegistrationFormValidators.trimValue], updateOn: 'blur' }],
      email: ['', { validators: [Validators.required, Validators.pattern(this.emailPattern)], updateOn: 'blur' }],
      firstName: ['', { validators: [Validators.required, Validators.minLength(1), RegistrationFormValidators.trimValue], updateOn: 'blur' }],
      lastName: ['', { validators: [Validators.required, Validators.minLength(1), RegistrationFormValidators.trimValue], updateOn: 'blur' }],
      pronoun: ['', { validators: [Validators.required], updateOn: 'blur' }],
      birthday: ['', { validators: [Validators.required, Validators.pattern(this.birthdayPattern)], updateOn: 'blur' }],
      phoneNumber: ['', { validators: [Validators.required, Validators.pattern(this.phoneNumberPattern)], updateOn: 'blur' }],
      discord: ['', { validators: [Validators.pattern(this.discordPattern)], updateOn: 'blur' }],
      tshirtSize: ['', { validators: [Validators.required], updateOn: 'blur' }],
      allergy: ['', { validators: [RegistrationFormValidators.trimValue], updateOn: 'blur' }],
      certification: ['', { validators: [RegistrationFormValidators.trimValue], updateOn: 'blur' }],
      firstNameEmergency: ['', { validators: [Validators.required, Validators.minLength(1), RegistrationFormValidators.trimValue], updateOn: 'blur' }],
      lastNameEmergency: ['', { validators: [Validators.required, Validators.minLength(1), RegistrationFormValidators.trimValue], updateOn: 'blur' }],
      emergencyNumber: ['', { validators: [Validators.required, Validators.pattern(this.phoneNumberPattern)], updateOn: 'blur' }],
      relationshipEmergency: ['', { validators: [Validators.required, Validators.minLength(1), RegistrationFormValidators.trimValue], updateOn: 'blur' }],
    })

    this.userService.getProfile().subscribe(user=> {this.userForm.patchValue(user)});
    // if (this.formData) {
    //   this.userForm.patchValue({
    //     "username": "tiwuty",
    //     "password": "Pa$$w0rd!",
    //     "email": "kape@mailinator.com",
    //     "firstName": "Bree",
    //     "lastName": "Wright",
    //     "pronoun": "He/Him",
    //     "birthday": "1995-04-12",
    //     "phoneNumber": "+1 (154) 763-3652",
    //     "discord": "",
    //     "tshirtSize": "M",
    //     "allergy": "Est non dolor volupt",
    //     "certification": "Nisi ullam qui enim ",
    //     "firstNameEmergency": "Claudia",
    //     "lastNameEmergency": "Freeman",
    //     "emergencyNumber": "+1 (358) 776-4047",
    //     "relationshipEmergency": "Ratione architecto n"
    //   });
    // }
  }

  onSubmitForm() {
    this.submitted = true;
    if (this.userForm.invalid) return;
    console.log(this.userForm.value);
    this.onSubmit.emit(this.userForm.value as FormData);
  }

  onCancelForm() {
    this.onCancel.emit();
  }

  get username() {
    return this.userForm.get('username');
  }
  get password() {
    return this.userForm.get('password');
  }
  get email() {
    return this.userForm.get('email');
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

  get firstNameEmergency() {
    return this.userForm.get('firstNameEmergency');
  }
  get lastNameEmergency() {
    return this.userForm.get('lastNameEmergency');
  }
  get emergencyNumber() {
    return this.userForm.get('emergencyNumber');
  }
  get relationshipEmergency() {
    return this.userForm.get('relationshipEmergency');
  }
}
