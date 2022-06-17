import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { InpComponent } from './inp/inp.component';
import { InputDirective } from './input.directive';
import { SecondInpDirective } from './second-inp.directive';

@NgModule({
  declarations: [
    AppComponent,
    InpComponent,
    InputDirective,
    SecondInpDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
