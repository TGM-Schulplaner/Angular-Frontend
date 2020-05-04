import { Component, OnInit } from '@angular/core';
import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  calendar: Calendar;

  constructor() { 
    let calendarElement = document.getElementById('calendar');
    this.calendar = new Calendar(calendarElement, {
      plugins: [ dayGridPlugin, timeGridPlugin, listPlugin]
    });
    this.calendar.render();
  }

  ngOnInit(): void {
  }

}
