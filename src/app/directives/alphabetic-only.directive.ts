import { Directive, HostListener, Optional, Self } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appAlphabeticOnly]'
})
export class AlphabeticOnlyDirective {

  constructor(@Optional() @Self() private ngControl: NgControl) { }

  @HostListener('input', ['$event'])
  onInput(event: any): void {
    console.log(event, "eee")
    let input = event.target.value;
    // Check if the first character is a space
    if (input.trim() === '' || (input.length > 0 && input.trim()[0] === ' ')) {
      input = input.substring(1);
    } const sanitizedValue = input.replace(/[^a-zA-Z\s]/g, '');

    // Update the input value
    this.writeValue(sanitizedValue);
  }

  @HostListener('paste', ['$event'])
  onPaste(event: any): void {
    // Get pasted text from the event
    const pastedText = (event.clipboardData || event.originalEvent.clipboardData).getData('text') || '';

    // Check if pasted text starts with a space
    if (pastedText.trim() === '' || pastedText.trim()[0] === ' ') {
      // If the pasted text starts with a space or is empty, remove the space
      const sanitizedValue = pastedText.trim().substring(1);

      // Set the sanitized value back to the input
      this.writeValue(sanitizedValue);

      // Prevent the default paste behavior
      event.preventDefault();
    } else {
      // Remove any non-alphabetic characters and spaces from the pasted text
      const sanitizedValue = pastedText.replace(/[^a-zA-Z\s]/g, '');

      // Set the sanitized value back to the input
      this.writeValue(sanitizedValue);

      // Prevent the default paste behavior
      event.preventDefault();
    }
  }


  private writeValue(value: any): void {
    if (this.ngControl) {
      this.ngControl?.control?.setValue(value);
    }
  }
}
