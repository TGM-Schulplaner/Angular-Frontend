import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {first, map} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  public login(username: string, password: string) {
    return this.http
      .post<{token: string}>(environment.baseUrl + '/login', {username, password})
      .pipe(first())
      .pipe(map<{token: string}, void>(response => sessionStorage.setItem('authToken', response.token)));
  }

  public logout() {
    sessionStorage.removeItem('authToken');
  }
}
