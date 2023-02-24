import { Component, Inject, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ApiLoggerService } from 'src/providers/api-logger.service';
import { ConsoleLoggerService } from 'src/providers/console-logger.service';
import { ConsoleLogger, ILogger, Logger } from 'src/providers/ILogger';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [{ provide: Logger, useClass: ApiLoggerService }], // burası her zaman root ovveride eder.
  // her component instance alındığında provider instance component ile beraber alınır.
})
export class AppComponent implements OnInit {
  title = 'AngularProviders';
  // root da tanımlı olan servis eğer component providers kısmında da tanımlıysa component provider kısmındaki tanım root dosyasını ezer.

  // nesnenin direk bağımlılığı oluyor.
  // logger: ILogger = new ApiLoggerService();

  constructor(
    //@Inject(ConsoleLogger) private loggerService: ConsoleLoggerService,
    //@Inject('IsDevelopment') private isDev: string,
    @Inject(Logger) private lg: ILogger,
    private translate: TranslateService
  ) {}

  onLangChange(event: any) {
    this.translate.use(event.target.value); // tr en
    // dil değişimini yapacak bir event
    this.translate.onLangChange.subscribe((lng) => {
      console.log('dil-değişti', lng);
      const value = this.translate.instant('hello');
      console.log('value', value);
    });
  }

  ngOnInit(): void {
    //this.loggerService.log('app-component-init');
    //console.log('isDev', this.isDev);

    // hangi dilleri uygulama destekleyecek
    // default olarak dil tanımı yaptık

    this.translate.addLangs(['en', 'tr']);
    this.translate.use('tr'); // default türkçe olarak ayarlansın

    // ts tarafından dil değeri okumak için aşağıdaki kullanımı yapabiliriz.

    this.lg.log('component-logger');
  }
}
