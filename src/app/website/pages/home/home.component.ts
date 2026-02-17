import { Component, OnInit, AfterViewInit } from '@angular/core';
import Swiper, { Autoplay } from 'swiper';

Swiper.use([Autoplay]);

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {
  mySwiper: any = null;
  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.initiateSwiper();
  }

  // Swiper
  initiateSwiper() {
    this.mySwiper = new Swiper('.s1', {
      slidesPerView: 'auto',
      spaceBetween: 40,
      loop: true,
      loopedSlides: 10,
      speed: 6000,
      allowTouchMove: false,
      observer: true,
      observeParents: true,
      autoplay: {
        delay: 0,
        disableOnInteraction: false
      }
    });
  }
}
