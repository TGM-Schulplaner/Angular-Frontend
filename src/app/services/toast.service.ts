import { Injectable } from '@angular/core';
import {SafeHtml} from '@angular/platform-browser';

class Toast {
  header: string;
  body: string | SafeHtml;
  delay?: number;
  autoHide?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  toasts: Toast[] = [];
  defaultDelay = 5000;
  defaultAutoHide = false;

  constructor() { }

  show(header: string, body: string, delay?: number, autoHide?: boolean) {
    this.toasts.push({ header, body, delay, autoHide });
  }

  remove(toast) {
    this.toasts = this.toasts.filter(t => t !== toast);
  }
}
