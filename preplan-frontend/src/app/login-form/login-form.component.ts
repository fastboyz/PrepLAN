import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { $ } from 'protractor';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  loginForm: FormGroup;
  submitted: boolean = false;

  constructor(
    private router:Router,
    private formBuilder :FormBuilder
    ) { 

  }

  ngOnInit(): void {
    document.body.className ='body-login-form';
  }

  ngOnDestroy(): void{
    document.body.className = '';
  }

  redirect(){
    document.body.className = document.body.className.replace('body-login-form',"");
    this.router.navigate(['register']);
  }

  onSubmit(){
    this.submitted = true;
    if(this.loginForm.invalid) return;
    //login
  }
}
