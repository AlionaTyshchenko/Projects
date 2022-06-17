import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appSecondInp]'
})
export class SecondInpDirective {

  @HostListener('keyup', ['$event']) public onKeyup(event: KeyboardEvent): void {
    const valueSecond = (event.target as HTMLInputElement).value;
    console.log(valueSecond);
  }

}
