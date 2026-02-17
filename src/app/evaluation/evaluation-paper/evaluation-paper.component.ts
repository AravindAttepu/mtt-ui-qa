import { ApiService } from "src/app/api.service";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: "app-evaluation-paper",
  templateUrl: "./evaluation-paper.component.html",
  styleUrls: ["./evaluation-paper.component.scss"],
  animations: [
    // Each unique animation requires its own trigger. The first argument of the trigger function is the name
    trigger('rotatedState', [
      state('default', style({ transform: 'rotate(0)' })),
      state('rotate90', style({ transform: 'rotate(90deg)' })),
      state('rotate180', style({ transform: 'rotate(180deg)' })),
      state('rotate270', style({ transform: 'rotate(270deg)' })),

      transition('default => rotate90', animate('400ms ease-in')),
      transition('rotate90 => rotate180', animate('400ms ease-in')),
      transition('rotate180 => rotate270', animate('400ms ease-out')),
      transition('rotate270 => default', animate('400ms ease-out'))
    ])
  ]
})



export class EvaluationPaperComponent implements OnInit {
  constructor(private apiService: ApiService, private router: Router) { }
  isPageLoaded = false;
  isFormSubmitted = false;
  paperDetails: any = {};
  questionPapers = new Array(10);
  rejectPaper = false;

  submitPaper(): void {
    this.isFormSubmitted = true;
    const answersArray = [];
    for (let i = 0; i < this.questionPapers.length; i++) {
      answersArray[i] =
        !this.questionPapers[i] && this.questionPapers[i] !== 0
          ? null
          : Number(this.questionPapers[i]);
    }
    try {
      this.apiService.showLoader.next(true);
      const payload = {
        ...this.paperDetails,
        userName: this.paperDetails.userName || "",
        status: this.rejectPaper ? "REJECTED" : "VERIFIED",
        answers: "[" + answersArray.toString() + "]",
      };
      this.apiService.submitAnswerPaper(payload).subscribe(
        (res: any) => {
          this.apiService.showLoader.next(false);
          if (res.status === 200) {
            if (res.body) {
              const message = JSON.parse(JSON.parse(res.body)).message;
              console.log(message);
              if (message.includes("reg number")) {
                this.apiService.genericMessage(
                  message,
                  "error"
                );
              } else {

                this.apiService.genericMessage("Successfully Submitted", "success");
                const response =
                  res.body && typeof res.body === "string"
                    ? JSON.parse(res.body)
                    : {};
                this.resetValues();
                this.getPaperDetails();
              }
            }
          }
        },
        (error) => {
          this.apiService.showLoader.next(false);
          if (error.status === 401) {
            this.router.navigate(["/login"]);
            return;
          }
          if (error.error) {
            const serverError =
              typeof error.error === "string" ? JSON.parse(error.error) : {};
            this.apiService.genericMessage(
              serverError.error || "something went wrong",
              "error"
            );
          }
          console.log(error);
        }
      );
    } catch (e) {
      console.warn(e);
    }

    console.log(answersArray);
  }

  resetValues() {
    this.isFormSubmitted = false;
    this.rejectPaper = false;
    this.paperDetails = {};
    this.questionPapers = new Array(10);
  }

  getPaperDetails() {
    try {
      this.apiService.showLoader.next(true);
      this.apiService.getAnswerPaper().subscribe(
        (res: any) => {
          this.isPageLoaded = true;
          this.apiService.showLoader.next(false);

          if (res.status === 200) {
            const response =
              res.body && typeof res.body === "string"
                ? JSON.parse(res.body)
                : {};
            if (response && Object.keys(response)) {
              this.paperDetails = response;
              if (
                this.paperDetails &&
                this.paperDetails.pendingStatus &&
                this.paperDetails.pendingStatus === "UNSPECIFIED"
              ) {
                this.apiService.genericMessage(
                  "No pending papers yet. Please retry after some time!",
                  "error"
                );
              }

              try {
                var answerString = this.paperDetails.answers;

                if (answerString && answerString.length > 2) {
                  const answers = answerString.substring(1, answerString.length - 1).split(",");
                  answers.forEach((answer, index) => {
                    if (answer && parseInt(answer)) {
                      this.questionPapers[index] = parseInt(answer);
                    }
                  });
                }
              } catch (e) {
                console.warn(e);
              }
            }
          }
        },
        (error) => {
          this.isPageLoaded = true;
          this.apiService.showLoader.next(false);
          if (error.status === 401) {
            this.router.navigate(["/login"]);
            return;
          }
          if (error.error && error.error.message) {
            this.apiService.genericMessage(
              error.error.message || "something went wrong",
              "error"
            );
          }
          console.log(error);
        }
      );
    } catch (e) {
      console.warn(e);
    }
  }





  ngOnInit() {
    this.getPaperDetails();
  }

  state: string = 'default';

  rotate() {
    if (this.state === 'default') {
      this.state = 'rotate90'
    }
    else if (this.state === 'rotate90') {
      this.state = 'rotate180'
    }
    else if (this.state === 'rotate180') {
      this.state = 'rotate270'
    }
    else {
      this.state = 'default'
    }
  }
}

