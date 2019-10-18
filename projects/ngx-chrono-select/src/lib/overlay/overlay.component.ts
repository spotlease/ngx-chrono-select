import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import * as moment_ from 'moment';
import { Moment } from 'moment';

import { NgxChronoSelectOverlayRef } from '../overlay-ref/overlay-ref';
import { ChronoDate, ChronoString } from '../containers';

const moment = moment_;

@Component({
  selector: 'ngx-chrono-select-overlay',
  templateUrl: './overlay.component.html',
  styleUrls: ['./overlay.component.scss']
})
export class NgxChronoSelectOverlayComponent implements OnDestroy {
  dateFormat = 'ddd MMM D';
  hourFormat = 'h';
  meridiemFormat = 'A';

  minMoment: Moment;
  maxMoment: Moment;
  selectedMoment: Moment;

  selectedDate: ChronoDate;
  selectedHour: ChronoString;
  selectedMeridiem: ChronoString;

  dates: ChronoDate[];
  hours: ChronoString[];
  meridiems: ChronoString[];

  constructor(private chronoSelectOverlayRef: NgxChronoSelectOverlayRef) {
    this.selectedMoment = moment(chronoSelectOverlayRef.initialDate);
    if(chronoSelectOverlayRef.minDate) {
      this.minMoment = moment(chronoSelectOverlayRef.minDate);
      if(this.minMoment > this.selectedMoment) {
        this.selectedMoment = this.minMoment.clone();
      }
    }
    if(chronoSelectOverlayRef.maxDate) {
      this.maxMoment = moment(chronoSelectOverlayRef.maxDate);
      if(this.maxMoment < this.selectedMoment) {
        this.selectedMoment = this.maxMoment.clone();
      }
    }

    this.updateComponents();

    this.refreshDates();

    this.refreshMeridiems();

    this.refreshHours();
  }

  private updateComponents() {
    this.selectedDate = new ChronoDate(this.selectedMoment, this.dateFormat);
    this.selectedHour = new ChronoString(this.selectedMoment.format(this.hourFormat));
    this.selectedMeridiem = new ChronoString(this.selectedMoment.format(this.meridiemFormat));
  }

  refreshDates() {
    this.dates = [];
    for (let i = 0; i < 31; i++) {
      let date = this.selectedMoment.clone().add(i - 15, 'days');
      let testMin = !this.minMoment || date >= this.minMoment;
      let testMax = !this.maxMoment || date <= this.maxMoment;
      if(testMin && testMax) {
        this.dates.push(
          new ChronoDate(date, this.dateFormat)
        );
      }
    }
  }

  refreshHours() {
    this.hours = [];

    let isMinDay = this.minMoment && this.selectedMoment.isSame(this.minMoment, 'date');
    let isMinMeridiem = this.minMoment && !(this.selectedMoment.format(this.meridiemFormat) === 'PM' && this.minMoment.format(this.meridiemFormat) === 'AM')
    let minHour: number;
    if(isMinDay && isMinMeridiem) {
      minHour = this.minMoment.hour() % 12;
    }

    let isMaxDay = this.maxMoment && this.selectedMoment.isSame(this.maxMoment, 'date');
    let isMaxMeridiem = this.maxMoment && !(this.selectedMoment.format(this.meridiemFormat) === 'AM' && this.maxMoment.format(this.meridiemFormat) === 'PM')
    let maxHour: number;
    if(isMaxDay && isMaxMeridiem) {
      maxHour = this.maxMoment.hour() % 12;
    }

    for (let i = 0; i < 12; i++) {
      if(minHour && i < minHour) {
        continue;
      }
      if(maxHour && i > maxHour) {
        continue;
      }
      if (i === 0) {
        this.hours.push(new ChronoString(12));
      } else {
        this.hours.push(new ChronoString(i));
      }
    }
  }

  refreshMeridiems() {
    this.meridiems = [];

    let isMinDay = this.minMoment && this.selectedMoment.isSame(this.minMoment, 'date');

    if(!(isMinDay && this.minMoment.format(this.meridiemFormat) === 'PM')) {
      this.meridiems.push(new ChronoString('AM'));
    }

    let isMaxDay = this.maxMoment && this.selectedMoment.isSame(this.maxMoment, 'date');

    if(!(isMaxDay && this.maxMoment.format(this.meridiemFormat) === 'AM')) {
      this.meridiems.push(new ChronoString('PM'));
    }

  }

  onSelectDate(newDate) {
    this.selectedMoment.year(newDate.year);
    this.selectedMoment.month(newDate.month);
    this.selectedMoment.date(newDate.date);
    this.updateComponents();
    this.refreshDates();
    this.refreshMeridiems();
    this.refreshHours();
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
    this.refreshHours();
  }

  onDoneClick() {
    this.chronoSelectOverlayRef.dispose();
  }

  ngOnDestroy() {
    this.chronoSelectOverlayRef.afterClose.emit(this.selectedMoment.toDate());
  }
}
