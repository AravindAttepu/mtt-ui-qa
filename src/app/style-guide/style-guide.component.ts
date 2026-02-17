import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-style-guide',
  templateUrl: './style-guide.component.html',
  styleUrls: ['./style-guide.component.scss']
})
export class StyleGuideComponent implements OnInit {
  public selectedLanguage = null;
  public languagesList = [
    'English',
    'Telugu',
    'Kannada'
  ];
  public patientsList = [
    {
      name: 'Jon Doe',
      age: 22,
      amount: 100,
      admittedDate: '20/03/2020'
    },
    {
      name: 'Herman Beck',
      age: 23,
      amount: 120.34,
      admittedDate: '21/03/2020'
    },
    {
      name: 'John Richards',
      age: 43,
      amount: 220.59,
      admittedDate: '21/03/2020'
    }
  ];
  constructor() { }

  ngOnInit() {
  }

}
