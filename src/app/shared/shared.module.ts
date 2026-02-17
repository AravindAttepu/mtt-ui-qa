import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoBrandComponent } from './logo-brand/logo-brand.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ServerDownComponent } from './server-down/server-down.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { ReactiveFormsModule, FormsModule} from '@angular/forms';
import {MatTabsModule} from '@angular/material/tabs';
import {MatDialogModule} from '@angular/material/dialog';
import { CommonDeleteWarningDialogComponent } from './common-delete-warning-dialog/common-delete-warning-dialog.component';
import { SafeHtmlPipe } from '../pipes/safeHtml.pipe';
import { CommonAlertSnackComponent } from './snack-bar/snack-bar.component';
import { ChartModule } from 'angular-highcharts';
import {NgxPaginationModule} from 'ngx-pagination';
import { TitleCaseWord } from '../pipes/titleCaseWord';
import { FooterComponent } from '../layout/footer/footer.component';
import { HeaderComponent } from '../layout/header/header.component';
import { Routes, RouterModule } from '@angular/router';
import { HeroImageComponent } from './hero-image/hero-image.component';
import { AddressNavHeaderComponent } from '../layout/address-nav-header/address-nav-header.component';
import { AccordionComponent } from './accordion/accordion.component';
import { AccordionItemComponent } from './accordion/accordion-item.component';
import { LazyLoadImageModule, ScrollHooks } from 'ng-lazyload-image';
import { EventTrackerDirective } from '../directives/event-tracker.directive';
import { SliderLinkComponent } from './slider-link/slider-link.component';
import {NumberDirective} from '../directives/numbers-only.directive';
import { DragAndDropDirective } from '../directives/drag-and-drop.directive';


const routes: Routes = [
];
@NgModule({
  declarations: [
    LogoBrandComponent,
    WelcomeComponent,
    PageNotFoundComponent,
    ServerDownComponent,
    CommonDeleteWarningDialogComponent,
    SafeHtmlPipe,
    TitleCaseWord,
    CommonAlertSnackComponent,
    HeaderComponent,
    FooterComponent,
    HeroImageComponent,
    AddressNavHeaderComponent,
    AccordionComponent,
    AccordionItemComponent,
    EventTrackerDirective,
    SliderLinkComponent,
    NumberDirective,
    DragAndDropDirective
  ],
  imports: [
    CommonModule,
    NgSelectModule,
    ReactiveFormsModule,
    FormsModule,
    MatTabsModule,
    MatDialogModule,
    ChartModule,
    NgxPaginationModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    LogoBrandComponent,
    WelcomeComponent,
    PageNotFoundComponent,
    ServerDownComponent,
    NgSelectModule,
    ReactiveFormsModule,
    FormsModule,
    MatTabsModule,
    MatDialogModule,
    SafeHtmlPipe,
    EventTrackerDirective,
    TitleCaseWord,
    CommonAlertSnackComponent,
    ChartModule,
    NgxPaginationModule,
    HeaderComponent,
    FooterComponent,
    HeroImageComponent,
    AddressNavHeaderComponent,
    AccordionComponent,
    AccordionItemComponent,
    LazyLoadImageModule,
    SliderLinkComponent,
    NumberDirective,
    DragAndDropDirective
  ],
  entryComponents: [
    CommonDeleteWarningDialogComponent
  ]
})
export class SharedModule { }
