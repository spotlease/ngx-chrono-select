import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import * as moment from 'moment';
import { Moment } from 'moment';

import { ChronoSelectOverlayRef } from '../chrono-select-overlay-ref/chrono-select-overlay-ref';
import { ChronoDate, ChronoString } from '../chrono-select-containers';

@Component({
  selector: 'ngx-chrono-select-overlay',
  templateUrl: './chrono-select-overlay.component.html',
  styleUrls: ['./chrono-select-overlay.component.scss']
})
export class ChronoSelectOverlayComponent implements OnDestroy {
  dateFormat = 'ddd MMM D';
  hourFormat = 'h';
  meridiemFormat = 'A';

  selectedMoment: Moment;

  selectedDate: ChronoDate;
  selectedHour: ChronoString;
  selectedMeridiem: ChronoString;

  dates: ChronoDate[];
  hours: ChronoString[];
  meridiems: ChronoString[];

  constructor(private chronoSelectOverlayRef: ChronoSelectOverlayRef) {

    this.selectedMoment = moment(chronoSelectOverlayRef.initialDate);

    this.updateComponents();

    this.refreshDates();

    this.hours = [];
    for (let i = 0; i < 12; i++) {
      if (i === 0) {
        this.hours.push(new ChronoString(12));
      } else {
        this.hours.push(new ChronoString(i));
      }
    }

    this.meridiems = [new ChronoString('AM'), new ChronoString('PM')];
  }

  private updateComponents() {
    this.selectedDate = new ChronoDate(this.selectedMoment, this.dateFormat);
    this.selectedHour = new ChronoString(this.selectedMoment.format(this.hourFormat));
    this.selectedMeridiem = new ChronoString(this.selectedMoment.format(this.meridiemFormat));
  }

  refreshDates() {
    this.dates = [];
    for (let i = 0; i < 31; i++) {
      this.dates.push(
        new ChronoDate(this.selectedMoment.clone().add(i - 15, 'days'), this.dateFormat)
      );
    }
  }

  onSelectDate(newDate) {
    this.selectedMoment.year(newDate.year);
    this.selectedMoment.month(newDate.month);
    this.selectedMoment.date(newDate.date);
    this.updateComponents();
    this.refreshDates();
  }

  onSelectHour(newHour) {
    if (this.selectedMoment.hour() < 12) {
      this.selectedMoment.hour(parseInt(newHour, 10) % 12);
    } else {
      this.selectedMoment.hour((parseInt(newHour, 10) % 12) + 12);
    }
    this.updateComponents();
  }

  onSelectMeridiem(newMeridiem) {
    if (newMeridiem.equals(new ChronoString('AM'))) {
      if (this.selectedMoment.hour() >= 12) {
        this.selectedMoment.subtract(12, 'hours');
      }
    } else {
      if (this.selectedMoment.hour() < 12) {
        this.selectedMoment.add(12, 'hours');
      }
    }
    this.updateComponents();
  }

  onDoneClick() {
    this.chronoSelectOverlayRef.dispose();
  }

  ngOnDestroy() {
    this.chronoSelectOverlayRef.afterClose.emit(this.selectedMoment.toDate());
  }
}
