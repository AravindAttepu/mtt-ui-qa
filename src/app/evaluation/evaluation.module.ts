import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

import { Routes, RouterModule } from '@angular/router';
import { EvaluationWrapperComponent } from './evaluation-wrapper/evaluation-wrapper.component';
import { EvaluationListComponent } from './evaluation-list/evaluation-list.component';
import { EvaluationPaperComponent } from './evaluation-paper/evaluation-paper.component';
const routes: Routes = [
  {
    path: '',
    component: EvaluationWrapperComponent,
    children: [
      {
        path: 'paper',
        component: EvaluationPaperComponent
      },
      {
        path: 'list',
        component: EvaluationListComponent
      },
      { path: '**', redirectTo: 'paper', pathMatch: 'full' }
    ]
  },
];


@NgModule({
  declarations: [EvaluationWrapperComponent, EvaluationListComponent, EvaluationPaperComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
  ]
})
export class EvaluationModule { }
