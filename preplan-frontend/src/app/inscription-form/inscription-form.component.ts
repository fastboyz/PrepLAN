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
  }

}
