import { Component, Inject } from '@angular/core';
import { NgxPermissionsService } from 'ngx-permissions';
import { ILogger, Logger } from 'src/providers/ILogger';

@Component({
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent {
  constructor(
    @Inject(Logger) private loggerService: ILogger,
    private ngxPermissionService: NgxPermissionsService
  ) {}

  ngOnInit(): void {
    this.loggerService.log('home-page-init');

    // login olduktan sonra artık apidan bütün permission role bilgileri çekip permissionları sisteme tanıtmamız lazım

    //ilk load aşamasında sistem tanıtıyoruz.
    // behavior subject
    // bu permissionlara sanki session ile çalışır gibi erişebiliriz.
    this.ngxPermissionService.loadPermissions([
      'home-read',
      'home-write',
      'contact-form',
    ]);
  }
}
