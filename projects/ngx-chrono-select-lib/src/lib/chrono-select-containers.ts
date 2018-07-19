import { Moment } from 'moment';
import * as moment from 'moment';

export class ChronoDate {
  date: number;
  month: number;
  year: number;
  format: string;

  constructor(momentInstance: Moment, format: string) {
    this.date = momentInstance.date();
    this.month = momentInstance.month();
    this.year = momentInstance.year();
    this.format = format;
  }

  valueOf() {
    return moment(new Date(this.year, this.month, this.date));
  }

  equals(other: ChronoDate) {
    if (!other) {
      return false;
    }
    return this.valueOf().isSame(other.valueOf());
  }

  toString() {
    return this.valueOf().format(this.format);
  }
}

export class ChronoString {
  value: string;

  constructor(value: string | number) {
    this.value = value.toString();
  }

  valueOf() {
    return this.value;
  }

  equals(other: ChronoString) {
    if (!other) {
      return false;
    }
    return this.value === other.valueOf();
  }

  toString() {
    return this.valueOf();
  }
}
