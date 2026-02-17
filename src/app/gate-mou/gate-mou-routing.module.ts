import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GATEMOUComponent } from './gate-mou/gate-mou.component';

import { GATEMOUHomeComponent } from './gate-mou-home/gate-mou-home.component';

const routes: Routes = [
  {
    path: '',
    component: GATEMOUComponent, // base layout or wrapper
    children: [

          { path: 'home', component: GATEMOUHomeComponent },
       { path: '', redirectTo: 'home', pathMatch: 'full' }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GATEMOURoutingModule { }
