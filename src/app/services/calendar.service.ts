import { Injectable } from '@angular/core';
import {ExtendedEventSourceInput} from '@fullcalendar/core/structs/event-source';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import EventApi from '@fullcalendar/core/api/EventApi';
import ViewApi from '@fullcalendar/core/ViewApi';
import {Duration} from '@fullcalendar/core/datelib/duration';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  constructor(private readonly http: HttpClient) { }

  public asEventSource(id: () => string): ExtendedEventSourceInput {
    // noinspection UnnecessaryLocalVariableJS
    const http = this.http;
    return {
      events(info, successCallback, errorCallback) {
        return http.get<any[]>(environment.baseUrl + '/calendar/' + id() + '/entries',
          {params: {start: info.start.toISOString(), end: info.end.toISOString()}}).toPromise();
      },
      id: 'server'
    };
  }

  public eventClicked(info: EventClickInfo): void {
    // event click handling
  }

  public eventChanged(info: EventChangedInfo): void {
    // event change handling
  }

  public addEvent(): void {
    // add event handling
  }
}

export type EventClickInfo = {
  el: HTMLElement;
  event: EventApi;
  jsEvent: MouseEvent;
  view: ViewApi;
};

export type EventResizeInfo = {
  el: HTMLElement;
  startDelta: Duration;
  endDelta: Duration;
  prevEvent: EventApi;
  event: EventApi;
  revert: () => void;
  jsEvent: Event;
  view: ViewApi
};

export type EventDropInfo = {
  el: HTMLElement;
  event: EventApi;
  oldEvent: EventApi;
  delta: Duration;
  revert: () => void;
  jsEvent: Event;
  view: ViewApi
};

export type EventChangedInfo = {
  el: HTMLElement,
  oldEvent: EventApi,
  newEvent: EventApi,
  revert: () => void,
  jsEvent: Event,
  view: ViewApi
};
