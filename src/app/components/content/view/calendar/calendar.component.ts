import {AfterViewInit, Component, ViewChild} from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import bootstrapPlugin from '@fullcalendar/bootstrap';
import { OptionsInput } from '@fullcalendar/core';
import EventApi from '@fullcalendar/core/api/EventApi';
import ViewApi from '@fullcalendar/core/ViewApi';
import deLocale from '@fullcalendar/core/locales/de';
import {FullCalendarComponent} from '@fullcalendar/angular';
import {environment} from '../../../../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements AfterViewInit {
  calendarOptions: OptionsInput;
  @ViewChild('calendar') private calendarComponent: FullCalendarComponent;
  private id = '57162059-91d4-11ea-9fd5-5048494f4e43'; // todo add calendar id

  constructor(private readonly http: HttpClient) {
    this.calendarOptions = new Options(this.eventClicked);
  }

  ngAfterViewInit(): void {
    const http = this.http;
    const id = () => this.id;
    this.calendar.addEventSource({
      events(info, successCallback, errorCallback) {
        return http.get<any[]>(environment.baseUrl + '/calendar/' + id() + '/entries',
          {params: {start: info.start.toISOString(), end: info.end.toISOString()}}).toPromise();
      },
      id: 'server'
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

  height: 'parent';
  contentHeight: 'auto';
  aspectRation = 1;

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

