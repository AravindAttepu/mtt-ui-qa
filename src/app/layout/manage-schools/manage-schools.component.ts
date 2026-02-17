import { Component, OnInit} from '@angular/core';
import { ApiService } from '../../api.service';

interface School {
  id?: number;
  schoolName: string;
  village: string;
  mandal: string;
  district: string | null;
  isGovt: boolean;
}

interface ErrorResponse {
  error: string;
  message: string;
}

interface Zone {
  id: number;
  zoneName: string;
}

@Component({
  selector: 'app-manage-schools',
  templateUrl: './manage-schools.component.html',
  styleUrls: ['./manage-schools.component.scss']
})
export class ManageSchoolsComponent implements OnInit {

  name = '';
  district = '';

  // District/Zone dropdown list
  districtsList: Zone[] = [];

  results: School[] = [];
  hasSearched = false;
  loading = false;
  loadingZones = false;
  errorMsg = '';
  successMsg = '';

  // inline edit
  editingId: number | null = null;

  // create-if-not-found
  newSchoolMode = false;
  newSchool: School = {
    schoolName: '',
    village: '',
    mandal: '',
    district: '',
    isGovt: false
  };

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
      this.loadZones();
  }

  loadZones(): void {
      this.loadingZones = true;
      this.apiService.getZones().subscribe({
        next: (zones: any[]) => {
          this.loadingZones = false;
          console.log('Loaded zones:', zones);

          // Filter out UNSPECIFIED if needed
          this.districtsList = zones.filter((z: any)=> z.zoneName !== 'UNSPECIFIED');
          console.log('Filtered districtsList:', this.districtsList);
        },
        error: (err) => {
          this.loadingZones = false;
          console.error('Failed to load zones:', err);
          this.errorMsg = 'Failed to load districts';
        }
      });
    }

//   onSelectDistrict(): void {
//       if (this.selectedDistrict) {
//         this.district = this.selectedDistrict.zoneName;
//         console.log('Selected district:', this.district);
//       }
//     }
//
//   onSelectDistrictForNewSchool(zone: Zone): void {
//     if (zone) {
//       this.newSchool.district = zone.zoneName;
//       console.log('Selected district for new school:', this.newSchool.district);
//     }
//   }

  search(): void {
    this.hasSearched = true;
    this.loading = true;
    this.errorMsg = '';
    this.successMsg = '';
    this.newSchoolMode = false;

    this.apiService.searchSchools(this.name, this.district).subscribe({
      next: (schools: School[]) => {
        this.loading = false;
        this.results = schools;
        if (schools.length === 0) {
          this.errorMsg = 'No schools found!!';
        }
      },
      error: (err) => {
        this.loading = false;
        this.errorMsg = 'Failed to search schools';
        console.error(err);
      }
    });
  }

  clearSearch(): void {
    this.name = '';
    this.district = '';
    this.results = [];
    this.hasSearched = false;
    this.errorMsg = '';
    this.successMsg = '';
  }

  // ---- inline edit ----
  startEdit(s: School): void {
    if (!s.id) { return; }
    this.editingId = s.id;
  }

  cancelEdit(): void {
    this.editingId = null;
    // reload original data
    this.search();
  }

  saveEdit(s: School): void {
    if (!s.id) { return; }
    this.loading = true;
    this.errorMsg = '';
    this.successMsg = '';

    this.apiService.updateSchool(s).subscribe({
      next: () => {
        this.loading = false;
        this.successMsg = 'School updated successfully';
        this.editingId = null;
      },
      error: (err) => {
        this.loading = false;
        // Handle duplicate name error on update too
        if (err.status === 409) {
          const errorResponse: ErrorResponse = err.error;
          this.errorMsg = errorResponse.message || 'This school name already exists';
        } else {
          this.errorMsg = 'Failed to update school';
        }
        console.error(err);
      }
    });
  }

  // ---- create / add new school ----
  createNewSchool(): void {
    this.errorMsg = '';
    this.successMsg = '';
    this.loading = true;

    // simple validation
    if (!this.newSchool.schoolName ||
        !this.newSchool.village ||
        !this.newSchool.mandal ||
        !this.newSchool.district) {
      this.loading = false;
      this.errorMsg = 'Please fill all the required fields';
      return;
    }

    this.apiService.createSchool(this.newSchool).subscribe({
      next: (created: School) => {
        this.loading = false;
        this.successMsg = 'School created successfully';
        this.newSchoolMode = false;

        // make sure results array exists
        if (!this.results) {
          this.results = [];
        }

        this.results.unshift(created);
        this.name = created.schoolName;
        this.district = created.district || '';

        // reset form object for next time
        this.newSchool = {
          schoolName: '',
          village: '',
          mandal: '',
          district: null,
          isGovt: false
        };
      },
      error: (err) => {
        this.loading = false;
        console.error('Error creating school:', err);

        // Handle HTTP 409 Conflict (duplicate)
        if (err.status === 409) {
          const errorResponse: ErrorResponse = err.error;
          this.errorMsg = errorResponse.message || 'A school with this name already exists';

          // search for the existing school to show it
          this.searchExistingSchool(this.newSchool.schoolName);
        }
        // Handle other errors
        else if (err.status === 400) {
          this.errorMsg = 'Invalid school data. Please check all fields';
        }
        else if (err.status === 401) {
          this.errorMsg = 'You are not authorized to create schools';
        }
        else {
          this.errorMsg = 'Failed to create school. Please try again';
        }
      }
    });
  }

  // Search for existing school when duplicate is detected
  searchExistingSchool(schoolName: string): void {
    this.apiService.searchSchools(schoolName, '').subscribe({
      next: (schools: School[]) => {
        if (schools.length > 0) {
          this.results = schools;
          this.hasSearched = true;
          this.newSchoolMode = false;
          this.errorMsg = `School "${schoolName}" already exists. See results below.`;
        }
      },
      error: (err) => {
        console.error('Error searching for existing school:', err);
      }
    });
  }

  startCreateNewSchool(): void {
    this.newSchoolMode = true;
    this.hasSearched = false;  //hides any "no results" context

    this.newSchool = {
      schoolName: '',
      village: '',
      mandal: '',
      district: '',
      isGovt: false
    };
  }

  cancelCreateNewSchool(): void {
      this.newSchoolMode = false;
      this.errorMsg = '';
      this.successMsg = '';

      this.newSchool = {
        schoolName: '',
        village: '',
        mandal: '',
        district: '',
        isGovt: false
      };
    }
}
