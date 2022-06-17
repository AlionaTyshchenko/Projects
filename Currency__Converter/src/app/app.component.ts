import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { CheckboxControlValueAccessor, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ExchangeService } from './services/exchange.service';
import { ApiRate, Country } from './interfaces';

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
  form!: FormGroup
  keysCountry!: Array<string>
  rate?: ApiRate    
  
  firstValue?: any
  secondValue?:any
  inputFirstValue:any
  inputSecondValue:any
  changedInputFirst:any
  changedInputSecond:any


  countries: Country[]=[
    {name: 'UAH', currencyCode: 980},
    {name:'USD', currencyCode: 840},
    {name: 'EUR', currencyCode: 978}
  ]
  
  countryCodeFirst = this.countries[0].name
  countryCodeSecond = this.countries[1].name

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
      })
      
      this.form = new FormGroup({
        inputValue: new FormControl('', Validators.pattern('[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)')),
      })
      
      this.keysCountry = this.countries.map((item:any) => item.name)
    } 
    
    ngOnDestroy(): void {
      this.aSub.unsubscribe()
    }

    getFirstSelectedCodeCountry(value:string) {
      this.countryCodeFirst = value
      this.calcRate()
      this.exchangeCurrencyForPurchase()
    }

    getSecondSelectedCodeCountry(value:string) {
      this.countryCodeSecond = value
      this.calcRate()
      this.exchangeCurrencyForPurchase()
    }

    calcRate(){
      if(this.countryCodeFirst === this.countryCodeSecond){ 
        return
      } 
      let codeA = this.getCurrencyCode(this.countryCodeFirst)
      let codeB = this.getCurrencyCode(this.countryCodeSecond)
      
      this.rate = this.exchangeService.getRate(this.rates, codeA, codeB)
    }
  
    getCurrencyCode(name:string) {
      return  this.countries.find(item => item.name === name)!.currencyCode;
    }

    exchangeCurrencyForPurchase(){
      this.inputFirstValue = +this.firstValue

      if( !isNaN(this.inputFirstValue) ){

        if(this.countryCodeFirst === this.countryCodeSecond){
        this.changedInputFirst = this.inputFirstValue
        return
        }
        if(this.rate?.rateSell != null && this.rate?.rateBuy != null) {

          if(this.rate.currencyCodeA === this.getCurrencyCode(this.countryCodeFirst) ) {
            this.changedInputFirst = (this.inputFirstValue  * this.rate?.rateBuy).toFixed(4)
          } else {
            this.changedInputFirst = (this.inputFirstValue  / this.rate?.rateSell).toFixed(4)
          }
        }
      }else {
        this.inputFirstValue = ''
      }
    }

    exchangeCurrencyForSale(){
      this.inputSecondValue = +this.secondValue

      if( !isNaN(this.inputSecondValue) ){

        if(this.countryCodeFirst === this.countryCodeSecond){
          this.changedInputSecond = this.inputSecondValue
          return
        }
        if(this.rate?.rateSell != null && this.rate?.rateBuy != null) {

          if(this.rate.currencyCodeA == this.getCurrencyCode(this.countryCodeFirst)){
            this.changedInputSecond = (this.inputSecondValue / this.rate.rateBuy).toFixed(4)
          } else {
            this.changedInputSecond= (this.inputSecondValue * this.rate?.rateSell).toFixed(4)
          }
        } 
      } else{
        this.inputSecondValue = ''
      }
    }
}


