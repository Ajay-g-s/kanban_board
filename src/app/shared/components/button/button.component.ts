import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  @Input() label = '';
  @Input() bgColor = '#5c46dc';
  @Input() color = '#ffff';
  @Input() minWidth = '80px';
  @Input() apiLoader = false;
  @Output() action = new EventEmitter();
}
