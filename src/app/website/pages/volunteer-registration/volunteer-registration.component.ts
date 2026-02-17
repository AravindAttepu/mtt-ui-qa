import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-volunteer-registration',
  templateUrl: './volunteer-registration.component.html',
  styleUrls: ['./volunteer-registration.component.scss']
})
export class VolunteerRegistrationComponent implements OnInit {
  registrationForm: FormGroup;
  isAPILoading = false;
  formSubmitted = false;
  showForm = true;
  newVolunteer: any = {};
  genders: Array<string> = [
    'MALE',
    'FEMALE'
  ];
  districtsList: any = [];

  constructor(
        private fb: FormBuilder,
        private apiService: ApiService) {
    this.registrationForm = this.fb.group({
      volunteerName: ['', Validators.required],
      gender: ['', Validators.required],
      zone: ['', Validators.required],
      contactNumber: ['', Validators.required],
      Vany: [false],
    });
  }


  ngOnInit() {
    this.formatDistrictsData();
  }

  formatDistrictsData(): void {
      this.districtsList = [
        {
          name: "KARIMNAGAR",
        },
        {
          name: "KHAMMAM",
        },
        {
          name: "NANDED",
        },
        {
          name: "GUNTUR",
        },
        {
          name: "SURYAPET",
        },
        {
          name: "WARANGAL",
        },
        {
          name: "MAHABUBNAGAR",
        }
      ];
  }

  registerVolunteer(): void {
    this.newVolunteer = {};
    this.formSubmitted = true;
    if (this.registrationForm.invalid) {
      return;
    }
    const payload: any = {...this.registrationForm.value};
    if (payload.contactNumber.length < 10) {
      return;
    }
    payload.zone = payload.zone && payload.zone.name ?  payload.zone.name : '';
    payload.secondaryContact = '';
    payload.studentName = payload.volunteerName;
    payload.volunteerAnywhere = payload.Vany;

    try {
      this.apiService.showLoader.next(true);

      this.apiService.registerVolunteer(payload).subscribe((res: any) => {
        if (res && typeof res === "string") {
          const response = JSON.parse(res);
          if (response && response.message) {
            console.log('response is stirng');
            this.apiService.showLoader.next(false);
            this.apiService.genericMessage(response.message, "success");
            this.formSubmitted = true;
            this.resetForm();
          }
      } else {
        this.showForm = false;
        this.formSubmitted = true;
        this.apiService.showLoader.next(false);
        this.newVolunteer = res;
        this.apiService.genericMessage('Successfully registered!', 'success');
        this.resetForm();
      }
      }, error => {
        this.apiService.showLoader.next(false);
        if (error.error) {
          const serverError = typeof error.error === 'string' ? JSON.parse(error.error) : {};
          this.apiService.genericMessage(serverError.error || 'something went wrong', 'error');
        }
        console.log(error);
      });
    } catch (e) {
      console.warn(e);
    }

  }

  resetForm() {
    this.registrationForm.reset();
    this.formSubmitted = false;
    this.isAPILoading = false;
  }
}
