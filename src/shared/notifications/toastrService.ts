/*
WRAPPER AROUND THE TOASTR SERVICE
*/

import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { reject } from 'q';
import { resolve } from 'url';

@Injectable()
export class NotifyService {
  constructor(private toastr: ToastrService) {}

  info(message: string) {
    this.toastr.info(message);
  }

  warning(message: string) {
    this.toastr.warning(message);
  }

  async error(message: string) {
    return new Promise<any>((resolve, reject) => {
      resolve(this.toastr.error(message));
    });
  }

  success(message: string) {
    this.toastr.success(message);
  }
}
