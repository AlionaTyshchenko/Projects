import { Component, ElementRef, Input, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-inp',
  templateUrl: './inp.component.html',
  styleUrls: ['./inp.component.scss']
})
export class InpComponent {

  firstValue:any
  secondValue:any

  changeInp(){
    const value = {
      first:this.firstValue,
      second:this.secondValue,
    }

    console.log(value)
  }



}
