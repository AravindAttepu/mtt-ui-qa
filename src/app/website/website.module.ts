import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { WebsiteWrapperComponent } from './website-wrapper/website-wrapper.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { FaqComponent } from './pages/faq/faq.component';
import { HomeComponent } from './pages/home/home.component';
import { GalleryComponent } from './pages/gallery/gallery.component';
import { PressComponent } from './pages/press/press.component';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { StudentsRegistrationComponent } from './pages/students-registration/students-registration.component';
import { VolunteerRegistrationComponent } from './pages/volunteer-registration/volunteer-registration.component';
import { StudentDetailsComponent } from './pages/student-details/student-details.component';
import { DonateComponent } from './pages/donate/donate.component';
import { NgxPrintModule } from 'ngx-print';
import { WebcamModule } from 'ngx-webcam';
import { PrivacyPolicyComponent } from './pages/privacy-policy/privacy-policy.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { EducationComponent } from './pages/education/education.component';
import { AboutOverviewComponent } from './pages/about-overview/about-overview.component';
import { CertificatesComponent } from './pages/certificates/certificates.component';
import { TermsAndConditionsComponent } from './pages/terms-and-conditions/terms-and-conditions.component';
const routes: Routes = [
  {
    path: '',
    component: WebsiteWrapperComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent,
        data: {
          title: 'Sadisha Foundation',
          description: ' Sadisha means Right Direction. We are a registered NGO and a passionate team of more than 150 people who want to address countless problems in rural India.'
        }
      },
      {
        path: 'contact-us',
        component: ContactUsComponent,
        data: {
          title: 'Contact us',
          description: ' Contact us information',
          keywords: 'Sadisha,Right Direction, NGO, Contact us, Math Talent Test'
        }
      },
      {
        path: 'talent-test',
        loadChildren: () => import('../talent-test/talent-test.module').then(m => m.TalentTestModule)
      },
      {
        path: 'gate-coaching',
        loadChildren: () => import('../gate-coaching/gate-coaching.module').then(m => m.GateCoachingModule)
      },
      {
        path: 'gate-mou',
        loadChildren: () => import('../gate-mou/gate-mou.module').then(m => m.GATEMOUModule)
      },

      {
        path: 'faq',
        component: FaqComponent,
        data: {
          title: 'FAQ',
          description: ' General queries and Responses',
          keywords: 'Sadisha,Right Direction, NGO, FAQ, Math Talent Test'
        }
      },
      {
        path: 'gallery',
        component: GalleryComponent,
        data: {
          title: 'Gallery',
          description: ' Sadisha Foundation  events images and videos',
          keywords: 'Sadisha Foundation, Sadisha Foundation events, Sadisha Foundation gallery, Math Talent Test'
        }
      }, {
        path: 'press',
        component: PressComponent,
        data: {
          title: 'Press',
          description: ' Sadisha Foundation press events images and videos',
          keywords: 'Sadisha Foundation, Sadisha Foundation press, Sadisha Foundation press events, Math Talent Test'
        }
      },
      {
        path: 'student-registration',
        component: StudentsRegistrationComponent,
        data: {
          title: 'Student Registration',
          description: ' Sadisha Foundation student registration',
          keywords: 'Sadisha Foundation, Sadisha Foundation student registration, Math Talent Test'
        }
      },
      {
        path: 'student',
        component: StudentDetailsComponent,
        data: {
          title: 'Student Details',
          description: ' Student Details',
          keywords: 'Sadisha Foundation, Sadisha Foundation student details, Math Talent Test'
        }
      },
      {
        path: 'volunteer-registration',
        component: VolunteerRegistrationComponent,
        data: {
          title: 'Volunteer Registration',
          description: ' Sadisha Foundation volunteer registration',
          keywords: 'Sadisha Foundation, Sadisha Foundation volunteer registration, Math Talent Test'
        }
      },
      {
        path: 'donate',
        component: DonateComponent,
        data: {
          title: 'Donate to Sadisha Foundation',
          description: 'Support our mission by donating to Sadisha Foundation. Information for international and Indian donors.',
          keywords: 'Sadisha Foundation, donate, donation, support, NGO, charity'
        }
      },
      {
        path: 'privacy-policy',
        component: PrivacyPolicyComponent,
        data: {
          title: 'Privacy Policy',
          description: 'Sadisha Foundation Privacy Policy',
          keywords: 'Sadisha, Privacy Policy, Data Protection'
        }
      },
      {
        path: 'about-us',
        component: AboutUsComponent,
        data: {
          title: 'About Us',
          description: 'About Sadisha Foundation - Mission, Vision, and Team',
          keywords: 'Sadisha, About Us, NGO, Mission'
        }
      },
      {
        path: 'about-overview',
        component: AboutOverviewComponent,
        data: {
          title: 'Organization Overview',
          description: 'Overview of Sadisha Foundation history and mission',
          keywords: 'Sadisha, Overview, NGO, Mission'
        }
      },
      {
        path: 'certificates',
        component: CertificatesComponent,
        data: {
          title: 'Legal Certificates',
          description: 'Transparency and legal documents of Sadisha Foundation',
          keywords: 'Sadisha, Certificates, Legal, Compliance, 80G, 12A'
        }
      },
      {
        path: 'education',
        component: EducationComponent,
        data: {
          title: 'Educational Programs',
          description: 'Sadisha Foundation Educational Programs',
          keywords: 'Sadisha, Education, Programs, Math Talent Test, GATE'
        }
      },
      {
        path: 'terms-and-conditions',
        component: TermsAndConditionsComponent,
        data: {
          title: 'Terms and Conditions',
          description: 'Sadisha Foundation Terms and Conditions',
          keywords: 'Sadisha, Terms and Conditions, Legal, Usage Policy'
        }
      },
      { path: "**", redirectTo: "home", pathMatch: "full" }
    ]
  },
];

@NgModule({
  declarations: [
    WebsiteWrapperComponent,
    ContactUsComponent,
    FaqComponent,
    HomeComponent,
    GalleryComponent,
    PressComponent,
    StudentsRegistrationComponent,
    StudentDetailsComponent,
    VolunteerRegistrationComponent,
    DonateComponent,
    PrivacyPolicyComponent,
    AboutUsComponent,
    EducationComponent,
    AboutOverviewComponent,
    CertificatesComponent,
    TermsAndConditionsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    NgbCarouselModule,
    NgxPrintModule,
    WebcamModule,
  ],
  exports: [
  ]
})
export class WebsiteModule { }
