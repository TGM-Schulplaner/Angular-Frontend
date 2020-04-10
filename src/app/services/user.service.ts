import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {User} from '../models/user';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  public getUserDetails(): Observable<User> {
    return this.http.get<User>(environment.baseUrl + '/user');
  }

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
}
