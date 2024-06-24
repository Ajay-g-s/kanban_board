import { Directive, ElementRef, HostListener, Optional } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appNoLeadingSpace]'
})
export class NoLeadingSpaceDirective {

  constructor(
    private el: ElementRef,
    @Optional() private ngControl: NgControl
  ) { }

  @HostListener('input', ['$event']) onInput(event: Event): void {
    const inputValue: string = this.el.nativeElement.value;
    const sanitizedValue = inputValue.trimStart();

    if (inputValue !== sanitizedValue) {
      this.el.nativeElement.value = sanitizedValue;
      if (this.ngControl) {
        this.ngControl.control!.setValue(sanitizedValue);
      }
      event.preventDefault();
    }
  }

}
