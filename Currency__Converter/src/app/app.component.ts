import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ExchangeService } from './exchange.service';
import { ApiRate } from './interfaces';
import { myValidator } from './my.validator';

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
  username?:any
  event$?:EventListener
  valueFrom?: any
  valueTo?:any
  valueRate!:any
  form!: FormGroup
  keysCountry!:any
  rate?: ApiRate
  
  
  countryCode =[
    {name: 'UAH', currencyCode: 980},
    {name:'USD', currencyCode: 840},
    {name: 'EUR', currencyCode: 978}
  ]
  
  selectedValueFrom = this.countryCode[0].name
  selectedValueTo = this.countryCode[1].name
  
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
        value: new FormControl('',),
        currency: new FormGroup( {
          curr: new FormControl(''),
          rate: new FormControl('')
        })
      })
      
      this.keysCountry = this.countryCode.map((item:any) => item.name)
      
    } 
    
    ngOnDestroy(): void {
      this.aSub.unsubscribe()
    }

    changeFrom(value:string) {
      this.selectedValueFrom = value
      this.calcRate()
    }

    changeTo(value:string) {
      this.selectedValueTo = value
      this.calcRate()
    }

    calcRate(){
      if(this.selectedValueFrom === this.selectedValueTo){ 
        return
      } 
      let codeA = this.getCurrencyCode(this.selectedValueFrom)
      let codeB = this.getCurrencyCode(this.selectedValueTo)
      
      this.rate = this.exchangeService.getRate(this.rates, codeA, codeB)
      console.log(this.rate, codeA, codeB)
    }

    getCurrencyCode(name:string) {
      return  this.countryCode.find(item => item.name === name)!.currencyCode;
    }

    exchangeFrom($event:any):any {
      if(this.rate?.rateCross != null) {
        this.valueFrom = $event.target.value * this.rate?.rateCross  
      } else if(this.rate?.rateSell != null) {
        this.valueFrom = $event.target.value * this.rate?.rateSell
      }
      console.log($event.target.value)
    }

    exchangeTo(value:number):any {

    }

    // exchangeTo(rate:any):any{
    //   if(this.euro?.rateBuy){
    //     return this.valueRate = this.value / rate
    //   }
    // }

    // exchangeFrom() {
      
    // }

    //from uah use rateSale
    //to use rateBuy
  // ) {  exchangeService.getCurrencyRate()
  //       .subscribe(rates => {
  //         this.rates = rates
  //         this.euro = rates.find( (x: { ccy: string; buy: string }) => x.ccy  && x.buy =="EUR")
  //         this.usd = rates.find( (x: { ccy: string; }) => x.ccy =="USD")
  //       })

  // }
  // getRate(arr:ApiRate[],ccyApi: string) {
  //   let a = arr!!.find( (x: {ccy:string;} ) => x!.ccy == ccyApi)
  //   return a!!.buy
  // }

}


