import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataManagerService } from '../service/data-manager.service';
import { LoginAction } from './login.action';
import { AppConstant } from '../constant/AppConstant';
import { LoginModel } from '../models/login.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent extends LoginAction implements OnInit {
  loginForm: FormGroup;
  errMsg: string;
  user: LoginModel;

  constructor(dataManager: DataManagerService, private router: Router) {
    super();
    this.dataManager = dataManager;
    this.user = new LoginModel();
  }

  ngOnInit(): void {
    this.loginUrl = AppConstant.BASEURL + AppConstant.STUDENT + AppConstant.SIGNIN;
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }

  getErrorMessage(type) {
    switch (type) {
      case 'email':
        if (this.loginForm.controls['email'].hasError('required')) {
          return 'You must enter a email';
        }
        return this.loginForm.controls['email'].hasError('email') ? 'Not a valid email' : '';
      case 'password':
        return this.loginForm.controls['password'].hasError('required') ? 'You must enter a Password' : '';
    }
  }

  hasError(controlName: string) {
    return this.loginForm.controls[controlName].invalid;
  }

  onLogin() {
    if (!this.loginForm.invalid) {
      this.loginCall(this.user);
    }
  }

  protected loginCallResponse(res) {
    console.log(res,"Login Response");
    this.errMsg = null;
    this.router.navigate(['dashboard']);
  }

  protected loginCallError(err) {
    this.errMsg = err.error.message;
    console.log(err, this.errMsg);
  }

}
