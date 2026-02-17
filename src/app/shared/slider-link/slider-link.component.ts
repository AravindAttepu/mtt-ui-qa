import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-slider-link',
  templateUrl: './slider-link.component.html',
  styleUrls: ['./slider-link.component.scss']
})
export class SliderLinkComponent implements OnInit {
@Input() text = '';
@Input() link = '';
  constructor() { }

  ngOnInit() {
  }

}
