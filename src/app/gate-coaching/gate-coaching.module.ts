import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { GateCoachingRoutingModule } from './gate-coaching-routing.module';
import { GateCoachingComponent } from './gate-coaching/gate-coaching.component';
import { ResultComponent } from './result/result.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { GateCoachingHomeComponent } from './gate-coaching-home/gate-coaching-home.component';



@NgModule({
  declarations: [GateCoachingComponent, ResultComponent, NotificationsComponent, GateCoachingHomeComponent],
  imports: [
    CommonModule,
     SharedModule,
    GateCoachingRoutingModule
  ]
})
export class GateCoachingModule { }
