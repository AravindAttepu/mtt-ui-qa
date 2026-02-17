import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StyleGuideComponent } from './style-guide/style-guide.component';
import { CanActiveRouterGuardService } from './can-active-router-guard.service';
import { TermsAndConditionsComponent } from './login/terms-and-conditions/terms-and-conditions.component';
import { ForgotPswResponseComponent } from './login/forgot-psw/forgot-psw-response/forgot-psw-response.component'; // Import the new component


const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./layout/layout.module').then(m => m.LayoutModule),
  },
  {
    path: '',
    loadChildren: () => import('./website/website.module').then(m => m.WebsiteModule)
  },
  {
    path: 'style-guide',
    component: StyleGuideComponent
  },
  {
    path: 'terms-and-conditions',
    component: TermsAndConditionsComponent
  },

  {
    path: 'forgot-psw-response',
    component: ForgotPswResponseComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled',
    scrollPositionRestoration: 'enabled',
    anchorScrolling: 'enabled'
  })],

  exports: [RouterModule]
})
export class AppRoutingModule { }
