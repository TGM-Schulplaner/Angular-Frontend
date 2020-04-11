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
