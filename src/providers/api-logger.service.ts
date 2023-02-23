import { Injectable } from '@angular/core';
import { ILogger } from './ILogger';

@Injectable({
  providedIn: 'root',
})
export class ApiLoggerService implements ILogger {
  constructor() {}

  // bağımlılığı değiştirirince uygulama davranış değiştirecek.
  log(message: string): void {
    console.log(`api-log ${message}`);
  }
}
