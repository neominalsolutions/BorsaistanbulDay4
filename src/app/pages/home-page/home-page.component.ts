import { Component, Inject } from '@angular/core';
import { ILogger, Logger } from 'src/providers/ILogger';

@Component({
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent {
  constructor(@Inject(Logger) private loggerService: ILogger) {}

  ngOnInit(): void {
    this.loggerService.log('home-page-init');
  }
}
