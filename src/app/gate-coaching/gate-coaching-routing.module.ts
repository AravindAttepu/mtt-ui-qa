import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GateCoachingComponent } from './gate-coaching/gate-coaching.component';
import { ResultComponent } from './result/result.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { GateCoachingHomeComponent } from './gate-coaching-home/gate-coaching-home.component';
const routes: Routes = [
  {
    path: '',
    component: GateCoachingComponent, // base layout or wrapper
    children: [
      { path: 'result', component: ResultComponent },
      { path: 'notifications', component: NotificationsComponent},
          { path: 'home', component: GateCoachingHomeComponent },
       { path: '', redirectTo: 'home', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GateCoachingRoutingModule { }
