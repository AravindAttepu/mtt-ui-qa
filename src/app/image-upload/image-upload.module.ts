import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImagesPreviewListComponent } from './images-preview-list/images-preview-list.component';
import { ImagesUploadWrapperComponent } from './images-upload-wrapper/images-upload-wrapper.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NewImageUploadComponent } from './new-image-upload/new-image-upload.component';
const routes: Routes = [
  {
    path: '',
    component: ImagesUploadWrapperComponent,
  },
];
@NgModule({
  declarations: [
    ImagesPreviewListComponent,
    ImagesUploadWrapperComponent,
    NewImageUploadComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
  ]
})
export class ImageUploadModule { }
