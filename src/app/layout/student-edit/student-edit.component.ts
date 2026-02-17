import { Component, OnInit } from "@angular/core";
import { ApiService } from "src/app/api.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { StudentModalComponent } from "../student-modal/student-modal.component";
import { MatDialog } from "@angular/material";
import { NgbModal, NgbModalConfig } from "@ng-bootstrap/ng-bootstrap";
import { HttpErrorResponse } from "@angular/common/http";
import { ActivatedRoute, Router } from "@angular/router";
@Component({
  selector: "app-student-edit",
  templateUrl: "./student-edit.component.html",
  styleUrls: ["./student-edit.component.scss"],
})
export class StudentEditComponent implements OnInit {
  studentId: string;
  studentDetails: any = {};
  showEditForm = false;
  studentsForm: FormGroup;

  isAPILoading = false;
  formSubmitted = false;
  showForm = true;
  newStudent: any = {};
  genders: Array<string> = ["Male", "Female"];
  classesList: Array<string> = ["10th Class"];
  mediusList: Array<string> = ["Telugu", "English"];
  districtsList: any = [];
  schoolsList: Array<string> = [];
  mandalsList: any = [];
  studentsList: Array<any> = [];
  hardCodeData: any = {};
  showTable: boolean = false;
  isClearAns: boolean = false;
  alertMsg: string = "";
  isStudentDetails: boolean = false;
  selectedIndex: number = 0;

