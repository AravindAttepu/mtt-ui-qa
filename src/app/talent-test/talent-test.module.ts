import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { TalentTestWrapperComponent } from './telent-test-wrapper/telent-test-wrapper.component';
import { SharedModule } from '../shared/shared.module';
import { NotificationsComponent } from './notifications/notifications.component';
import { PreviousPapersComponent } from './previous-papers/previous-papers.component';
import { FinalResultsComponent } from './final-results/final-results.component';
import { PapersMenuListComponent } from './papers-menu-list/papers-menu-list.component';
import { RegistrationComponent } from './registration/registration.component';
import { TalentTestHomeComponent } from './talent-test-home/talent-test-home.component';


const routes: Routes = [
  {
    path: '',
    component: TalentTestWrapperComponent,
    children: [
       {
              path: '',
              component: TalentTestHomeComponent,
              data: { title: 'Talent Test Home' }
         },
      {
        path: 'notifications',
        component: NotificationsComponent,
        data: {
          title: 'Notifications',
          description:' Notifications',
          keywords:'Sadisha,Right Direction, NGO, Notifications, Math Talent Test, Free Intermediate Education, ZP schools, Government schools, TSMS, ZPHS'
        }
      },
      {
        path: 'register',
        component: RegistrationComponent
      },
      {
        path: 'previous-papers',
        component: PreviousPapersComponent,
        data: {
          title: 'Previous Papers',
          description:' Previous year papers and practice tests',
          keywords:'Sadisha,Right Direction, NGO, Previous Papers, Practice Tests, Previous year papers, math, mathematics, aptitude, problems, 10th grade, high school, puzzles'
        }
      },
      {
        path: 'previous-papers/:paper',
        component: PreviousPapersComponent,
        data: {
          title: 'Previous Papers',
          description:' Previous year papers and practice tests',
          keywords:'Sadisha,Right Direction, NGO, Previous Papers, Practice Tests, Previous year papers, math, mathematics, aptitude, problems, 10th grade, high school, puzzles'
        }
      },
      {
        path: 'final-results',
        component: FinalResultsComponent,
        data: {
          title: 'Final Results',
          description:' Final results of previous year paper',
          keywords:'Sadisha,Right Direction, NGO, Final Results, Students,  Math Talent Test, 2021, Karimnagar, Warangal, Khammam, Nanded'
        }
      },
      { path: '**', redirectTo: 'previous-papers', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  declarations: [
    TalentTestWrapperComponent,
    NotificationsComponent,
    PreviousPapersComponent,
    FinalResultsComponent,
    PapersMenuListComponent,
    RegistrationComponent,
    TalentTestHomeComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,

  ],
  exports: [
  ]
})

export class TalentTestModule { }
