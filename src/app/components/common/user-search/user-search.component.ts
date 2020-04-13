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

import {AfterContentInit, Component, ContentChild, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from '../../../models/user';
import {UserService} from '../../../services/user.service';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';

@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.scss']
})
export class UserSearchComponent {
  private userValue: User;
  @Output() userChange: EventEmitter<User> = new EventEmitter<User>();
  @Input() name: string;

  public set user(model: User) {
    this.userValue = model;
    this.userChange.emit(this.userValue);
  }

  @Input()
  public get user() {
    return this.userValue;
  }

  constructor(private userService: UserService) { }

  inputFormatter(value: User): string{
    return value.name;
  }

  resultFormatter(value: User): string{
    return value.name + ' <' + value.email + '>';
  }

  search = (ref: UserSearchComponent) => (term: string, max: number) => {
    return ref.userService.searchForUser(term, max);
  }
}
