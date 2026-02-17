import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AnimateOnScrollModule } from "ng2-animate-on-scroll";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { StyleGuideComponent } from "./style-guide/style-guide.component";
import { LayoutModule } from "./layout/layout.module";
import { SharedModule } from "./shared/shared.module";
import { ServiceWorkerModule } from "@angular/service-worker";
import { environment } from "../environments/environment";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ApiService } from "./api.service";
import { HttpClientModule } from "@angular/common/http";
import { CanActiveRouterGuardService } from "./can-active-router-guard.service";
import { TermsAndConditionsComponent } from "./login/terms-and-conditions/terms-and-conditions.component";
import { ForgotPswResponseComponent } from "./login/forgot-psw/forgot-psw-response/forgot-psw-response.component";
import { CookieService } from "ngx-cookie-service";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { NgbModule, NgbCarouselModule } from "@ng-bootstrap/ng-bootstrap";
import { SEOService } from "./seo.service";
import { WebcamModule } from "ngx-webcam";
import { NgSelectModule } from '@ng-select/ng-select';
// import { StudentDetailsComponent } from "./website/pages/student-details/student-details.component";

@NgModule({
  declarations: [
    AppComponent,
    StyleGuideComponent,
    TermsAndConditionsComponent,
    ForgotPswResponseComponent,

    // StudentDetailsComponent,
  ],
  imports: [
    WebcamModule,
    BrowserModule.withServerTransition({
      appId: 'my-app-id'   // withServerTransition is available only in Angular 4
    }),
    AppRoutingModule,
    ReactiveFormsModule,
    NgSelectModule,
    FormsModule,
    LayoutModule,
    AnimateOnScrollModule.forRoot(),
    SharedModule,
    ServiceWorkerModule.register("ngsw-worker.js", {
      enabled: environment.production,
    }),
    BrowserAnimationsModule,
    HttpClientModule,
    NgbModule,
    NgbCarouselModule,
  ],
  schemas: [NO_ERRORS_SCHEMA],
  providers: [ApiService, CanActiveRouterGuardService, CookieService, SEOService],
  bootstrap: [AppComponent],
  exports: [ReactiveFormsModule, FormsModule],
})
export class AppModule {}
