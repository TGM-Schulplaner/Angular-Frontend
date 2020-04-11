import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  calendars: any[];
  todos: any[];

  constructor() { }

  setActiveCalendar(calendar: any) {
  }

  setActiveTodo(todo: any) {
  }
}
