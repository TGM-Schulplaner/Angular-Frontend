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
