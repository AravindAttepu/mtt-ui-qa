import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {
  contactUsForm:FormGroup;
  isResponceSuccess:boolean= false;
  serverResponce:any;
  constructor(private fb:FormBuilder) { }

  ngOnInit() {
    this.contactUsForm = this.fb.group({
      name:["",Validators.required],
      emailID:["",Validators.required],
      phoneNumber:["",Validators.required],
      message:["",Validators.required],

    })
  }
  hideAlert(){
    this.isResponceSuccess = false;
  }
  sendDetails(){
    console.log(this.contactUsForm.value);
    
  }
}
