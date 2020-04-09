import {SafeHtml} from '@angular/platform-browser';

export class Toast {
  header: string;
  body: string | SafeHtml;
  delay?: number;
  autoHide?: boolean;
  type?: ToastType;
}

export type ToastType = 'success' | 'info' | 'warning' | 'danger' | 'light' | 'dark';
