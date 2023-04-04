import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Notify } from '../models/notification.models';

@Injectable()
export class NotificationService {
  notification$ = new BehaviorSubject<Notify | null>(null);
  handleError(message: string) {
    this.notification$.next({ severity: 'error', message });
  }
  handleSuccess(message: string) {
    this.notification$.next({ severity: 'success', message });
  }
  clear() {
    this.notification$.next(null);
  }
  constructor() {}
}
