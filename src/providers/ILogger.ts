// console ve api logger serviceleri provider üzerinden inject edebilmek için farklı tamlı injection token type'lar var
// string token, type token,
// uniqueKey sağlayan injectionToken
// verilecek olan token isimleri unqiue tanımlanmalıdır.

import { InjectionToken } from '@angular/core';

export const Logger = new InjectionToken<ILogger>('logger');

export const ConsoleLogger = new InjectionToken<ILogger>('console-logger');

export interface ILogger {
  log(message: string): void;
}
