import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideNavComponent } from './side-nav/side-nav.component';
import { WebcamModule } from 'ngx-webcam';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { LayoutWrapperComponent } from './layout-wrapper/layout-wrapper.component';
import { AdminHeaderComponent } from './admin-header/admin-header.component';
import { AdminLandingComponent } from './admin-landing/admin-landing.component';
import { StudentEditComponent } from './student-edit/student-edit.component';
import { StudentVerificationComponent } from './student-verification/student-verification.component';
import { StudentModalComponent } from './student-modal/student-modal.component';
import { RoleManagementComponent } from './role-management/role-management.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { StudentStatsComponent } from './student-stats/student-stats.component';
import { ComputeFinalResultsComponent } from './compute-final-results/compute-final-results.component';
import { ManageSchoolsComponent } from './manage-schools/manage-schools.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutWrapperComponent,
    children: [
      {
        path: 'landing',
        component: AdminLandingComponent,
      },
      {
        path: 'student-edit',
        component: StudentEditComponent,
      },
      {
        path: 'student-verification',
        component: StudentVerificationComponent,
      },
      {
        path: 'manage-schools',
        component: ManageSchoolsComponent,
      },
      {
        path: 'role-management',
        component: RoleManagementComponent,
      },
      {
        path: 'user-management',
        component: UserManagementComponent,
      },
      {
        path: 'student-stats',
        component: StudentStatsComponent,
      },
      {
        path: 'compute-final-results',
        component: ComputeFinalResultsComponent,
      },
      {
        path: 'paper-upload',
        loadChildren: () =>
          import('../paper-upload/paper-upload.module').then(
            (m) => m.PaperUploadModule
          ),
      },
      {
        path: 'evaluation',
        loadChildren: () =>
          import('../evaluation/evaluation.module').then(
            (m) => m.EvaluationModule
          ),
      },
      {
        path: 'papers',
        loadChildren: () =>
          import('../papers/papers.module').then((m) => m.PapersModule),
      },
      {
        path: 'features',
        loadChildren: () =>
          import('../image-upload/image-upload.module').then(
            (m) => m.ImageUploadModule
          ),
      },
      {
        path: 'gallery-upload',
        loadChildren: () =>
          import('../image-upload/image-upload.module').then(
            (m) => m.ImageUploadModule
          ),
      },
      {
        path: 'status',
        loadChildren: () =>
          import('../image-upload/image-upload.module').then(
            (m) => m.ImageUploadModule
          ),
      },
    ],
  },
];

@NgModule({
  declarations: [
    SideNavComponent,
    LayoutWrapperComponent,
    AdminHeaderComponent,
    AdminLandingComponent,
    StudentEditComponent,
    StudentVerificationComponent,
    StudentModalComponent,
    RoleManagementComponent,
    UserManagementComponent,
    StudentStatsComponent,
    ComputeFinalResultsComponent,
    ManageSchoolsComponent
  ],
  entryComponents: [StudentModalComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    WebcamModule
  ],
  exports: [SideNavComponent, AdminHeaderComponent],
})
export class LayoutModule {}
