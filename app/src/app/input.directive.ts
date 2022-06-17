import { Directive, ElementRef, HostListener, Input, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appInput]'
})
export class InputDirective  {

  @Input('appSecondInp') valueFrom:any = ''

  @HostListener('keyup', ['$event']) public onKeyup(event: KeyboardEvent): void {
    const value = (event.target as HTMLInputElement).value;
    console.log(value);
  }

}
