import { Component } from '@angular/core';
import * as moment_ from 'moment';

const moment = moment_;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  minDate = moment().add(24, 'hours').toDate();
  maxDate = moment().add(48, 'hours').toDate();

  onSelect(date) {
    console.log('date changed', date);
  }
}
