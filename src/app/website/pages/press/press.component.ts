import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NgbCarousel } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-press',
  templateUrl: './press.component.html',
  styleUrls: ['./press.component.scss']
})
export class PressComponent implements OnInit {
  pressImages = [];
  galleryVideos = [];
  mediaType = 'news';
  selectedIndex = 'ngb-slide-0';
  lazyLoadImage = 'assets/images/loading-giphy.webp';
  constructor(private modalService: NgbModal, public sanitizer: DomSanitizer) { }

  open(content, selectedIndex) {
    this.selectedIndex = 'ngb-slide-' + selectedIndex;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'lg', centered: true }).result.then((result) => {
    }, (reason) => {
    });
  }

  ngOnInit() {
    this.pressImages = [
      {
        path: 'https://drive.google.com/thumbnail?id=1efAba6p1OXDEktriuerqsHuLCobFsxme',
        description: 'Sadisha Math Talent test - 2025, Karimnagar',
        keyWords: ''
      },
      {
        path: 'https://drive.google.com/thumbnail?id=1GxUAr7-7GasujeCJ2t8wECiuz1WTJ1Ll',
        description: 'Sadisha Math Talent test - 2025, Mahabubnagar',
        keyWords: ''
      },
      {
        path: 'https://drive.google.com/thumbnail?id=1uQ3mVJC3x4zMUJCJIdp3FAvXMg0w75Jw',
        description: 'Sadisha Math Talent test - 2025, Mahabubnagar',
        keyWords: ''
      },
     {
        path: 'https://drive.google.com/thumbnail?id=1rN58JQEW4PKoO--OgFj1brjF1cZPRRHE',
        description: 'Sadisha Math Talent test - 2025, Mahabubnagar',
        keyWords: ''
      },
      {
        path: 'https://drive.google.com/thumbnail?id=1EPjfJscLEnG4_oFVNvG5l75GEK8n24Ti',
        description: 'Sadisha Math Talent test - 2025, Mahabubnagar',
        keyWords: ''
      },
      {
        path: 'https://drive.google.com/thumbnail?id=1rllac7xJo5GIZkDbT9r1-zkKXEXAoux4',
        description: 'Sadisha Math Talent test - 2025, Mahabubnagar',
        keyWords: ''
      },
      {
        path: 'https://drive.google.com/thumbnail?id=1F7PlIE8ClXFFB1nQVrjgm2mdR-uO0xDC',
        description: 'Sadisha Math Talent test - 2025, Mahabubnagar',
        keyWords: ''
      },
      {
        path: 'https://drive.google.com/thumbnail?id=15aX3k7ztJSwrPZ7DB5V5i5r0PgBWLQvw',
        description: '',
        keyWords: ''
      },
      {
        path: 'https://drive.google.com/thumbnail?id=1EmtasNEW3RohlNLA7W_FysSjDHsauXd7',
        description: '',
        keyWords: ''
      },
      {
        path: 'https://drive.google.com/thumbnail?id=1P_2Na5W81OZWoMEPN5IKoAAIodC6PbIa',
        description: '',
        keyWords: ''
      },
      {
        path: 'https://drive.google.com/thumbnail?id=1-VMglx3W5M6D9PWtvroV6hAL3_GcDA_I',
        description: '',
        keyWords: ''
      },
      {
        path: 'https://drive.google.com/thumbnail?id=1YfguRazxfEYx7OI2Lt5rCP3EqQH1JKrY',
        description: '',
        keyWords: ''
      },
      {
        path: 'https://drive.google.com/thumbnail?id=1-8p1AJ2Ie1oISo1cde2Wv45fHPnDXTtV',
        description: 'SADISHA Students Secure EAMCET Ranks-2023',
        keyWords: ''
      },
      {
        path: 'https://drive.google.com/thumbnail?id=1J_DGtLq2KEt3mCcgIeJbZJPB1r7YTC64',
        description: 'SADISHA Students Secure EAMCET Ranks-2023',
        keyWords: ''
      },
      {
        path: 'https://drive.google.com/thumbnail?id=104O0Jy8fdZRRN4DCyaXSdQGVRGHDq7Ek',
        description: 'SADISHA SURYAPET EVENT 2022',
        keyWords: ''
      },
      {
        path: 'https://drive.google.com/thumbnail?id=1ZzzVH_Fi258LlWxHaVtZWrgLDimsH1Lt',
        description: 'SADISHA 2022',
        keyWords: ''
      },
      {
        path: 'https://drive.google.com/thumbnail?id=14px-kDQTJfE-IS2VxnHktklr3TODoQaD',
        description: 'SADISHA 2022',
        keyWords: ''
      },
      {
        path: 'https://drive.google.com/thumbnail?id=1NuCETbyKfIOiFsGKXjjPT3b58VQVjKd_',
        description: 'SADISHA 2021',
        keyWords: ''
      },
      {
        path: 'https://drive.google.com/uc?export=download&id=1C-UVzh94ntdkHwemz0w6W0GWDxFr3hJ8',
        description: '',
        keyWords: ''
      },
      {
        path: 'https://drive.google.com/thumbnail?id=1ec08QjDuMYIWSCUEqP4wPJ3n31QHyPy1',
        description: '',
        keyWords: ''
      },
      {
        path: 'https://drive.google.com/thumbnail?id=1vX_A8pok_VTyANmI9D6R-7shDOzmngOB',
        description: '',
        keyWords: ''
      },
      {
        path: 'https://drive.google.com/thumbnail?id=1DWfgXfLZFvaEIRLUpgIzSaKv07SMh-14',
        description: '',
        keyWords: ''
      },
      {
        path: 'https://drive.google.com/thumbnail?id=16olGNggb6Yz2tBgXcp8k1kjpqrGE_qYC',
        description: '',
        keyWords: ''
      },
      {
        path: 'https://drive.google.com/thumbnail?id=1Azu1tPhm-dw_6HTfh3xVIPGb-0nm0_RL',
        description: '',
        keyWords: ''
      },
      {
        path: 'https://drive.google.com/thumbnail?id=1DjDJAg7mX0_U8VcoetKXtD2AU989GBXW',
        description: '',
        keyWords: ''
      },
      {
        path: 'https://drive.google.com/thumbnail?id=1zKKYIgzySSVkFZutMZ_M8nXYLSupAbiH',
        description: '',
        keyWords: ''
      },
      {
        path: 'https://drive.google.com/thumbnail?id=1j2C1SmC8S5lZLFI2RYW_fouRfd1O6YtB',
        description: '',
        keyWords: ''
      },
      {
        path: 'https://drive.google.com/thumbnail?id=1kuf5iQlI0ZRb_xQHQctRBs5bYHFZ5At-',
        description: '',
        keyWords: ''
      },
      {
        path: 'https://drive.google.com/thumbnail?id=1icq9mD1AHWg8h7159b3Mh02OPlAcj_zJ',
        description: '',
        keyWords: ''
      },
      {
        path: 'https://drive.google.com/thumbnail?id=1S97GKp0o_P7SYgLT5YF91kKoHWoyTdP5',
        description: '',
        keyWords: ''
      },
      {
        path: 'https://drive.google.com/thumbnail?id=1sm5tvjkfudPvkriWc5rAAa3a395aGhOZ',
        description: '',
        keyWords: ''
      },
      {
        path: 'https://drive.google.com/thumbnail?id=1ytVVkwooThw7tutEeQ-VUOJi6bctwoGy',
        description: '',
        keyWords: ''
      },
      {
        path: 'https://drive.google.com/thumbnail?id=168NFW_Q7z_KSte3h3cN8_Rx8JtPhnp8x',
        description: '',
        keyWords: ''
      },
      {
        path: 'https://drive.google.com/thumbnail?id=1dhqPTheLo_JkW0Vf8EyRs5YeweG5DjWK',
        description: '',
        keyWords: ''
      },
      {
        path: 'https://drive.google.com/thumbnail?&id=1QIKCtigBqi9OP_XWDW8eJHOyCGNKHDra',
        description: '',
        keyWords: ''
      },
      {
        path: 'https://drive.google.com/thumbnail?id=1qViChRTxjUQ5c-EM3O8oM1sKzHZLfki1',
        description: '',
        keyWords: ''
      },
      {
        path: 'https://drive.google.com/thumbnail?id=1_o5ZLhxwyse4lTYycXV0jOpr8721TLuK',
        description: '',
        keyWords: ''
      },
      {
        path: 'https://drive.google.com/thumbnail?id=1FTU-W0w8wENbaOqI451gP2_BHnZrDAkx',
        description: '',
        keyWords: ''
      },
      {
        path: 'https://drive.google.com/thumbnail?id=1v9pCptauqwEOe2zQ3cEJS0clKZ_AoiPn',
        description: '',
        keyWords: ''
      },
      {
        path: 'https://drive.google.com/thumbnail?id=194UewiG4z0gSn94Qwjvw2c1bsHxQmXvS',
        description: '',
        keyWords: ''
      },
      {
        path: 'https://drive.google.com/thumbnail?id=1xc_xOIGjXPXyCH-Njxr7m-HxqIAC8oKJ',
        description: '',
        keyWords: ''
      },
      {
        path: 'https://drive.google.com/thumbnail?id=1hus819EO8QpzefOaq2nydOVd7f9Dpt2T',
        description: '',
        keyWords: ''
      },
      {
        path: 'https://drive.google.com/thumbnail?id=1P36lPYAYiKTFrihrtLNBLo2ft7zS-_Nn',
        description: '',
        keyWords: ''
      },
      {
        path: 'https://drive.google.com/thumbnail?id=1DVBNNlj53fa_Ouilct7Rm6Swk4R2yK8g',
        description: '',
        keyWords: ''
      },
      {
        path: 'https://drive.google.com/thumbnail?id=1pnmO5PPE_ual8KACARCcUOxW7uE5gqCS',
        description: '',
        keyWords: ''
      },
      {
        path: 'https://drive.google.com/thumbnail?id=11KgJfZwyvS9MnYxcm0o-MEecU9HJJqwS',
        description: '',
        keyWords: ''
      },
      {
        path: 'https://drive.google.com/thumbnail?id=1xmvOuMjj2nENqA6SHT1MfEqHbn1_VHiP',
        description: '',
        keyWords: ''
      },
      {
        path: 'https://drive.google.com/thumbnail?id=1wILdx9LE8l_jjFtvY_gABdt5yOJ4NLXg',
        description: '',
        keyWords: ''
      },
      {
        path: 'https://drive.google.com/thumbnail?id=1XXNQW9FmaIqnDTr8iViLoZbYj17Y5MIG',
        description: '',
        keyWords: ''
      },
      {
        path: 'https://drive.google.com/thumbnail?id=1Aj9KKemeaLS2XZjmWHtA2-SjJiXh2nRz',
        description: '',
        keyWords: ''
      },
      {
        path: 'https://drive.google.com/thumbnail?id=1fFw84G-f-4Xpj7UQ7ugbWmHjIWqZJpbz',
        description: '',
        keyWords: ''
      },
      {
        path: 'https://drive.google.com/thumbnail?id=1lFJKM0dhcgLE6ZCJ5ljWHj0Iad1d1UB4',
        description: '',
        keyWords: ''
      },
      {
        path: 'https://drive.google.com/thumbnail?id=1uaMFDgbs9nkEAhGrBAek5qNEQ9NDSnDd',
        description: '',
        keyWords: ''
      },
      {
        path: 'https://drive.google.com/thumbnail?id=1uaMFDgbs9nkEAhGrBAek5qNEQ9NDSnDd',
        description: '',
        keyWords: ''
      },
      {
        path: 'https://drive.google.com/thumbnail?id=1DUtOlOY9M9qzCtvyEkM_BlxrVDZ_Kqof',
        description: '',
        keyWords: ''
      },
      {
        path: 'https://drive.google.com/thumbnail?id=11bfaIBEA0BlG_SlHqWeD7T2LnbvGoWPe',
        description: '',
        keyWords: ''
      },
      {
        path: 'https://drive.google.com/thumbnail?id=1_rSc3RoVp3poMJka-4kGcjEyw77eEC9_',
        description: '',
        keyWords: ''
      },
      {
        path: 'https://drive.google.com/thumbnail?id=1QxTxKOTHVmNT0wWrYx08SWHbngqg-et-',
        description: '',
        keyWords: ''
      },
      {
        path: 'https://drive.google.com/thumbnail?id=1mGLLUibdemPzVWQm-uaERw-_SUK2wbrT',
        description: '',
        keyWords: ''
      },
      {
        path: 'https://drive.google.com/thumbnail?id=1NjLkmSjHK9Z8yDhaewWwBQIJNaa-ODk5',
        description: '2018-20 Batch',
        keyWords: ''
      },
      {
        path: 'https://drive.google.com/thumbnail?id=1s-rUGKkl5MEdukF3twyWCpb9-c7PQ6ld',
        description: '2017 December',
        keyWords: ''
      },
      {
        path: 'https://drive.google.com/thumbnail?id=17Wa7ycY81J8aYtAAvGqvlE8kbjPeBgyl',
        description: '2017 December',
        keyWords: ''
      },
      {
        path: 'https://drive.google.com/thumbnail?id=1fgWZnN3J2N95FiFqspv4NGMoKmgOJwLY',
        description: '2016 December',
        keyWords: ''
      },
      {
        path: 'https://drive.google.com/thumbnail?id=15s-4CzF3uZSDI2KgX3yiPpUg27wKmTS3',
        description: '2016 February',
        keyWords: ''
      },
      {
        path: 'https://drive.google.com/thumbnail?id=1eVQiy5J4QigBsc1ULaZ6wM95vTi89Mk7',
        description: '2017 August',
        keyWords: ''
      },
      {
        path: 'https://drive.google.com/thumbnail?id=1jLcTwvQpuLH2Qe6F3k_v4uptNEJjSLiL',
        description: '2016 February',
        keyWords: ''
      }
    ];

    this.galleryVideos = [
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
      // {
      //   path: 'https://www.youtube.com/embed/YLfsM-wr3uc',
      //   description: 'Special Interview Sadisha Foundation Founder Muchharla Govardhan Reddy',
      //   keyWords: ''
      // },
      //  {
      //   path: 'https://www.youtube.com/embed/7ouhd5fY6ZU',
      //   description: 'Jaya Prakesh Narayana At Sadisha Foundation Maths Talent Test 2018',
      //   keyWords: ''
      // },
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
      }
    ];
  }
}
