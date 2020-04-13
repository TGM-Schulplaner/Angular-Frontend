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

import {Component, Directive, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';
import {Observable, of} from 'rxjs';
import {catchError, debounceTime, distinctUntilChanged, filter, flatMap, map, switchMap, tap} from 'rxjs/operators';
import {ControlValueAccessor, NgModel} from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent<T = any> {
  @Input() inputId: string;
  @Input() name: string;
  @Input() inputFormatter: (model: T) => string;
  @Input() resultFormatter: (model: T) => string;
  @Input() search: (searchTerm: string, elements: number) => Observable<T[]>;
  searchFailed: boolean;
  searching: boolean;
  private modelValue: T;
  @Output() modelChange: EventEmitter<T> = new EventEmitter<T>();

  constructor(public sanitizer: DomSanitizer) { }

  set model(model: any) {
    this.modelValue = model;
    this.modelChange.emit(this.modelValue);
  }

  @Input()
  get model() {
    return this.modelValue;
  }

  searchInternal = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      filter(term => term.length >= 2),
      tap(() => this.searching = true),
      switchMap(term =>
          this.search(term, 10).pipe(
            tap(() => this.searchFailed = false),
            catchError(() => {
              this.searchFailed = true;
              return of([]);
            }))
      ),
      map(value => { this.searchFailed = value.length === 0; return value; }),
      tap(() => this.searching = false)
    )

}
