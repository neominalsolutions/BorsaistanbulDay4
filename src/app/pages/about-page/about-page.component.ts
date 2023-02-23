import { Component, Inject, OnInit } from '@angular/core';
import { ILogger, Logger } from 'src/providers/ILogger';

@Component({
  templateUrl: './about-page.component.html',
  styleUrls: ['./about-page.component.css'],
})
export class AboutPageComponent implements OnInit {
  constructor(
    @Inject(Logger) private loggerService: ILogger,
    @Inject('apiKey') private apiKey: string
  ) {}

  ngOnInit(): void {
    this.loggerService.log('about-page-init');
    console.log('api-key', this.apiKey);
  }
}
