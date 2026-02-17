import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';


@Component({
  selector: 'app-student-stats',
  templateUrl: './student-stats.component.html',
  styleUrls: ['./student-stats.component.scss']
})
export class StudentStatsComponent implements OnInit {
  allUsers: any = [];
  allRoles: Array<string> = [];
  zones: Array<string> = [];
  mandals: Array<string> = [];
  districtsList: any = [];
  zonesList: any = [];
  schoolsList: Array<string> = [];
  mandalsList: any = [];

  // Statistics
  totalStudents = 0;
  totalMandals = 0;
  totalZones = 0;
  avgStudentsPerMandal = 0;
  topZone: any = null;

  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.getStudentsStats();
  }

  calculateOverallStats() {
    this.totalZones = this.districtsList.length;
    this.totalStudents = this.zonesList.reduce((sum, zone) => sum + zone.s, 0);
    this.totalMandals = this.districtsList.reduce((sum, district) =>
      sum + district.mandals.length, 0);
    this.avgStudentsPerMandal = this.totalMandals > 0
      ? Math.round(this.totalStudents / this.totalMandals)
      : 0;

    // Find top zone
    if (this.zonesList.length > 0) {
      this.topZone = this.zonesList.reduce((max, zone) =>
        zone.s > max.s ? zone : max, this.zonesList[0]);
    }
  }

  getZonesStats() {
    this.zonesList = [];
    for (let zone of this.districtsList) {
      let name = zone.name;
      let students = 0;
      for (let mandal of zone.mandals) {
        students += mandal.students;
      }
      this.zonesList.push({
        n: name,
        s: students
      });
    }

    // Sort zones by student count
    this.zonesList.sort((a, b) => b.s - a.s);

    this.calculateOverallStats();
    console.log("Zones" + this.zonesList);
  }

  formatDistrictsData(data): void {
    if (data && Object.keys(data).length) {
      this.districtsList = Object.keys(data).map((key) => {
        const mandals = Object.keys(data[key]).map((mandalName) => {
          return {
            name: mandalName,
            students: data[key][mandalName],
          };
        });
        // Sort mandals by students
        mandals.sort((a, b) => {
          return b.students - a.students;
        });

        return {
          name: key,
          mandals,
        };
      });

      this.getZonesStats();
    }
  }

  getStudentsStats() {
    try {
      this.apiService.showLoader.next(true);
      this.apiService.getStudentsStats().subscribe(
        (res: any) => {
          this.apiService.showLoader.next(false);
          console.log(res);
          if (res && Object.keys(res)) {
            this.formatDistrictsData(res);
          }
        }
      );
    } catch (error) {
      this.apiService.showLoader.next(false);
      // if (error.status === 401) {
      //   this.router.navigate(['/login']);
      //   return;
      // }
      if (error.error) {
        const serverError =
          typeof error.error === 'string' ? JSON.parse(error.error) : {};
        this.apiService.genericMessage(
          serverError.error || 'something went wrong',
          'error'
        );
      }
      console.log(error);
    }
  }

}
