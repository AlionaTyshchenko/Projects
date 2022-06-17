import { Component, ElementRef, Input, OnChanges, Output, SimpleChange, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';

  firstValueNgModel:any
  secondValueNgModel:any
  valuePrisvoit:any
  value2Prisvoit:any
  value222changedInValueHtml:any
  valuechangedInValueHtml:any

  changeInp(){
    this.value2Prisvoit = +this.secondValueNgModel

    this.value222changedInValueHtml = +this.value2Prisvoit *10
    console.log()
  }

  changeInputSec(){
    this.valuePrisvoit = +this.firstValueNgModel
    // this.valuech = this.value *20
    this.valuechangedInValueHtml = this.valuePrisvoit*10
    console.log()

  }

}
