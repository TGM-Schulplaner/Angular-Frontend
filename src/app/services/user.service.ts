import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {User} from '../models/user';
import {Observable} from 'rxjs';
import {first, map} from 'rxjs/operators';
import {Router} from '@angular/router';

export type Token = {token: string};

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userCache: User;

  constructor(private http: HttpClient, private router: Router) {}

  public searchForUser(term: string, size?: number, page?: number): Observable<User[]> {
    const params = new HttpParams();
    params.set('q', term);
    if (size) {
      params.set('size', size.toString());
    }
    if (page) {
      params.set('page', page.toString());
    }
    return this.http.get<User[]>(environment.baseUrl + '/users', {params});
  }

  public get user(): User {
    if (this.loggedIn() && !this.userCache) {
      this.http.get<User>(environment.baseUrl + '/user').subscribe(value => {
        this.userCache = value;
      });
    }
    return this.userCache;
  }

  public login(username: string, password: string): Observable<void> {
    return this.http
      .post<Token>(environment.baseUrl + '/login', {username, password})
      .pipe(first())
      .pipe(map<Token, void>(response => {
        sessionStorage.setItem('authToken', response.token);
        this.router.navigateByUrl('/view').then();
      }));
  }

  public logout(): void {
    sessionStorage.removeItem('authToken');
    this.userCache = undefined;
    this.router.navigateByUrl('/').then();
  }

  public loggedIn(): boolean {
    return !!sessionStorage.getItem('authToken');
  }
}
