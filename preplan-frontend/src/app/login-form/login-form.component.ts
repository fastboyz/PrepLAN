import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { $ } from 'protractor';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { first } from 'rxjs/operators';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  error: string;
  loginForm: FormGroup;
  submitted = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) {
    if (this.authService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    document.body.className = 'body-login-form';
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnDestroy(): void {
    document.body.className = '';
  }

  redirect() {
    document.body.className = document.body.className.replace('body-login-form', '');
    this.router.navigate(['register']);
  }

  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) { return; }
    // login
    this.authService.login(this.f.username.value, this.f.password.value).pipe(first()).subscribe(
      data => {
        this.router.navigate(['/']);
      },
      error => {
        this.error = error;
      }
    );
  }
}
