import {AfterViewInit, Component, ViewChild} from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import bootstrapPlugin from '@fullcalendar/bootstrap';
import { OptionsInput } from '@fullcalendar/core';
import deLocale from '@fullcalendar/core/locales/de';
import {FullCalendarComponent} from '@fullcalendar/angular';
import {CalendarService, EventChangedInfo, EventClickInfo, EventDropInfo, EventResizeInfo} from '../../../../services/calendar.service';
import {environment} from '../../../../../environments/environment';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements AfterViewInit {
  calendarOptions: OptionsInput;
  @ViewChild('calendar') private calendarComponent: FullCalendarComponent;
  private id = () => '57162059-91d4-11ea-9fd5-5048494f4e43'; // TODO add calendar id

  constructor(private readonly service: CalendarService) {
    this.calendarOptions = new Options(service.eventClicked, service.eventChanged, service.addEvent);
  }

  ngAfterViewInit(): void {
    if (!environment.dev_mock_user) {
      this.calendarComponent.getApi().addEventSource(this.service.asEventSource(this.id));
    }
  }
}

/**
 * The options for the calendar
 */
class Options implements OptionsInput {
  constructor(private readonly eventClickCallback: (event: EventClickInfo) => void,
              private readonly eventChangeCallback: (arg: EventChangedInfo) => void,
              private readonly addEventCallback: () => void
  ) {
    this.customButtons = {
      addEventButton: {
        text: 'Event Hinzufügen',
        click: addEventCallback
      }
    };
  }

  customButtons;

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
    center: 'addEventButton dayGridMonth,timeGridWeek'
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
    this.eventClickCallback(info);
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

