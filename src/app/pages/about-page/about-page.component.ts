import { Component, Inject, OnInit } from '@angular/core';
import { NgxPermissionsService, NgxRolesService } from 'ngx-permissions';
import { ILogger, Logger } from 'src/providers/ILogger';

@Component({
  templateUrl: './about-page.component.html',
  styleUrls: ['./about-page.component.css'],
})
export class AboutPageComponent implements OnInit {
  constructor(
    @Inject(Logger) private loggerService: ILogger,
    @Inject('apiKey') private apiKey: string,
    private ngxPermissionService: NgxPermissionsService,
    private ngxRoleService: NgxRolesService
  ) {}

  ngOnInit(): void {
    this.loggerService.log('about-page-init');
    console.log('api-key', this.apiKey);

    console.log('perms', this.ngxPermissionService.getPermissions());
    this.ngxRoleService.addRole('ADMIN', ['create-script', 'backup-db']);
    console.log('roles', this.ngxRoleService.getRoles());
  }
}
