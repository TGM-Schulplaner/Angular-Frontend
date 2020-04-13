/*
 * Copyright (c) 2020. tgm - Die Schule der Technik
 *
 *    Licensed under the Apache License, Version 2.0 (the "License");
 *    you may not use this file except in compliance with the License.
 *    You may obtain a copy of the License at
 *
 *        http://www.apache.org/licenses/LICENSE-2.0
 *
 *    Unless required by applicable law or agreed to in writing, software
 *    distributed under the License is distributed on an "AS IS" BASIS,
 *    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *    See the License for the specific language governing permissions and
 *    limitations under the License.
 */

import { Component } from '@angular/core';
import {Toast} from '../../../models/toast';
import {ToastService} from '../../../services/toast.service';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'app-toast-container',
  templateUrl: './toast-container.component.html',
  styleUrls: ['./toast-container.component.scss']
})
export class ToastContainerComponent {

  constructor(private toastService: ToastService) {}

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
