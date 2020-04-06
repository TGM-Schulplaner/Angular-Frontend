import {SafeHtml} from '@angular/platform-browser';

export class Toast {
  header: string;
  body: string | SafeHtml;
  delay?: number;
  autoHide?: boolean;
}
