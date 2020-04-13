/*
 * Copyright (c) 2020. tgm - Die Schule der Technik
 *
 *    Licensed under the Apache License, Version 2.0 (the "License");
 *    you may not use this file except in compliance with the License.
 *    You may obtain a copy of the License at
 *
 *        http://www.apache.org/licenses/LICENSE-2.0
 *
 *    Unless required by applicable law or agreed to in writing, software
 *    distributed under the License is distributed on an "AS IS" BASIS,
 *    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *    See the License for the specific language governing permissions and
 *    limitations under the License.
 */

import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Alert} from '../../../models/alert';
import {UserService} from '../../../services/user.service';


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

  constructor(private formBuilder: FormBuilder, private auth: UserService) { }

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
