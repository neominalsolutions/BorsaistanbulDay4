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
import { NgxPermissionsModule } from 'ngx-permissions';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { FormPageComponent } from './pages/form-page/form-page.component';
import { DemoFormComponent } from './pages/form-page/feature/demo-form/demo-form.component';
import { ReactiveFormsModule } from '@angular/forms';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    AboutPageComponent,
    FormPageComponent,
    DemoFormComponent,
  ],
  imports: [
    ReactiveFormsModule, // reactive form ile çalışmak için
    BrowserModule,
    AppRoutingModule,
    NgxPermissionsModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
    }),
    HttpClientModule,
  ],
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
