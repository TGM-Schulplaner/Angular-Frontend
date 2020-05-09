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
import {Duration} from '@fullcalendar/core/datelib/duration';

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
    this.calendarOptions = new Options(this.eventClicked, this.eventChanged);
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

  eventClicked(event: EventApi) {
    // event click handling
  }

  eventChanged(arg: EventChangedInfo) {
    // event change handling
  }
}

type EventClickInfo = {
  el: HTMLElement;
  event: EventApi;
  jsEvent: MouseEvent;
  view: ViewApi;
};

type EventResizeInfo = {
  el: HTMLElement;
  startDelta: Duration;
  endDelta: Duration;
  prevEvent: EventApi;
  event: EventApi;
  revert: () => void;
  jsEvent: Event;
  view: ViewApi
};

type EventDropInfo = {
  el: HTMLElement;
  event: EventApi;
  oldEvent: EventApi;
  delta: Duration;
  revert: () => void;
  jsEvent: Event;
  view: ViewApi
};

type EventChangedInfo = {
  el: HTMLElement,
  oldEvent: EventApi,
  newEvent: EventApi,
  revert: () => void,
  jsEvent: Event,
  view: ViewApi
};

/**
 * The options for the calendar
 */
class Options implements OptionsInput {
  private readonly eventClickCallback: (event: EventApi) => void;
  private readonly eventChangeCallback: (arg: EventChangedInfo) => void;

  constructor(eventClickCallback: (event: EventApi) => void,
              eventChangeCallback: (arg: EventChangedInfo) => void
  ) {
    this.eventClickCallback = eventClickCallback;
    this.eventChangeCallback = eventChangeCallback;
  }

  height: 'parent';
  contentHeight: 'auto';
  aspectRatio = 1;

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

  eventClick(info: EventClickInfo) {
    info.jsEvent.preventDefault();
    this.eventClickCallback(info.event);
  }

  eventDrop(info: EventDropInfo) {
    this.eventChangeCallback(
      {el: info.el, oldEvent: info.oldEvent, newEvent: info.event, revert: info.revert, jsEvent: info.jsEvent, view: info.view});
  }

  eventResize(info: EventResizeInfo) {
    this.eventChangeCallback(
      {el: info.el, oldEvent: info.prevEvent, newEvent: info.event, revert: info.revert, jsEvent: info.jsEvent, view: info.view});
  }
}

