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

import { Component } from '@angular/core';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import {Group} from '../../../models/group';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  plusIcon = faPlusCircle;
  groups: Group[] = [];

  constructor() { }

  addGroup() {
    this.groups.push(Group.debug(this.groups.length)); // add a debug group
  }

  setActive(group?: Group) {
    if (group) {
      // set active group
      // set group view active
    } else {
      // clear active group
      // set user view active
    }
  }
}
