import {
  Component,
  OnInit,
  ViewChild,
  AfterViewChecked,
  Output,
  Input,
  EventEmitter
} from '@angular/core';

@Component({
  selector: 'ngx-chrono-select-drum',
  templateUrl: './chrono-select-drum.component.html',
  styleUrls: ['./chrono-select-drum.component.scss']
})
export class ChronoSelectDrumComponent implements OnInit, AfterViewChecked {
  @ViewChild('wrapper') wrapper;
  @ViewChild('list') list;

  itemsValue: any[];

  @Input()
  get items() {
    return this.itemsValue;
  }
  set items(newItems) {
    if (!newItems) {
      return;
    }
    this.itemsValue = newItems;
    this.setDrum();
  }

  selectedItemValue: any;

  @Input()
  get selectedItem() {
    return this.selectedItemValue;
  }
  set selectedItem(newItem) {
    if (!newItem) {
      return;
    }
    this.selectedItemValue = newItem;
    this.setDrum();
  }

  @Output() select = new EventEmitter();

  selectedIndex: number;

  itemHeight = 40;

  minPanYOffset: number;
  maxPanYOffset: number;
  stablePanYOffset: number;
  movingPanYOffset: number;

  constructor() {
    this.items = [];
    this.minPanYOffset = 0;

    this.stablePanYOffset = 0;
    this.movingPanYOffset = 0;
  }

  private setDrum() {
    if (!this.items || !this.selectedItemValue) {
      return;
    }
    const index = this.itemsValue.findIndex(item => {
      return item.equals(this.selectedItemValue);
    });
    if (index >= 0) {
      this.selectedIndex = index;
      this.movingPanYOffset = this.stablePanYOffset = index * -this.itemHeight;
    }
  }

  ngOnInit() {}

  ngAfterViewChecked() {
    this.minPanYOffset = 0;
    this.maxPanYOffset = -(this.list.nativeElement.clientHeight - this.itemHeight * 4);
  }

  onPanStart(event) {
    this.movingPanYOffset = this.stablePanYOffset;
  }

  onPanEnd(event) {
    this.stablePanYOffset = this.movingPanYOffset;
    this.onChange();
  }

  onPanMove(event) {
    let movingPanYOffset = this.stablePanYOffset + event.deltaY;
    movingPanYOffset = Math.max(this.maxPanYOffset, movingPanYOffset);
    this.movingPanYOffset = Math.min(this.minPanYOffset, movingPanYOffset);
  }

  getTransform() {
    return `translateY(${this.movingPanYOffset}px)`;
  }

  onChange() {
    const index = Math.round(-this.stablePanYOffset / this.itemHeight);
    this.movingPanYOffset = this.stablePanYOffset = index * -this.itemHeight;

    this.selectedIndex = index;
    this.selectedItemValue = this.items[index];
    this.select.emit(this.selectedItemValue);
  }
}
