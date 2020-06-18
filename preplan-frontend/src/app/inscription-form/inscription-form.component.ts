import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'inscription-form',
  templateUrl: './inscription-form.component.html',
  styleUrls: ['./inscription-form.component.scss']
})

export class InscriptionFormComponent implements OnInit {
  inscriptionForm: FormGroup;
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    // this.inscriptionForm = this.formBuilder.group({
  	// 	first_name: ['', Validators.required],
  	// 	last_name: ['', Validators.required],
  	// 	email: ['', [Validators.required, Validators.email]],
  	// 	zipcode: ['', [Validators.required, Validators.pattern('^[0-9]{5}(?:-[0-9]{4})?$')]]
  	// });
  }

}
