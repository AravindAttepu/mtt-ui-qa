import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-images-upload-wrapper',
  templateUrl: './images-upload-wrapper.component.html',
  styleUrls: ['./images-upload-wrapper.component.scss']
})
export class ImagesUploadWrapperComponent implements OnInit {
  labelsList: Array<string> = [];
  constructor() { }

  ngOnInit() {
    this.labelsList = [
      '2020 Team',
      '2019 Team',
      '2017 Team',
      '2016 Team',
    ];
  }

}
