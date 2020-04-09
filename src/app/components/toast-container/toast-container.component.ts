import { Component } from '@angular/core';
import {Toast} from '../../models/toast';
import {ToastService} from '../../services/toast.service';

@Component({
  selector: 'app-toast-container',
  templateUrl: './toast-container.component.html',
  styleUrls: ['./toast-container.component.scss']
})
export class ToastContainerComponent {

  constructor(private toastService: ToastService) { }

  getToastHeader(toast: Toast) {
    return toast.header;
  }

  getToastAutohide(toast: Toast) {
    return toast.autoHide || this.toastService.defaultAutoHide;
  }

  getToastCloseDelay(toast: Toast) {
    return toast.delay || this.toastService.defaultDelay;
  }

  getToastType(toast: Toast) {
    if (toast.type === 'light') {
      return '';
    } else {
      return toast.type;
    }
  }

  removeToast(toast: Toast) {
    return this.toastService.remove(toast);
  }

  getToasts() {
    return this.toastService.toasts;
  }

}
