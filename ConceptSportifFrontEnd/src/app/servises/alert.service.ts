import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private _success = new Subject<string>();

  get success$() {
    return this._success.asObservable();
  }

  showSuccessMessage(message: string) {
    this._success.next(message);
  }
}
