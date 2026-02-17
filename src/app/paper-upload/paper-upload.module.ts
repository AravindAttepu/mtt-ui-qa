import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NewImageUploadComponent } from './new-image-upload.component';
import { WebcamImage, WebcamInitError, WebcamModule } from "ngx-webcam";
const routes: Routes = [
  {
    path: '',
    component: NewImageUploadComponent,
  },
];
@NgModule({
  declarations: [
    NewImageUploadComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    WebcamModule,
  ]
})
export class PaperUploadModule { }
