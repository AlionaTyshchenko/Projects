import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, switchMap } from 'rxjs';
import { ApiRate, Country } from './interfaces';


@Injectable({
  providedIn: 'root'
})
export class ExchangeService {
  

  constructor( 
    private http:HttpClient
  ) { }

  getCurrencyRate(): Observable<ApiRate[]> {
    return this.http
        .get<ApiRate[]>('https://api.monobank.ua/bank/currency')
  }

  getRate(arr:ApiRate[], codeA:number, codeB: number) {
    let rate = arr.find( (item:any) => item.currencyCodeA === codeA && item.currencyCodeB === codeB)
    
    if(rate != null) {
      return rate
    }
    return arr.find( (item:any) => item.currencyCodeA === codeB && item.currencyCodeB === codeA)
  }
}



