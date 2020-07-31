import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormValidators } from 'src/app/shared/validators/formValidators';
import { EmergencyContact } from 'src/app/shared/models/user';

@Component({
  selector: 'emergency-contact-form',
  templateUrl: './emergency-contact-form.component.html',
  styleUrls: ['./emergency-contact-form.component.scss']
})
export class EmergencyContactFormComponent implements OnInit {
  @Input() contactData: EmergencyContact;
  contactForm: FormGroup;
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    this.contactForm = this.formBuilder.group({
      firstNameEmergency: ['', { validators: [Validators.required, Validators.minLength(1), FormValidators.trimValue], updateOn: 'blur' }],
      lastNameEmergency: ['', { validators: [Validators.required, Validators.minLength(1), FormValidators.trimValue], updateOn: 'blur' }],
      emergencyNumber: ['', { validators: [Validators.required, Validators.pattern(FormValidators.phoneNumberPattern)], updateOn: 'blur' }],
      relationshipEmergency: ['', { validators: [Validators.required, Validators.minLength(1), FormValidators.trimValue], updateOn: 'blur' }],
    })
  }
  onSubmitForm() {
  }

  onCancelForm() {
  }
  get firstNameEmergency() {
    return this.contactForm.get('firstNameEmergency');
  }
  get lastNameEmergency() {
    return this.contactForm.get('lastNameEmergency');
  }
  get emergencyNumber() {
    return this.contactForm.get('emergencyNumber');
  }
  get relationshipEmergency() {
    return this.contactForm.get('relationshipEmergency');
  }
}