  constructor(
    private apiService: ApiService,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private modalService: NgbModal,
    private config: NgbModalConfig,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.isStudentDetails = params.isdetails === "true";
    });
    this.isStudentDetails && this.getRandomStudent();
  }

  ngOnInit() {
    // this.getAllStudents();
    this.initEditForm();
    this.getAllSchools();
    this.studentsList = this.apiService.dummyStudents;
  }
  initEditForm() {
    this.studentsForm = this.fb.group({
      studentName: ["", Validators.required],
      parentName: ["", Validators.required],
      //studentClass: ["10th Class", Validators.required], commenting this validator as it's not required currently
      gender: ["", Validators.required],
      aadharNumber: ["",Validators.required],
      zone: ["", Validators.required],
      mandal: ["", Validators.required],
      schoolName: ["", Validators.required],
      contactNumber: ["", Validators.required],
      secondaryContact: [""],
      emailId: ["", Validators.required],
      userName: [null],
    });
  }
  deleteStudent(content) {
    this.isClearAns = false;
    this.alertMsg = "This action cannot be undone.";
    this.modalService.open(content);
  }
  delete() {
    this.isClearAns ? this.confirmClearAns() : this.confirmDelete();
  }
  confirmDelete() {
    this.apiService.showLoader.next(true);
    this.apiService.deleteStudent(this.studentId).subscribe(
      (res) => {
        this.apiService.showLoader.next(false);
        let responce = JSON.parse(res);
        this.apiService.genericMessage(responce.message, "success");
        this.modalService.dismissAll();
        this.showEditForm = false;
      },
      (err: HttpErrorResponse) => {
        this.apiService.showLoader.next(false);
        this.modalService.dismissAll();
        if (err.status === 401) {
          this.router.navigate(["/login"]);
          return;
        }
        if (err.error) {
          const serverError =
            typeof err.error === "string" ? JSON.parse(err.error) : {};
          this.apiService.genericMessage(
            serverError.error || "something went wrong",
            "error"
          );
        }
        console.log(err);
      }
    );
  }
  clearAnswers(content) {
    this.isClearAns = true;
    this.alertMsg = "Do You want to clear this Student answers";
    this.modalService.open(content);
  }
  confirmClearAns() {
    this.apiService.showLoader.next(true);
    this.apiService.clearStudentAns(this.studentId).subscribe(
      (res) => {
        this.apiService.showLoader.next(false);
        this.apiService.genericMessage(res, "success");
        this.modalService.dismissAll();
        this.showEditForm = false;
      },
      (err: HttpErrorResponse) => {
        this.apiService.showLoader.next(false);
        this.modalService.dismissAll();
        if (err.status === 401) {
          this.router.navigate(["/login"]);
          return;
        }
        if (err.error) {
          const serverError =
            typeof err.error === "string" ? JSON.parse(err.error) : {};
          this.apiService.genericMessage(
            serverError.error || "something went wrong",
            "error"
          );
        }
        console.log(err);
      }
    );
  }
  showStudentDetails(res) {
    if (res && res.user) {
      this.studentDetails = res.user;
      this.hardCodeData = { ...this.studentDetails };
      this.hardCodeData.studentName =
        this.studentDetails.studentName || this.studentDetails.name;
      this.studentId = this.studentDetails.userName;
      this.studentDetails.studentName =
        this.studentDetails.studentName || this.studentDetails.name;
      this.studentsForm.patchValue({ ...this.studentDetails });
      this.studentsForm.patchValue({
        mandal: res.school.mandal,
        schoolName: res.school.schoolName,
      });
      this.studentsForm.get("parentName").setValue(res.student.parentName);
      this.studentsForm.get("aadharNumber").setValue(res.student.aadharNumber);
      this.studentsForm.get("emailId").setValue(res.student.emailId);
      this.studentsForm
        .get("secondaryContact")
        .setValue(res.student.secondaryContact);
      this.onSelectDistrict();
      this.showEditForm = true;
      console.log('this.studentsForm:', this.studentsForm)
    } else {
      this.apiService.genericMessage(res.message || "No Student Found", "info");
    }
  }
  getStudentDetails() {
    this.apiService.showLoader.next(true);
    try {
      this.apiService.getStudentDetails(this.studentId).subscribe(
        (res) => {
          this.apiService.showLoader.next(false);
          this.showStudentDetails(res);
        },
        (err: HttpErrorResponse) => {
          this.apiService.showLoader.next(false);
          if (err.status === 401) {
            this.router.navigateByUrl("/login");
          } else {
            console.warn(err.message);
          }
        }
      );
    } catch (e) {
      this.apiService.showLoader.next(false);
      console.log("Student error", e);
    }
  }
  selectStudent(index) {
    let dailogRef = this.dialog.open(StudentModalComponent, {
      panelClass: "col-md-6",
      hasBackdrop: true,
      disableClose: true,
      data: { studentData: this.hardCodeData, district: this.districtsList },
    });
  }

  formatDistrictsData(data): void {
    if (data && Object.keys(data).length) {
      this.districtsList = Object.keys(data).map((key) => {
        const mandals = Object.keys(data[key]).map((mandalName) => {
          return {
            name: mandalName,
            schools: data[key][mandalName],
          };
        });
        return {
          name: key,
          mandals,
        };
      });
    }
  }

  getAllSchools() {
    try {
      this.apiService.showLoader.next(true);
      this.apiService.getListOfSchools().subscribe(
        (res: any) => {
          this.apiService.showLoader.next(false);
          if (res && Object.keys(res)) {
            this.formatDistrictsData(res);
          }
        },
        (error) => {
          this.apiService.showLoader.next(false);
          // if (error.status === 401) {
          //   this.router.navigate(['/login']);
          //   return;
          // }
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
  }
  getRandomStudent() {
    try {
      this.apiService.showLoader.next(true);
      this.apiService.getRandomStudent().subscribe(
        (res: any) => {
          this.apiService.showLoader.next(false);
          if (res) {
            this.showStudentDetails(res);
            // this.formatDistrictsData(res);
          }
        },
        (error) => {
          this.apiService.showLoader.next(false);
          // if (error.status === 401) {
          //   this.router.navigate(['/login']);
          //   return;
          // }
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
  }

  onSelectDistrict(): void {
    this.mandalsList = [];
    let val = { ...this.studentsForm.value };
    if (val.zone.name) {
      this.mandalsList = val.zone.mandals;
      return;
    }
    const selectedDist = this.districtsList.filter((val) => {
      return this.studentsForm.value.zone === val.name;
    });
    if (selectedDist[0] && selectedDist[0].mandals) {
      this.mandalsList = selectedDist[0].mandals;
    }
  }

  onSelectMandal(): void {
    this.schoolsList = [];
    console.log(this.mandalsList);
    const selectedMandal = this.studentsForm.value.mandal;
    console.log(selectedMandal);

    if (selectedMandal && selectedMandal.schools) {
      this.schoolsList = selectedMandal.schools;
    }
  }

  updateStudent(): void {
    this.newStudent = {};
    this.formSubmitted = true;

      // 👇 Put this BEFORE the invalid check
      const payload1 = this.studentsForm.value;
      console.log('Payload:', payload1);
      console.log('Form validity:', this.studentsForm.valid);
      console.log('Form errors:', this.studentsForm.errors);
      console.log('Controls:', this.studentsForm.controls);
    if (this.studentsForm.invalid) {
      return;
    }
    const payload: any = { ...this.studentsForm.value };
    if (payload.contactNumber.length < 10) {
      return;
    }
    if (payload.aadharNumber.length < 12)
    {
      alert("Please enter valid Aadhar Number");
      return;
    }
    if (!payload.emailId || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.emailId)) {
      alert("Please enter a valid Email ID");
      return;
    }
    payload.zone = payload.zone && payload.zone.name ? payload.zone.name : "";
    payload.center = "";
    delete payload.mandal;
    try {
      this.apiService.showLoader.next(true);
      this.apiService.updateStudent(payload, this.studentId).subscribe(
        (res: any) => {
          if (res) {
            this.showForm = false;
            this.newStudent = res;
          }
          this.apiService.showLoader.next(false);
          this.apiService.genericMessage("Successfully updated!", "success");
          this.resetForm();
          this.isStudentDetails && this.getRandomStudent();
        },
        (error) => {
          this.apiService.showLoader.next(false);
          // if (error.status === 401) {
          //   this.router.navigate(['/login']);
          //   return;
          // }
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
  }

  resetForm() {
    this.studentsForm.reset();
    this.formSubmitted = false;
    this.isAPILoading = false;
    this.studentId = "";
    this.showEditForm = false;
  }
}
