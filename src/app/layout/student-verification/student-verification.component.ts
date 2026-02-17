import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { WebcamImage, WebcamInitError } from 'ngx-webcam';

@Component({
  selector: 'app-student-verification',
  templateUrl: './student-verification.component.html',
  styleUrls: ['./student-verification.component.scss']
})
export class StudentVerificationComponent implements OnInit {

  // 🔹 Search fields
  userName: string = '';
  contactNumber: string = '';
  aadharNumber: string = '';

  studentDetails: any = null;
  errorMessage: string = '';
  loading: boolean = false;
  loadingText: string = '';

  // 🔹 Webcam-related fields
  showWebcam: boolean = false;
  capturedImage: string | null = null;
  trigger: Subject<void> = new Subject<void>();
  videoOptions: MediaTrackConstraints = { width: 320, height: 240 };
  // 📸 Webcam configuration
  videoHeight: number = 240;
  videoWidth: number = 320;
  baseUrl = this.apiService.baseUrl;

  constructor(private apiService: ApiService, private httpClient: HttpClient) {}

  ngOnInit(): void {}

  // ====================================================
  // 🔍 Search + Verify Logic
  // ====================================================

  /** Search student by username, contact, or aadhar */
  searchStudent(): void {
    if (!this.userName && !this.contactNumber && !this.aadharNumber) {
      this.errorMessage = 'Please enter at least one field to search';
      return;
    }

    this.loadingText = 'Searching...';
    this.loading = true;
    this.errorMessage = '';
    this.studentDetails = null;

    const payload = {
      user_name: this.userName,
      contact_number: this.contactNumber,
      aadhar_number: this.aadharNumber
    };

    this.apiService.searchStudent(payload).subscribe({
      next: (response: any) => {
        this.studentDetails = {
          userName: response.username,
          studentName: response.studentname,
          parentName: response.parentname,
          contactNumber: response.contactnumber,
          aadharNumber: response.aadharnumber,
          zone: response.zone,
          examCentreName: response.examcentername,
          studentPhotoUrl: response.studentphotourl,
          verificationStatus: response.verificationstatus
        };
        this.loading = false;
      },
      error: (error) => {
        this.loading = false;
        if (error.status === 404) {
          this.errorMessage = 'Student not found';
        } else {
          this.errorMessage = 'An unexpected error occurred';
        }
      }
    });
  }

  /** Verify student */
  verifyStudent(): void {
    if (!this.studentDetails?.userName && !this.studentDetails?.user_name) return;

    const userName = this.studentDetails.userName || this.studentDetails.user_name;
    this.loadingText = 'Verifying...';
    this.loading = true;

    this.apiService.verifyStudent(userName).subscribe({
      next: () => {
        this.loading = false;
        this.studentDetails.verificationStatus = 'VERIFIED';
      },
      error: () => {
        this.loading = false;
        alert('Error verifying student. Please try again.');
      }
    });
  }

  // ====================================================
  // 📸 Webcam Capture Logic
  // ====================================================

  /** Return trigger as observable */
  get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  /** Show/hide webcam */
  toggleWebcam(): void {
    this.showWebcam = !this.showWebcam;
    this.capturedImage = null;
  }

cancelWebcam(): void {
  this.showWebcam = false;
  this.capturedImage = null;
}


  /** Trigger webcam snapshot */
  capturePhoto(): void {
    this.trigger.next();
  }

  /** Handle captured image */
  handleImage(webcamImage: WebcamImage): void {
    this.capturedImage = webcamImage.imageAsDataUrl;
    this.showWebcam = false;
  }

  /** Handle webcam init errors */
  handleWebcamError(error: WebcamInitError): void {
    console.error('Webcam initialization error:', error);
    alert('Unable to access webcam. Please allow camera permissions.');
  }

  /** Retake/reset photo */
  retakePhoto(): void {
    this.capturedImage = null;
    this.showWebcam = true;
  }

  /** Convert DataURI to Blob */
  private dataURItoBlob(dataURI: string): Blob {
    const byteString = atob(dataURI.split(',')[1]);
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  }

  /** Upload captured photo */
  uploadCapturedImage(): void {
    if (!this.capturedImage || !this.studentDetails?.userName) {
      alert('No photo or student found!');
      return;
    }

    const userName = this.studentDetails.userName;
    const blob = this.dataURItoBlob(this.capturedImage);
    const formData = new FormData();
    formData.append('studentPhoto', blob, `${userName}.jpg`);

    this.httpClient.post(`${this.baseUrl}/uploadPhoto/${userName}`, formData).subscribe({
      next: () => {
        alert('✅ Photo uploaded successfully!');
        this.studentDetails.studentPhotoUrl = this.capturedImage;
        this.capturedImage = null;
      },
      error: (err) => {
        console.error('Upload failed:', err);
        alert('❌ Failed to upload photo. Please try again.');
      }
    });
  }
}
