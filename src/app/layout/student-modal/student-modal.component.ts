import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { StudentEditComponent } from "../student-edit/student-edit.component";

@Component({
  selector: "app-student-modal",
  templateUrl: "./student-modal.component.html",
  styleUrls: ["./student-modal.component.scss"],
})
export class StudentModalComponent implements OnInit {
  studentsForm: FormGroup;
  showEditForm: boolean = false;
  genders: Array<string> = ["Male", "Female"];
  classesList: Array<string> = ["10th Class"];
  mediusList: Array<string> = ["Telugu", "English"];
  districtsList: any = [];
  schoolsList: Array<string> = [];
  mandalsList: any = [];
  studentsList: Array<any> = [];
  studentData: any = {};
  formSubmitted = false;
  isAPILoading = false;
  studentId: string;

  constructor(
    private dialogRef: MatDialogRef<StudentEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.studentData = this.data.studentData;
    this.districtsList = this.data.district;
    this.initEditForm();
  }
  closeTab() {
    this.dialogRef.close();
  }
  initEditForm() {
    this.studentsForm = this.fb.group({
      studentName: ["", Validators.required],
      parentName: ["", Validators.required],
      studentClass: ["10th Class", Validators.required],
      gender: ["", Validators.required],
      zone: ["", Validators.required],
      mandal: ["", Validators.required],
      schoolName: ["", Validators.required],
      contactNumber: ["", Validators.required],
      userName: [null],
    });
    this.studentsForm.patchValue({
      studentName: this.studentData.studentName,
      parentName: this.studentData.parentName,
      studentClass: this.studentData.studentClass,
      gender: this.studentData.gender,
      zone: this.studentData.zone,
      mandal: this.studentData.mandal,
      schoolName: this.studentData.schoolName,
      contactNumber: this.studentData.contactNumber,
      userName: this.studentData.userName,
    });
    this.showEditForm = true;
  }
  updateStudent() {
    console.log("Student ", this.studentsForm.value);
  }
  onSelectDistrict(): void {
    this.mandalsList = [];
    const selectedDist = this.studentsForm.value.zone;
    if (selectedDist && selectedDist.mandals) {
      this.mandalsList = selectedDist.mandals;
    }
  }

  resetForm() {
    this.studentsForm.reset();
    this.formSubmitted = false;
    this.isAPILoading = false;
    this.studentId = "";
    this.showEditForm = false;
  }

  onSelectMandal(): void {
    this.schoolsList = [];
    const selectedMandal = this.mandalsList.filter((val) => {
      return this.studentsForm.value.mandal === val.name;
    });
    // const selectedMandal = this.studentsForm.value.mandal;
    if (selectedMandal && selectedMandal[0].schools) {
      this.schoolsList = selectedMandal[0].schools;
    }
  }
}
