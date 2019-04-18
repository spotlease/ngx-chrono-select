import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  minDate = new Date();

  onSelect(date) {
    console.log('date changed', date);
  }
}
