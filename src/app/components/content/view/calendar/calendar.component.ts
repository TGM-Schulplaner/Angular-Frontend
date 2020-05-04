import {Component, OnInit, ViewChild} from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import bootstrapPlugin from '@fullcalendar/bootstrap';
import { OptionsInput } from '@fullcalendar/core';
import EventApi from '@fullcalendar/core/api/EventApi';
import ViewApi from '@fullcalendar/core/ViewApi';
import deLocale from '@fullcalendar/core/locales/de';
import {FullCalendarComponent} from '@fullcalendar/angular';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  calendarOptions: OptionsInput;
  @ViewChild('calendar') private calendarComponent: FullCalendarComponent;

  constructor() {
    this.calendarOptions = new Options(this.eventClicked);
  }

  ngOnInit(): void {
    this.calendar.addEventSource({
      events(info, successCallback, failureCallback) {
        // events vom service holen https://fullcalendar.io/docs/v5/events-function
      }
    });
  }

  get calendar() {
    return this.calendarComponent.getApi();
  }

  eventClicked(event) {
    // event click handeln
  }
}

type EventInfo = {
  el: HTMLElement;
  event: EventApi;
  jsEvent: MouseEvent;
  view: ViewApi;
};

/**
 * The options for the calendar
 */
class Options implements OptionsInput {
  private readonly eventCallback: (event) => void;
  constructor(eventCallback: (event) => void) {
    this.eventCallback = eventCallback;
  }

  // locale
  locales = [ deLocale ];
  locale = 'de';

  //  plugins
  plugins = [ dayGridPlugin, timeGridPlugin, interactionPlugin, bootstrapPlugin ];

  // view
  initialView = 'dayGridMonth';
  headerToolbar = {
    center: 'dayGridMonth,timeGridWeek'
  };
  themeSystem = 'bootstrap';
  bootstrapFontAwesome = {
    prev: 'fa-chevron-left',
    next: 'fa-chevron-right',
    prevYear: 'fa-angle-double-left',
    nextYear: 'fa-angle-double-right'
  };

  selectable = true;
  editable = true;

  eventClick(info: EventInfo) {
    info.jsEvent.preventDefault();
    this.eventCallback(info.event);
  }
}

