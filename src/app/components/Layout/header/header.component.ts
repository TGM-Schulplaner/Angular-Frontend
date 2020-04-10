import { Component, OnInit } from '@angular/core';
/* FontAwesome Icons */
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userIcon = faUserCircle;
  searchIcon = faSearch;
  constructor() { }

  ngOnInit(): void {
  }

}
