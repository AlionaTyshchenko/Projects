import { NgModule, Provider } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from './admin/shared/shared.module';
import uaLocale from '@angular/common/locales/ru-UA'
import { registerLocaleData } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { MainLayoutComponent } from './shared/components/main-layout/main-layout.component';
import { PostPageComponent } from './post-page/post-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { PostComponent } from './admin/shared/components/post/post.component';
import { AuthInterceptor } from './admin/shared/components/services/auth.interceptor';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

registerLocaleData(uaLocale,'ua')

const INTERCEPTOR_Provider: Provider ={
  provide:HTTP_INTERCEPTORS,
  multi: true,
  useClass: AuthInterceptor
}

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    PostPageComponent,
    HomePageComponent,
    PostComponent
  ],
  imports: [
  BrowserModule,
    AppRoutingModule,
    SharedModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [INTERCEPTOR_Provider],
  bootstrap: [AppComponent]
})
export class AppModule { }
