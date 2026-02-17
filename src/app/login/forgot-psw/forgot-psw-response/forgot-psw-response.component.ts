import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import './forgot-psw-response.component.scss';

@Component({
  selector: 'app-forgot-psw-response',
  templateUrl: './forgot-psw-response.component.html',
  styleUrls: ['./forgot-psw-response.component.scss']
})
export class ForgotPswResponseComponent implements OnInit {
  responseData: any; // Define a variable to store the response data

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    console.log('finally here it is');
    
    // Retrieve the response data from the route parameter
    this.route.params.subscribe((params) => {
      if (params.response) {
        this.responseData = JSON.parse(params.response);
      }
    });
  }
}
