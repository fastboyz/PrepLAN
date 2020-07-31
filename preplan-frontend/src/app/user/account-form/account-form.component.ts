import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { FormValidators } from 'src/app/shared/validators/formValidators';
import { Account } from 'src/app/shared/models/user';

@Component({
  selector: 'account-form',
  templateUrl: './account-form.component.html',
  styleUrls: ['./account-form.component.scss']
})
export class AccountFormComponent implements OnInit {
  @Input() accountData: Account;
  accountForm: FormGroup;
  roleOption: any = ['admin', 'volunteer', 'organizer'];

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.accountForm = this.formBuilder.group({
      username: ['', { validators: [Validators.required, Validators.minLength(6), FormValidators.trimValue], updateOn: 'blur' }],
      password: ['', { validators: [Validators.required, Validators.minLength(6), FormValidators.trimValue], updateOn: 'blur' }],
      email: ['', { validators: [Validators.required, Validators.pattern(FormValidators.emailPattern)], updateOn: 'blur' }],
      role: ['', { validators: [Validators.required], updateOn: 'blur' }],
    })
  }
  onSubmitForm() {
  }

  onCancelForm() {
  }

  get username() {
    return this.accountForm.get('username');
  }
  get password() {
    return this.accountForm.get('password');
  }
  get email() {
    return this.accountForm.get('email');
  }
  get role() {
    return this.accountForm.get('role');
  }
}

