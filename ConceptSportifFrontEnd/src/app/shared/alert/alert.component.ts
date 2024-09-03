import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { debounceTime } from 'rxjs/operators';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { AlertService } from 'src/app/servises/alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html'
})
export class AlertComponent implements AfterViewInit {
  @ViewChild('selfClosingAlert', { static: false }) selfClosingAlert: NgbAlert | undefined;
  successMessage: string = '';

  constructor(private alertService: AlertService) {}

  ngAfterViewInit() {
    this.alertService.success$.pipe(debounceTime(3000)).subscribe(message => {
      this.successMessage = message;
      if (this.selfClosingAlert) {
        this.selfClosingAlert.close();
      }
    });
  }
}
