import {Component} from '@angular/core';
/* FontAwesome Icons */
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
// import { faSearch } from '@fortawesome/free-solid-svg-icons';
import {User} from '../../../models/user';
import {UserService} from '../../../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  userIcon = faUserCircle;
  // searchIcon = faSearch;
  get user(): User {
    return this.userService.user;
  }

  constructor(private userService: UserService) { }

  logout() {
    this.userService.logout();
  }
}
