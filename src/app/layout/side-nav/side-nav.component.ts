import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ApiService } from "src/app/api.service";

@Component({
  selector: "app-side-nav",
  templateUrl: "./side-nav.component.html",
  styleUrls: ["./side-nav.component.scss"],
})
export class SideNavComponent implements OnInit {
  public navlinkList = [];
  public rolesList: any = [];
  public userRoles: any = [];
  private isSideNavOpened = false;
  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit() {
    this.userRoles = this.apiService.getRole();
    const allNavLinks = [
      {
        name: "User Management",
        link: ["/admin/user-management"],
        isQuery: false,
        icon: "",
      },
      {
        name: "Papers",
        link: ["/admin/papers/paper-list"],
        isQuery: false,
        icon: "",
      },
      {
        name: "Students",
        link: ["/admin/student-edit"],
        isQuery: false,
        icon: "",
      },
      {
        name: "Upload Paper",
        link: ["/admin/paper-upload"],
        isQuery: false,
        icon: "",
      },
      {
        name: "Evaluation",
        link: ["/admin/evaluation/paper"],
        isQuery: false,
        icon: "",
      },
      {
        name: "Gallery",
        link: ["/admin/gallery-upload"],
        isQuery: false,
        icon: "",
      },
      {
        name: "Students Stats",
        link: ["/admin/student-stats"],
        isQuery: false,
        icon: "",
      },
      {
        name: "Student Details",
        link: ["/admin/student-edit"],
        isQuery: true,
        queryParam: { isdetails: true },
        icon: "",
      },
      {
        name: "Compute Final Results",
        link: ["/admin/compute-final-results"],
        isQuery: false,
        icon: "",
      },
      {
       name: "Student Verification",
       link: ["/admin/student-verification"],
       isQuery: false,
       icon: "",
      },
      {
       name: "Manage Schools",
       link: ["/admin/manage-schools"],
       isQuery: false,
       icon: "",
      }
    ];
    const userManagement = allNavLinks[0];
    const papers = allNavLinks[1];
    const students = allNavLinks[2];
    const evaluation = allNavLinks[3];
    const gallery = allNavLinks[4];
    const studentDetails = allNavLinks[5];
    const studentUpdate = allNavLinks[6];
    const studentVerification = allNavLinks[9];
    const ManageSchools = allNavLinks[10];
    if (
      this.userRoles.indexOf("ADMIN") > -1 ||
      this.userRoles.indexOf("SUPER_ADMIN") > -1
    ) {
      this.navlinkList = allNavLinks;
    } else if (this.userRoles.indexOf("VERIFIER") > -1) {
      this.navlinkList.push(
        students,
        evaluation,
        gallery,
        studentDetails,
        studentUpdate,
        studentVerification
      );
    } else if (this.userRoles.indexOf("EVALUATOR") > -1) {
      this.navlinkList.push(gallery, studentDetails, studentVerification);
    } else if (this.userRoles.indexOf("VOLUNTEER") > -1) {
      this.navlinkList.push(gallery, studentVerification);
    } else if (this.userRoles.indexOf("STUDENT") > -1) {
    } else if (this.userRoles.indexOf("QUESTION_MAKER") > -1) {
    }
    if (this.navlinkList && this.navlinkList.length) {
      this.router.navigate(this.navlinkList[0].link);
    }
    this.apiService.sideNavOpened.subscribe((flag: boolean) => {
      if (this.isSideNavOpened !== flag) {
        this.isSideNavOpened = flag;
      }
    });
    this.rolesList = this.apiService.rolesList;
  }
  closeSideNav() {
    if (this.isSideNavOpened) {
      this.apiService.sideNavOpened.next(false);
    }
  }
  get isAdmin() {
    return !!(this.rolesList.indexOf("ADMIN") > -1);
  }
  get isEmployee() {
    return !!(this.rolesList.indexOf("USER") > -1);
  }
  get isSecurity() {
    return !!(this.rolesList.indexOf("SECURITY") > -1);
  }
}
