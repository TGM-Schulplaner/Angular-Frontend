import {AfterContentInit, Component, ContentChild, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from '../../models/user';
import {UserService} from '../../services/user.service';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';

@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.scss']
})
export class UserSearchComponent {
  private userValue: User;
  @Output() userChange: EventEmitter<User> = new EventEmitter<User>();
  @Input() name: string;

  public set user(model: User) {
    this.userValue = model;
    this.userChange.emit(this.userValue);
  }

  @Input()
  public get user() {
    return this.userValue;
  }

  constructor(private userService: UserService) { }

  inputFormatter(value: User): string{
    return value.name;
  }

  resultFormatter(value: User): string{
    return value.name + ' <' + value.email + '>';
  }

  search = (ref: UserSearchComponent) => (term: string, max: number) => {
    return ref.userService.searchForUser(term, max);
  }
}
