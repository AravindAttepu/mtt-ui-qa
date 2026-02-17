import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NgbCarousel } from '@ng-bootstrap/ng-bootstrap';
import { DomSanitizer } from '@angular/platform-browser';
import { ApiService } from 'src/app/api.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {
  galleryImages = [];
  galleryVideos = [];
  totalVideosList = [];
  totalPhotosList = [];
  isFirstTime = true;
  selectedIndex = 'ngb-slide-0';
  lazyLoadImage = 'assets/images/loading-giphy.webp';
  pauseOnHover = true;
  pauseOnFocus = true;
  mediaType = 'photos';
  images = [62, 83, 466, 965, 982, 1043, 738].map((n) => `https://picsum.photos/id/${n}/900/500`);
  @ViewChild('carousel', { static: true }) carousel: NgbCarousel;
  constructor(
    private modalService: NgbModal,
    public sanitizer: DomSanitizer,
    private apiService: ApiService,
    private router: Router) { }

  ngOnInit() {
    this.galleryImages = [
      {
        path: 'https://drive.google.com/thumbnail?id=1P-m5UnuAxcFNzCKI2MlaW7T4-pKL3JyX',
        description: 'Sadisha Math Talent test - 2025, Karimnagar',
        keyWords: ''
      },
      {
          path: 'https://drive.google.com/thumbnail?id=1DSik1aA0N6tT9pocrvIsUBbGv41HPtMl',
          description: 'Sadisha Math Talent test - 2025, Karimnagar',
          keyWords: ''
      },
        {
          path: 'https://drive.google.com/thumbnail?id=131fsMpzp0kmEyl6nJgpqLtjsKHGWb33M',
          description: 'Sadisha Math Talent test - 2025, Karimnagar',
          keyWords: ''
        },
      {
          path: 'https://drive.google.com/thumbnail?id=1THMYdyzumz4ua0_49RalDKzC1T1oNthI',
          description: 'Sadisha Math Talent test - 2025, Karimnagar',
          keyWords: ''
       },
       {
         path: 'https://drive.google.com/thumbnail?id=1EtlApeSJ0vIXPnwNDyccNv1iGYfLi2_N',
         description: 'Sadisha Math Talent test - 2025, Karimnagar',
         keyWords: ''
      },
      {
         path: 'https://drive.google.com/thumbnail?id=15dQv7ro7BUEp_QFu7WnDaHj96PUc83QK',
         description: 'Sadisha Math Talent test - 2025, Karimnagar',
         keyWords: ''
      },
      {
       path: 'https://drive.google.com/thumbnail?id=1I1qj9j16y9lpAD2Ps24GhOtNQ2oTEU6S',
       description: 'Sadisha Math Talent test - 2025, Karimnagar',
       keyWords: ''
      },
      {
        path: 'https://drive.google.com/thumbnail?id=1xoPq7Udjl3KAMTXZQhLz6TSwEnXJ17v9',
        description: 'Sadisha Math Talent test - 2025, Warangal',
        keyWords: ''
      },
      {
        path: 'https://drive.google.com/thumbnail?id=1VEgrhSLmC5kcS_lqUxbqDJg4LVo47pXa',
        description: 'Sadisha Math Talent test - 2025, Warangal',
        keyWords: ''
      },
      {
        path: 'https://drive.google.com/thumbnail?id=1JKMVh6l7nM-_5VaahNj2EeNkjOaq2IkC',
        description: 'Sadisha Math Talent test - 2025, Warangal',
        keyWords: ''
      },
      {
        path: 'https://drive.google.com/thumbnail?id=1AyQ23LiKMTVgcrgoz6MN5ZMeIpKmt4NO',
        description: 'Sadisha Math Talent test - 2025, Warangal',
        keyWords: ''
      },
      {
        path: 'https://drive.google.com/thumbnail?id=1NQlvHlyf6AfZmdJA9hC7iW8axCiScIUl',
        description: 'Sadisha Math Talent test - 2025, Warangal',
        keyWords: ''
      },
      {
        path: 'https://drive.google.com/thumbnail?id=15ry0TGMgWwkTDt0p9CSintvg4vpEOQuj',
        description: 'Sadisha Math Talent test - 2025, Warangal',
        keyWords: ''
      },
      {
        path: 'https://drive.google.com/thumbnail?id=19a0rnOsRoZ_HfuqlT13TqAzpGK0TcYxm',
        description: 'Sadisha Math Talent test - 2025, Warangal',
        keyWords: ''
      },
      {
        path: 'https://drive.google.com/thumbnail?id=1uziu87DC19zfWUrRXBtXrbZd8d41nYOL',
        description: 'Sadisha Math Talent test - 2025, Warangal',
        keyWords: ''
      },
      {
        path: 'https://drive.google.com/thumbnail?id=1-mqqMaalYg0zEKvy8JdFHJ9EWISFVrM0',
        description: 'Sadisha Math Talent test - 2025, Warangal',
        keyWords: ''
      },
      {
        path: 'https://drive.google.com/thumbnail?id=1JmVT9BeP23y_GMraT0VPKg7EycMYjTYt',
        description: 'Sadisha Math Talent test - 2025, Khammam',
        keyWords: ''
      },
      {
        path: 'https://drive.google.com/thumbnail?id=1L_wpTrIh9vLZGypz2sx-0R--K3VL60sg',
        description: 'Sadisha Math Talent test - 2025, Mahabubnagar',
        keyWords: ''
      },
      {
        path: 'https://drive.google.com/thumbnail?id=19b40OSGjM2V3H4xXAQ5hDHvnbKoXOcCh',
        description: 'Sadisha Math Talent test - 2025, Mahabubnagar',
        keyWords: ''
      },
      {
        path: 'https://drive.google.com/thumbnail?id=1LwbJobGDeQRvCrqgKueP8Few1OoKEj_4',
        description: 'Sadisha Math Talent test - 2025, Mahabubnagar',
        keyWords: ''
      },
      {
        path: 'https://drive.google.com/thumbnail?id=1Wc6heNwJdW6naZrTmVwOdqGUzm9c17m7',
        description: 'Sadisha Math Talent test - 2025, Nanded',
        keyWords: ''
      },
      {
        path: 'https://drive.google.com/thumbnail?id=1VyO5sLKi6Qw75USlHL0md2Qn4bxLdFPM',
        description: 'Sadisha Math Talent test - 2025, Nanded',
        keyWords: ''
      },
      {
        path: 'https://drive.google.com/thumbnail?id=1Vo3g9to3mbWx9WAxo95pmhbNgyPbxjBR',
        description: 'Sadisha Math Talent test - 2025, Nanded',
        keyWords: ''
      },
      {
        path: 'https://drive.google.com/thumbnail?id=18n-5Jt2YLaCimnVOJmIQyfduemoDSXNh',
        description: 'Sadisha Math Talent test - 2025, Suryapet',
        keyWords: ''
      },
      {
        path: 'https://drive.google.com/thumbnail?id=1hiy9sIIETHse9t0G8Oy9KiEbLeqrG9pA',
        description: 'Sadisha Math Talent test - 2025, Suryapet',
        keyWords: ''
      },
      {
        path: 'https://drive.google.com/thumbnail?id=1ywFA0X2S2GQXwD-3jdH89-WUVLiFHzoR',
        description: 'Sadisha Math Talent test - 2025, Suryapet',
        keyWords: ''
      },
      {
        path: 'https://drive.google.com/thumbnail?id=1LunN7GqmrLrEL5aYVUhiP525vEcIc9FA',
        description: 'Sadisha Math Talent test - 2025, Suryapet',
        keyWords: ''
      },
      {
        path: 'https://drive.google.com/thumbnail?id=1qkvRKvDn_OcPVtTRUvpCwv1MOW690And',
        description: 'Sadisha Math Talent test - 2025, Suryapet',
        keyWords: ''
      },
      {
        path: 'https://drive.google.com/thumbnail?id=1lUX-_jfLO7pUKn-2oeYVVYX2OKcH8io4',
        description: 'Sadisha has sponsored GATE coaching for 100 female students',
        keyWords: ''
      },
      {
        path: 'https://drive.google.com/thumbnail?id=1BDA2IkBiENJvi-1R_DBMcooHy4HoreMe',
        description: 'Sadisha has sponsored GATE coaching for 100 female students',
        keyWords: ''
      },
      {
        path: 'https://drive.google.com/thumbnail?id=1vQmSE4T-n5IZXPAS3rbWEzkRL347wQ0f',
        description: 'Khammam students joining',
        keyWords: ''
      },
      {
        path: 'https://drive.google.com/thumbnail?id=1m15ZdmFH6x4dvjV4LXvqh3wTFDu1zl1C',
        description: 'Warangal students joining',
        keyWords: ''
      },
      {
        path: 'https://drive.google.com/thumbnail?id=1Z5ghLQ_0NbVesFxNwT0QqVuLBwChFTRw',
        description: 'Karimnagar students joining 2025',
        keyWords: ''
      },
      {
        path: 'https://drive.google.com/thumbnail?id=10mPc_8ZmbH1Jj-gRVlXQ9NLg_TGa5pbh',
        description: 'Karimnagar students joining 2025',
        keyWords: ''
      },
      {
        path: 'https://drive.google.com/thumbnail?id=1M4s2I7bAoTVBR9QnbousxOKAsJuV-kEs',
        description: 'SADISHA Donating Laptop To Schools, 2023',
        keyWords: ''
      },
      {
        path: 'https://drive.google.com/thumbnail?id=1oZv6xdRs5PGrIA2uNu6VxSZAf2SQCokC',
        description: 'SADISHA Knr Joinees, 2023',
        keyWords: ''
      },
      {
        path: 'https://drive.google.com/thumbnail?id=1H2jz0L3dyk_mFwSTaMD5TmphdrPUulWz',
        description: 'SADISHA Guntur Joinees, 2023',
        keyWords: ''
      },
      {
        path: 'https://drive.google.com/thumbnail?id=1L0skONlU0D-RvFHaZh5kmVuZmpiyqxVc',
        description: 'SADISHA Evaluation Lab',
        keyWords: ''
      },
      {
        path: 'https://drive.google.com/thumbnail?id=1lVs4xoDBOJfiZ_-u7SRoQ5Jp7SfiEUum',
        description: 'SADISHA 2022, Volunteers',
        keyWords: ''
      },
      {
        path: 'https://drive.google.com/thumbnail?id=12lPVroHaLF5V9QYF7ap57UKgjkiKlrWY',
        description: 'SADISHA 2022, Karimnagar',
        keyWords: ''
      },
      {
        path: 'https://drive.google.com/thumbnail?id=1q_Z_ZfLSOVTyrdfgV9X2wlSuAQB6D88u',
        description: 'Sadisha 2022, Nanded',
        keyWords: ''
      },
      {
        path: 'https://drive.google.com/thumbnail?id=1CWJH_C47p27uLNfdQWaRduRSa_Pqgaxr',
        description: 'JP with Press',
        keyWords: ''
      },
      {
        path: 'https://drive.google.com/thumbnail?id=1-tDwn1QE8-6_V9CWIFysLdsL3zaDOYFm',
        description: 'Gopi Speech',
        keyWords: ''
      },
      {
        path: 'https://drive.google.com/thumbnail?id=16tC7HKAq6ZKleY7g3lmK0rHTWdpHzR0K',
        description: 'SADISHA EXAM',
        keyWords: ''
      },
      {
        path: 'https://drive.google.com/thumbnail?id=1EScuDXp5L5Wzbu6qSz5ePI4U3wsdtJIh',
        description: 'Sadisha TEAM 2021',
        keyWords: ''
      },

      {
        path: 'https://drive.google.com/thumbnail?id=1c2D9oRM9n2bJP41TSqcgkCoCtajdhct-',
        description: 'SADISHA EXAM',
        keyWords: ''
      },

      {
        path: 'https://drive.google.com/thumbnail?id=1CASGOnhxypDIe1r1YS_8jbEXCJJt6zBJ',
        description: 'SADISHA 2019',
        keyWords: ''
      },
      {
        path: 'https://drive.google.com/thumbnail?id=1CREK5GLD356bxqUaJ8euNei5PQ1DoIF3',
        description: 'SADISHA Serving Lunch',
        keyWords: ''
      },
      {
        path: 'https://drive.google.com/thumbnail?id=1NFkDd3A3dVIJ6qMG6uxPlr7aWj6a6Fdq',
        description: 'SADISHA 2019',
        keyWords: ''
      },

      {
        path: 'https://drive.google.com/thumbnail?id=1E9KSUreG8yvcib7svSI7r5XSpxBRyDOP',
        description: 'SADISHA Felicitating Teachers',
        keyWords: ''
      },
      {
        path: 'https://drive.google.com/thumbnail?id=1kmPRyFacfeZGh-hKsbY-7lxpwACm615T',
        description: 'SADISHA EXAM',
        keyWords: ''
      },
      {
        path: 'https://drive.google.com/thumbnail?id=1pA4lIxRDp9b8kf6F_nYw8FQg-lRSS0HV',
        description: 'SADISHA Felicitating Teachers',
        keyWords: ''
      },
      {
        path: 'https://drive.google.com/thumbnail?id=16RqaohhBhmqF-t9Bx_ZYE_XyxyV-Jpt-',
        description: 'SADISHA TEAM',
        keyWords: ''
      },
      {
        path: 'https://drive.google.com/thumbnail?id=18NHwqDEuAczCcQtoGCf4yKO8BFO2QDkl',
        description: 'SADISHA NANDED',
        keyWords: ''
      },
      {
        path: 'https://drive.google.com/thumbnail?id=18OmcluJyunGcydFOhuOtn_zntaUeTjhc',
        description: 'SADISHA NANDED - WARM WELCOME',
        keyWords: ''
      },
      {
        path: 'https://drive.google.com/thumbnail?id=1cDThJjjT-a6f0SLjdMQ8rH8hCVA_1KzO',
        description: 'SADISHA EXAM',
        keyWords: ''
      },
      {
        path: 'https://drive.google.com/thumbnail?id=1Q-xvrAgE3X1eb0cveFLo9riQtV10zX2Q',
        description: 'SADISHA EXAM',
        keyWords: ''
      },
      {
        path: 'https://drive.google.com/thumbnail?id=1L0skONlU0D-RvFHaZh5kmVuZmpiyqxVc',
        description: 'SADISHA EVALUATION LAB',
        keyWords: ''
      },
      {
        path: 'https://drive.google.com/thumbnail?id=104O0Jy8fdZRRN4DCyaXSdQGVRGHDq7Ek',
        description: 'SADISHA SURYAPET EVENT',
        keyWords: ''
      },
      {
        path: 'https://drive.google.com/thumbnail?id=1O4GPHoGePZ8i21ROSKd3JXZq-4uaVV-3',
        description: 'SADISHA VOLUNTEERS',
        keyWords: ''
      },
      {
        path: 'https://drive.google.com/thumbnail?id=1gDoQFikAsTkBBYzRnxDg3Z1uEvLvzvfE',
        description: 'SADISHA EXAM',
        keyWords: ''
      },
      {
        path: 'https://drive.google.com/thumbnail?id=1Q-xvrAgE3X1eb0cveFLo9riQtV10zX2Q',
        description: 'SADISHA EXAM',
        keyWords: ''
      },
      {
        path: 'https://drive.google.com/thumbnail?id=1YrEVfcOV-_NTBnz2j2AorgFdP4c5u-nX',
        description: '2015',
        keyWords: ''
      }
    ];
    this.galleryVideos = [
      {
        path: 'https://www.youtube.com/embed/IBgWOMtvYgE',
        description: 'Sadisha Maths Talent Test 2025 | Get Free Inter with Hostel facility',
        keyWords: ''
      },
        {
          path: 'https://www.youtube.com/embed/HhyW1uAV1H8',
          description: 'Interview with the Toppers of Sadisha Math Talent Test',
          keyWords: ''
        },
      {
        path: 'https://www.youtube.com/embed/vGH8WcPg97E',
        description: 'Interview with the Founder of Sadisha, Govardhan Reddy',
        keyWords: ''
      },
      {
        path: 'https://www.youtube.com/embed/9GUmaU2VcHg',
        description: 'Cultural Festivitities - Sadisha Foundation',
        keyWords: ''
      },
//       {
//         path: 'https://www.youtube.com/embed/FDCPiT8DCJ0',
//         description: 'Sadisha Math Talent Test - Suryapet, PND 24 News',
//         keyWords: ''
//       },
      {
        path: 'https://www.youtube.com/embed/K9L7h_NuT30',
        description: 'Speech Of ACP Ashok Pagadala - Sadisha Foundation Event',
        keyWords: ''
      },
//       {
//         path: 'https://www.youtube.com/embed/YLfsM-wr3uc',
//         description: 'Special Interview  with the Founder of Sadisha, Govardhan Reddy on TS24 News',
//         keyWords: ''
//       },
      {
        path: 'https://www.youtube.com/embed/Tor9o41EFuc',
        description: 'రెండేండ్లు ఫీజులు, హాస్టల్ వసతి... || MY3 NEWS 17-09-2021 8pm ||',
        keyWords: ''
      },
//       {
//         path: 'https://www.youtube.com/embed/ypqea1009dw',
//         description: 'ETV Yuva',
//         keyWords: ''
//       },
//       {
//         path: 'https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2FJPLOKSATTA%2Fvideos%2F309384699784689%2F&show_text=0&width=267',
//         description: 'Dr Jaya Prakash Narayana in December 2018.',
//         keyWords: ''
//       },
      {
        path: 'https://www.youtube.com/embed/vH-KbNNffHk',
        description: 'Maths talent test-2018.',
        keyWords: ''
      },
      {
        path: 'https://www.youtube.com/embed/led8d70MXZs',
        description: 'కరీంనగర్ జిల్లా కొత్తపల్లి సదిశ ఫౌండేషన్ ఆధ్వర్యంలో గణిత శాస్త్ర టాలెంట్ పరీక్ష| Inb News Live',
        keyWords: ''
      },
      {
        path: 'https://www.youtube.com/embed/6CMPMRSjjhs',
        description: 'SADISHA FOUNDATION | Math Talent Test @ 2019 | Govardhan Mucharla | Karimnagar | NTN Media',
        keyWords: ''
      },
      {
        path: 'https://www.youtube.com/embed/eMF1TQTZuRQ',
        description: 'SADISHA FOUNDATION | Govardhan Mucharla | Karimnagar | NTN Media',
        keyWords: ''
      },
      {
        path: 'https://www.youtube.com/embed/fbD9v829p3M',
        description: 'ప్రతిభ గల పేద విద్యార్థులకు సదిశ అండ! My3 News 18.12.2019 7PM',
        keyWords: ''
      },
      {
        path: 'https://drive.google.com/file/d/11mbqQQL97GqOU_gQYdyw4bcK35jUr7-X/preview',
        description: 'Karimnagar students joining 2025',
        keyWords: ''
      }
    ];
    this.galleryVideos = this.galleryVideos.map(val => {
      if (val.path) {
        val.path = this.sanitizer.bypassSecurityTrustResourceUrl(val.path);
      }
      return val;
    });
    this.getGalleryImages('photos');
  }
  openVideos() {
    this.mediaType = 'videos';
    if (this.isFirstTime) {
      this.isFirstTime = false;
      this.getGalleryImages('videos');
    }
  }
  getGalleryImages(type) {
    try {
      this.apiService.showLoader.next(true);
      this.apiService.getGalleryImages(type).subscribe(
        (res) => {
          this.apiService.showLoader.next(false);
          if (type === 'videos') {
            this.totalVideosList = res;
            this.totalVideosList = this.totalVideosList.map(val => {
              val.path = val.mediaUrl;
              if (val.path) {
                val.path = val.path.split('"').filter(path => path).join();
                val.path = this.sanitizer.bypassSecurityTrustResourceUrl(val.path);
              }
              return val;
            }).filter(val => val.active);
          } else {
            this.totalPhotosList = res || [];
            this.totalPhotosList = this.totalPhotosList.map(val => {
              val.path =  val.mediaUrl;
              return val;
            }).filter(val => val.active);
          }
        },
        (err: HttpErrorResponse) => {
          this.apiService.showLoader.next(false);
          if (err.status === 401) {
            this.router.navigate(['/login']);
            return;
          }
          if (err.error) {
            const serverError =
              typeof err.error === 'string' ? JSON.parse(err.error) : {};
            this.apiService.genericMessage(
              serverError.error || 'something went wrong',
              'error'
            );
          }
        }
      );
    } catch (e) {
      console.warn(e);
    }
  }

  open(content, selectedIndex) {
    this.selectedIndex = 'ngb-slide-' + selectedIndex;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'lg', centered: true }).result.then((result) => {
    }, (reason) => {
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
