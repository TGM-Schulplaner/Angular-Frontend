import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Alert} from '../../models/alert';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  alert: Alert;
  submitted = false;
  loading: any;

  constructor(private formBuilder: FormBuilder, private auth: AuthService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.loading = true;
    this.auth.login(this.f.email.value, this.f.password.value)
      .subscribe(
      () => {
        this.loading = false;
        this.alert = {type: 'success', message: 'Success!'};
      }, (error: any) => {
        this.loading = false;
        if (error != null) {
          this.alert = {type: 'danger', message: 'Authentication Error'};
        }
      });
  }

  close() {
    this.alert = null;
  }
}
