import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-custom-filter',
  templateUrl: './custom-filter.component.html',
  styleUrls: ['./custom-filter.component.scss']
})
export class CustomFilterComponent {
  @Input() filterForm: FormGroup | any;
  @Output() applyFilter = new EventEmitter();
  @Output() clearFilter = new EventEmitter();
  @Input()
  set openDrawer(val: any) {
    if (val) {
      this.openSideDrawer();
    } else {
      this.closeDrawer();
    }
  }
  openSideDrawer() {
    const element = document.getElementById('mySidenav');
    if (element) {
      if (window.innerWidth >= 768 && window.innerWidth <= 1000) {
        element.style.width = '50vw';
      }
      if (window.innerWidth >= 1001 && window.innerWidth <= 1227) {
        element.style.width = '30vw';
      }
      if (window.innerWidth >= 1228) {
        element.style.width = '21vw';
      }
    }
  }
  closeDrawer() {
    const element = document.getElementById('mySidenav');
    element && (element.style.width = '0px');
  }
  close() {
    const element = document.getElementById('mySidenav');
    element && (element.style.width = '0px');
    this.clearFilter.emit();
  }
}
