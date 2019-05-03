import { Injectable } from '@angular/core';
import { Ng2IzitoastService } from 'ng2-izitoast';

@Injectable({
  providedIn: 'root'
})
export class AlertifyService {
  constructor(public iziToast: Ng2IzitoastService) {}

  success(message: string) {
    this.iziToast.success({title: 'Success', message});
  }
  warning(message: string) {
    this.iziToast.warning({title: 'Warning', message});
  }
  error(message: string) {
    this.iziToast.error({title: 'Error', message});
  }
}
