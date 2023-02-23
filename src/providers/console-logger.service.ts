import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ILogger } from './ILogger';

@Injectable({
  providedIn: 'root',
})
export class ConsoleLoggerService implements ILogger {
  constructor() {}

  log(message: string): void {
    console.log(`console ${message}`);
  }
}
