import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material";
import { StudentModalComponent } from "../student-modal/student-modal.component";


@Component({
  selector: "app-role-management",
  templateUrl: "./role-management.component.html",
  styleUrls: ["./role-management.component.scss"],
})
export class RoleManagementComponent implements OnInit {
  data: any = {
    roles: ["Admin", "Super Admin", "Evaluator", "Volunteer"],
    screens: [
      { screen: "Student Creation", access: [true, false, false, true] },
      { screen: "Student Edit", access: [true, false, false, true] },
      { screen: "Student Delete", access: [true, true, false, true] },
      { screen: "Paper Creation", access: [true, false, false, true] },
    ],
  };

  districtsList: any = [];
  hardCodeData: any = {};

  selectedIndex: number = 0;
  constructor(private dialog: MatDialog) {}


  ngOnInit() {}
  update() {
    console.log(this.data);
  }

  selectStudent(index) {
    let dailogRef = this.dialog.open(StudentModalComponent, {
      panelClass: "col-md-6",
      hasBackdrop: true,
      disableClose: true,
      data: { studentData: this.hardCodeData, district: this.districtsList },
    });
  }

  checkValue(index, role) {
    debugger;
    this.data.screens[index].access[role] =
      !this.data.screens[index].access[role];
  }
}
