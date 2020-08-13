import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormValidators } from 'src/app/shared/validators/formValidators';
import { EmergencyContact } from 'src/app/shared/models/user';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'emergency-contact-form',
  templateUrl: './emergency-contact-form.component.html',
  styleUrls: ['./emergency-contact-form.component.scss']
})
export class EmergencyContactFormComponent implements OnInit {
  @Input("contactData") contactData: EmergencyContact;
  contactForm: FormGroup;
  constructor(private formBuilder: FormBuilder,
    private userService: UserService,
    private authService: AuthService,
    ) { }

  ngOnInit(): void {

    this.contactForm = this.formBuilder.group({
      firstName: ['', { validators: [Validators.required, Validators.minLength(1), FormValidators.trimValue], updateOn: 'blur' }],
      lastName: ['', { validators: [Validators.required, Validators.minLength(1), FormValidators.trimValue], updateOn: 'blur' }],
      phoneNumber: ['', { validators: [Validators.required, Validators.pattern(FormValidators.phoneNumberPattern)], updateOn: 'blur' }],
      relationship: ['', { validators: [Validators.required, Validators.minLength(1), FormValidators.trimValue], updateOn: 'blur' }],
    })

    if (this.authService.currentUserValue) {
      this.userService.getProfile(this.authService.currentUserValue.id).subscribe(profile => {
        this.contactForm.patchValue(profile.emergencyContact);
      });
    }

  }
  onSubmitForm() {
  }

  onCancelForm() {
  }
  get firstName() {
    return this.contactForm.get('firstName');
  }
  get lastName() {
    return this.contactForm.get('lastName');
  }
  get phoneNumber() {
    return this.contactForm.get('phoneNumber');
  }
  get relationship() {
    return this.contactForm.get('relationship');
  }
}
