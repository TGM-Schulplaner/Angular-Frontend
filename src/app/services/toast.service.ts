import { Injectable } from '@angular/core';
import {Toast} from '../models/toast';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  toasts: Toast[] = [];
  defaultDelay = 5000;
  defaultAutoHide = false;

  constructor() { }

  show(header: string, body: string, delay?: number, autoHide?: boolean, type?: 'danger'|'warning'|'success'|'info') {
    this.showToast({ header, body, delay, autoHide, type });
  }

  showToast(toast: Toast) {
    this.toasts.push(toast);
  }

  remove(toast) {
    this.toasts = this.toasts.filter(t => t !== toast);
  }
}
