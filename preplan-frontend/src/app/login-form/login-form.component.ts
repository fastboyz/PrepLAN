import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { $ } from 'protractor';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  isLogin: boolean;
  constructor() { 
    this.isLogin = true;
  }

  ngOnInit(): void {
    // document.body.className ='text-center';
    this.isLogin = true;
  }

  ngOnDestroy(): void{

  }

  toggleLogin(){
    this.isLogin = !this.isLogin
  }
}
