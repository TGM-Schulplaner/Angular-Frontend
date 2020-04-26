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

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/content/home/home.component';
import {ViewComponent} from './components/content/view/view.component';
import {AuthGuard} from './guards/auth.guard';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'view',
    component: ViewComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard]/*,
    children: [
      { path: '', component: InfoComponent },
      { path: 'todo', component: TodoComponent },
      { path: 'calendar', component: CalendarComponent }
    ]*/
  },
  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
