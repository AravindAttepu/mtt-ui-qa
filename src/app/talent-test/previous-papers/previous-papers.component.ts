import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-previous-papers',
  templateUrl: './previous-papers.component.html',
  styleUrls: ['./previous-papers.component.scss']
})
export class PreviousPapersComponent implements OnInit {
  data: any;
  showAns = false;
  questions: Array<{ ans: any, question: string }> = [];
  practiceQuestions: Array<{ ans: any, question: string }> = [];
  ansSheets = [];
  correctAnswers = [];
  isFormSubmitted = false;
  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit() {
  }
  onSelectTab($event) {
    this.data = $event;
    this.questions = this.data.questions;
    this.cancelForm();
  }
  showPractice(data) {
    this.showAns = true;
    this.practiceQuestions = [];
    
    try {
      this.apiService.showLoader.next(true);
      this.apiService.fetchQuestionsForPractice(data.value).subscribe((response: any) => {
        this.apiService.showLoader.next(false);
        if (response && response.length) {
          const numberOfRows = Math.ceil(response.length / 3);
          this.ansSheets = (new Array(numberOfRows * 3));
          this.practiceQuestions = response.map(val => {
            return {
              question: val,
              ans: null
            };
          });
        }
      }, error => {
        this.apiService.showLoader.next(false);
        if (error.error && error.error.message) {
          this.apiService.genericMessage(error.error.message || 'something went wrong', 'error');
        }
        console.log(error);
      });
    } catch (e) {
      console.warn(e);
    }
  }
  clearFormAndClose() {
    this.showAns = false;
    this.practiceQuestions = this.practiceQuestions.map((val, index) => {
      val.ans = null;
      return val;
    });
  }
  cancelForm() {
    this.showAns = false;
    this.isFormSubmitted = false;
    this.ansSheets = [];
  }
  submitForm() {
    const errorFields = document.querySelectorAll('.field-error-text');
    if (errorFields && errorFields.length) {
      this.apiService.genericMessage('Correct the errors and submit', 'error');
      return;
    }
    try {
      this.isFormSubmitted = true;
      this.apiService.showLoader.next(true);
      const payload: any = {
      };
      this.practiceQuestions.forEach((val, index) => {
        payload[index + 1] =  val.ans;
      });
      this.apiService.submitAnswers(payload, this.data.value).subscribe((response: any) => {
        this.apiService.showLoader.next(false);
        this.apiService.genericMessage('Successfully submitted', 'success');
        if (response) {
          this.correctAnswers = response;
        }
      }, error => {
        this.apiService.showLoader.next(false);
        if (error.error && error.error.message) {
          this.apiService.genericMessage(error.error.message || 'something went wrong', 'error');
        }
        console.log(error);
      });
    } catch (e) {
      console.warn(e);
    }
  }
}
