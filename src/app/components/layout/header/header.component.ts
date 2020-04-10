import { Component } from '@angular/core';
/* FontAwesome Icons */
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  userIcon = faUserCircle;
  searchIcon = faSearch;

  constructor() { }

}
