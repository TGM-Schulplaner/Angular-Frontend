import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {ToastService} from './toast.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private toast: ToastService) { }

  public login(username: string, password: string) {
    this.http.get(environment.baseUrl + '/login', {headers: {authentication: 'Basic ' + username + ':' + password}})
      .subscribe(
        token => sessionStorage.setItem('authToken', token as string),
        error => this.toast.show('Authentication Error', error));
  }

  public logout() {
    sessionStorage.removeItem('authToken');
  }
}
