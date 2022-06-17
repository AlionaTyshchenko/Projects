import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule} from '@angular/common/http'

import { AppComponent } from './app.component';
import { ExchangeService } from './services/exchange.service';
import { ExchangeRateService } from './services/exchange-rate.service';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
  BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [ExchangeService, ExchangeRateService],
  bootstrap: [AppComponent]
})
export class AppModule { }
