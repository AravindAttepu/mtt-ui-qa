import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-forgot-psw',
  templateUrl: './forgot-psw.component.html',
  styleUrls: ['./forgot-psw.component.scss']
})
export class ForgotPswComponent implements OnInit {
  forgotForm: FormGroup;
  formSubmitted = false;
  constructor(
    private apiService: ApiService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.initForm();
  }


  private initForm() {
    this.forgotForm = this.fb.group({
      phoneNumber: [null, Validators.required],
    });
  }

  submit() {
    try {
      this.formSubmitted = true;
      if (!this.forgotForm.value.phoneNumber || this.forgotForm.value.phoneNumber.length < 10) {
        return;
      }
      this.apiService.showLoader.next(true);
      this.apiService.forgotPsw(this.forgotForm.value.phoneNumber).subscribe(
        (res: any) => {
           
             if (res && typeof res === "string") {
              const response = JSON.parse(res);
              if (response && response.message) {
                console.log(response.message); 
                this.apiService.showLoader.next(false);
                this.apiService.genericMessage(response.message, 'success');
                this.router.navigate(['/login']);
               // this.router.navigate(['/forgot-psw-response']);
               // this.router.navigate(['/forgot-psw-response', { response: JSON.stringify(response.message) }]);

              }
            
           
          }

      }, error => {
        this.apiService.showLoader.next(false);
        if (error.error && error.error.message) {
          this.apiService.genericMessage(error.error.message || 'something went wrong', 'error');
        } else {
          this.apiService.genericMessage('Did not find any student with this mobile number', 'error');
        }
        console.log(error);
      });
    } catch (e) {
      console.warn(e);
    }
  }
}
