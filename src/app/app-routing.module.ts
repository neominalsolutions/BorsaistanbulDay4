import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgxPermissionsGuard } from 'ngx-permissions';
import { AboutPageComponent } from './pages/about-page/about-page.component';
import { DemoFormComponent } from './pages/form-page/feature/demo-form/demo-form.component';
import { FormPageComponent } from './pages/form-page/form-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
  },
  {
    path: 'form',
    component: FormPageComponent,
  },
  {
    path: 'about',
    component: AboutPageComponent,
    canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        // about page sayfasına sadece admin permission sahip olanlar girebilir.
        only: 'home-write',
      },
    },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
