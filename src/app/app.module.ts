import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ConsoleLoggerService } from 'src/providers/console-logger.service';
import { ConsoleLogger, Logger } from 'src/providers/ILogger';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { AboutPageComponent } from './pages/about-page/about-page.component';
import { ApiLoggerService } from 'src/providers/api-logger.service';
import { Router } from '@angular/router';

@NgModule({
  declarations: [AppComponent, HomePageComponent, AboutPageComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [
    {
      provide: Logger,
      useClass: ConsoleLoggerService, // bu sınıftan bir instance al
    }, // uygulamadaki componentler Logger injection token üzerinden ConsoleLoggerService ile çalışıyor.
    {
      provide: ConsoleLogger,
      useClass: ConsoleLoggerService,
    },
    {
      provide: 'apiKey',
      useValue: 'deneme1',
    },
    {
      provide: 'IsDevelopment',
      useValue: true, // development mod bazlı bazı servislere uygulamanın karar vermesini sitedik
    },
    {
      // duruma göre service instance almayı sağlayan bir tekniktir.
      provide: Logger,
      useFactory: (isdev: boolean) => {
        console.log('IsDevelopment', isdev);
        return isdev ? new ConsoleLoggerService() : new ApiLoggerService();
      },
      deps: ['IsDevelopment'],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

// Serviceler angular singletonm olarak çalışır fakat
// eğer provider tanımını Root Module üzerine yaparsak bu durumda uygulama genelinde singleton olur.
