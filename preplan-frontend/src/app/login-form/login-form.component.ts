import { Component, OnInit } from '@angular/core';
import { $ } from 'protractor';

@Component({
  selector: 'login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    document.body.className ='text-center';
  }

}
