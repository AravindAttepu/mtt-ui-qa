import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { GATEMOURoutingModule } from './gate-mou-routing.module';
import { GATEMOUComponent } from './gate-mou/gate-mou.component';
import { GATEMOUHomeComponent } from './gate-mou-home/gate-mou-home.component';


@NgModule({
  declarations: [GATEMOUComponent, GATEMOUHomeComponent],
  imports: [
    CommonModule,
    SharedModule,
    GATEMOURoutingModule
  ]
})
export class GATEMOUModule { }
