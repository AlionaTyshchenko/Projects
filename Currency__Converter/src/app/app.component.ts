import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ExchangeService } from './services/exchange.service';
import { ApiRate } from './interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  implements OnInit, OnDestroy{

  rates!: ApiRate[]
  usd?: ApiRate
  euro?: ApiRate
  aSub!:Subscription
  valueRate!:any
  form!: FormGroup
  keysCountry!:any
  rate?: ApiRate  
  $event:any
  
  
  
  firstValue?: any
  secondValue?:any
  inputFirstValue:any
  inputSecondValue:any
  changedInputFirst:any
  changedInputSecond:any


  countryCode =[
    {name: 'UAH', currencyCode: 980},
    {name:'USD', currencyCode: 840},
    {name: 'EUR', currencyCode: 978}
  ]
  
  countryCodeFirst = this.countryCode[0].name
  countryCodeSecond = this.countryCode[1].name
  
  constructor(
    private exchangeService: ExchangeService
    ){}
    
    ngOnInit() {
      this.aSub = this.exchangeService.getCurrencyRate()
      .subscribe(res => {
        this.rates = res;
        this.usd = this.exchangeService.getRate(this.rates, this.getCurrencyCode('USD'), this.getCurrencyCode('UAH'))
        this.euro = this.exchangeService.getRate(this.rates, this.getCurrencyCode('EUR'), this.getCurrencyCode('UAH'))
        this.calcRate()
        console.log(this.usd?.rateSell)
      })
      
      this.form = new FormGroup({
        valueFrom: new FormControl('', Validators.pattern('/[0-9\ ]/')),
        valueTo:new FormControl('', Validators.pattern('/[0-9\ ]/'))

      })
      
      this.keysCountry = this.countryCode.map((item:any) => item.name)
    } 
    
    ngOnDestroy(): void {
      this.aSub.unsubscribe()
    }

    changeFrom(value:string) {
      this.countryCodeFirst = value
      this.calcRate()
      this.exchangeFrom()
    }

    changeTo(value:string) {
      this.countryCodeSecond = value
      this.calcRate()
      this.exchangeFrom()
    }

    calcRate(){
      if(this.countryCodeFirst === this.countryCodeSecond){ 
        return
      } 
      let codeA = this.getCurrencyCode(this.countryCodeFirst)
      let codeB = this.getCurrencyCode(this.countryCodeSecond)
      
      this.rate = this.exchangeService.getRate(this.rates, codeA, codeB)
      console.log(this.rate, codeA, codeB)
    }

    getCurrencyCode(name:string) {
      return  this.countryCode.find(item => item.name === name)!.currencyCode;
    }

    exchangeFrom(){
      this.inputFirstValue = +this.firstValue
      console.log(this.countryCodeFirst, this.countryCodeSecond)

      if(this.countryCodeFirst === this.countryCodeSecond){
        this.changedInputFirst = this.inputFirstValue
        return
      }
        if(this.rate?.rateSell != null) {

          if(this.rate.currencyCodeA === this.getCurrencyCode(this.countryCodeFirst) ) {
            this.changedInputFirst = this.inputFirstValue  * this.rate?.rateSell
          } else {
            this.changedInputFirst = this.inputFirstValue  / this.rate?.rateSell
          }
        } 
    }

    exchangeTo(){
      this.inputSecondValue = +this.secondValue

      if(this.countryCodeFirst === this.countryCodeSecond){
        this.changedInputSecond = this.inputSecondValue
        return
      }
      if(this.rate?.rateSell != null) {

         if(this.rate.currencyCodeA == this.getCurrencyCode(this.countryCodeFirst)){
          this.changedInputSecond = this.inputSecondValue / this.rate.rateSell
         } else {
          this.changedInputSecond= this.inputSecondValue * this.rate?.rateSell
         }

      } 

    }
    // exchangeTo($event:any) {
    //   console.log($event.target.value)
    //   if(this.rate?.rateCross != null) {
    //     this.valueTo = $event.target.value * this.rate?.rateCross  
    //   } else if(this.rate?.rateBuy != null) {
    //     this.valueTo = $event.target.value * this.rate?.rateBuy

    //       if(this.selectedValueTo === this.selectedValueTo ) {
    //         this.valueTo = $event.target.value / this.rate?.rateBuy
    //       } 
    //     } 
    //   }

    // exchangeTo($event: any) {
    //   if(this.rate?.rateCross != null) {
    //         this.valueTo = $event.target.value * this.rate?.rateCross  
    //         console.log(this.valueTo)
    //       }
    // }
}


