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

import {Component} from '@angular/core';
/* FontAwesome Icons */
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
// import { faSearch } from '@fortawesome/free-solid-svg-icons';
import {User} from '../../../models/user';
import {UserService} from '../../../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  public isMenuCollapsed = true;
  userIcon = faUserCircle;
  // searchIcon = faSearch;
  get user(): User {
    return this.userService.user;
  }

  constructor(private userService: UserService) { }

  logout() {
    this.userService.logout();
  }
}
