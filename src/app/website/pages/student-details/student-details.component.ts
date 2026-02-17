import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { ApiService } from "src/app/api.service";
import { Router } from "@angular/router";
import { HttpErrorResponse } from "@angular/common/http";
import jspdf from 'jspdf';
import { CONSTANTS } from "src/app/api.constant";
import { trigger, state, style, animate, transition } from '@angular/animations';
import { WebcamImage, WebcamInitError, WebcamUtil } from "ngx-webcam";
import { Observable, Subject } from "rxjs";
@Component({
  selector: "app-student-details",
  templateUrl: "./student-details.component.html",
  styleUrls: ["./student-details.component.scss"],
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
  ],
})


export class StudentDetailsComponent implements OnInit {
  studentDetails: any = {};
  attributes: any = [];
  imageUrl: string;
  studentPhoto: string;
  studentStudyCertificate: string;
  studentId = null;
  isAPILoading = false;
  userName: string;
  password: string;
  studentName: string;
  parentName: string;
  schoolName: string;
  aadharNumber: string;
  examCentreName: string;
  resultsFlag: string;
  uploadFlag: string;
    studentImage: string = "";
  previewStudentImages: string = "";
  studentPhotos: File;
  previewImage: string =
    "https://h5p.org/sites/default/files/styles/medium-logo/public/logos/drag-and-drop-icon.png?itok=0dFV3ej6";

  imageChoice: string = "";
   public showWebcam = true;
  public allowCameraSwitch = true;
  public multipleWebcamsAvailable = false;
  public errors: WebcamInitError[] = [];

  constructor(
    private apiService: ApiService,
    private router: Router,
    private cd: ChangeDetectorRef) { }

  ngOnInit() {
    this.studentDetails = this.apiService.getUserDetails() || {};
    if (this.studentDetails) {
      this.studentId =
        this.studentDetails.roles && this.studentDetails.roles.userName
          ? this.studentDetails.roles.userName
          : "";
      this.getStudentDetails();
    } else {
      console.warn("no data found");
    }
    WebcamUtil.getAvailableVideoInputs()
      .then((mediaDevices: MediaDeviceInfo[]) => {
        this.multipleWebcamsAvailable = mediaDevices && mediaDevices.length > 1;
      });
  }
  stream: any = null;
    status: any = null;
    trigger: Subject<void> = new Subject<void>();
    webcamPreviewImage: string = '';
    webcamImg: WebcamImage = null;
    captureBtnLable: string = "";
    facingMode: string = 'user';


  public get videoOptions(): MediaTrackConstraints {
    const result: MediaTrackConstraints = {};
    if (this.facingMode && this.facingMode !== '') {
      result.facingMode = { ideal: this.facingMode };
    }
    return result;
  }
    resetImage() {
    this.previewStudentImages = "";
    this.studentImage = "";
    this.studentPhotos = null;
  }
  removeImg() {
    this.studentImage = "";
    this.studentPhoto = null;
  }
  imageFileProgress(event: any) {
    const file = event.target.files;
    this.studentImageUploadFile(file);
  }

  // Image upload things
  studentImageUploadFile(event: any) {
    const reader = new FileReader(); // HTML5 FileReader API
    const file = event[0];
    if (event) {
      reader.readAsDataURL(file);
      // When file uploads set it to file formcontrol
      reader.onload = (ev: any) => {
        this.studentPhoto = file;
        this.studentImage = ev.target.result;
        this.previewStudentImages = ev.target.result;
      };
      // ChangeDetectorRef since file is loading outside the zone
      this.cd.markForCheck();
    }
  }
    // check perms for webcam access



  // webcam trigger
  get $trigger(): Observable<void> {
    return this.trigger.asObservable();
  }

  snapshot(event: WebcamImage) {
    // console.log("snapshot", event);
    this.webcamPreviewImage = event.imageAsDataUrl;
    this.studentImage = event.imageAsDataUrl;
    this.captureBtnLable = "Retake Image";
    const arr = event.imageAsDataUrl.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    const file: File = new File([u8arr], "StudentPhoto", { type: "JPEG" })
    // console.log(file);
    this.studentPhotos = file;
  }
  uploadCapturedImage() {
    try {
      // console.log("saveImages", this.studentImage);
      if (this.studentImage) {
        let data = new FormData();
        data.append("studentPhoto", this.studentPhotos);
        this.apiService.showLoader.next(true);
        const studentId = this.userName;
        console.log(studentId)
        this.apiService.addStudentImage(data, studentId).subscribe(
          (res) => {
            this.apiService.showLoader.next(false);
           // this.isFormSubmitted = false;
           // this.regDone = true;
            if (res && typeof res === "string") {
              const response = JSON.parse(res);
              if (response && response.message) {
                // this.imageUploadService.refreshAssets.next({time: new Date().getTime(), type: payLoad.mediaType});
                // this.galleryImages = [];
                // this.previewImages = [];
                // this.galleryUpload.reset();
               // this.apiService.genericMessage(response.message, "success");
                this.apiService.genericMessage(
                "Photo uploaded successfully! Please login again to download your hall ticket.",
                "success"
              );
               // Redirect to login after 2 seconds
              setTimeout(() => {
                this.router.navigate(['/login']);
              }, 5000); // 5000 ms = 5 seconds
              }
            }
          },
          (err: HttpErrorResponse) => {
            this.apiService.showLoader.next(false);
            if (err.status === 401) {
              this.router;
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
          }
        );
      }
    } catch (e) {
      console.warn(e);
    }
  }


  // check perms for webcam access
  checkPermissions() {
    navigator.mediaDevices.getUserMedia({
      video: {
        width: 500,
        height: 500
      }
    }).then((res) => {
      // console.log("Camera allowed: ", res);
      this.stream = res;
      this.status = "Allowed";
      this.captureBtnLable = "Capture Image";
    }).catch(e => {
      // console.log(e);
      if (e?.message === 'Permission denied') {
        this.status = "Permission Denied please allow camera access";
      } else {
        this.status = "Camera not found. Please retry...";
      }
    })
  }

  captureImage() {
    this.trigger.next();
  }

  handleWebcamInitError(error: WebcamInitError): void {
    if (error.mediaStreamError && error.mediaStreamError.name === "NotAllowedError") {
      console.warn("Camera access was not allowed by user!");
    }
    this.errors.push(error);
  }
  showUploadBlockedMessage() {
  window.alert("REGISTRATIONS ARE OVER. PHOTO CANNOT BE UPLOADED NOW.");
}

  getStudentDetails() {
    this.apiService.getStudentDetails(this.studentId).subscribe(
      (res: any) => {
        res.user = res.user || {};
        res.student = res.student || {};
        res.school = res.school || {};
        res.examCentre = res.examCentre || {};
        res.paper = res.paper || {};
        res.correctAnswers = res.correctAnswers || {};
        this.uploadFlag = CONSTANTS.STUDENT_PHOTO_UPLOAD_FLAG;
         this.resultsFlag = CONSTANTS.RESULTS_FLAG;

        if (this.resultsFlag == "true") {
          res = {
            userName: res.user.userName, studentName: res.user.studentName,
            parentName: res.student.parentName,
            schoolName: res.school.schoolName,
            aadharNumber: res.student.aadharNumber,
            contactNumber: res.user.contactNumber,
            secondaryContact: res.student.secondaryContact,
            score: res.student.score,
            rank: res.student.rank,
            correctAnswers: res.student.correctAnswers,
            imageUrl: res.paper.archivedImageUrl,
            studentPhotoUrl: res.student.studentPhotoUrl,
            examCentreName: res.examCenter.examCenterName,
          };
        }
        else {
          res = {
            userName: res.user.userName, studentName: res.user.studentName,
            parentName: res.student.parentName,
            schoolName: res.school.schoolName,
            aadharNumber: res.student.aadharNumber,
            contactNumber: res.user.contactNumber,
            secondaryContact: res.student.secondaryContact,
            imageUrl: res.paper.archivedImageUrl,
            studentPhotoUrl: res.student.studentPhotoUrl,
            examCentreName: res.examCenter.examCenterName,
          };
        }


        Object.keys(res).forEach((key) => {
          if (
            key !== "imageUrl" &&
            key !== "password" &&
            key !== "modified_on" &&
            key !== 'studentPhotoUrl' &&
            key !== 'studentStudyCertUrl'
          ) {

            if (key == "userName")
              this.attributes.push({
                key: "REGISTRATION NUMBER",
                value: res[key],
              });
            if (key == "studentName")
              this.attributes.push({
                key: "STUDENT NAME",
                value: res[key],
              });
            if (key == "parentName")
              this.attributes.push({
                key: "PARENT NAME",
                value: res[key],
              });
            if (key == "schoolName")
              this.attributes.push({
                key: "SCHOOL NAME",
                value: res[key],
              });

            if (key == "examCentreName")
              this.attributes.push({
                key: "EXAM CENTRE",
                value: res[key],})

            if (key == "score")
              this.attributes.push({
                key: "SCORE",
                value: res[key],
              });
            if (key == "contactNumber")
              this.attributes.push({
                key: "CONTACT NO",
                value: res[key],
              });
            if (key == "aadharNumber")
              this.attributes.push({
                key: "AADHAR NUMBER",
                value: res[key],
              });
            if (key == "secondaryContact")
              this.attributes.push({
                key: "SECONDARY CONTACT",
                value: res[key],
              });
            if (key == "rank")
              this.attributes.push({
                key: "RANK",
                value: res[key],
              });
            if (key == "correctAnswers")
              this.attributes.push({
                key: "CORRECT ANSWERS",
                value: res[key],
              });
          }

          if (key === "imageUrl") {
            this.imageUrl = res[key];
          }
          if (key === "studentPhotoUrl") {
            this.studentPhoto = res[key];
          }
          if (key === "userName") {
            this.userName = res[key];
          }
          if (key === "password") {
            this.password = res[key];
          }
          if (key === "studentName") {
            this.studentName = res[key];
          }
          if (key === "parentName") {
            this.parentName = res[key];
          }
           if (key === "aadharNumber") {
            this.aadharNumber = res[key];
          }
          if (key === "schoolName") {
            this.schoolName = res[key];
          }
          if (key === "examCentreName") {
            this.examCentreName = res[key];
          }

        });
      },
      (error) => {
        console.log(error);
      }
    );

  }
  download() {
    if (!this.userName) {
      alert('Something went wrong. Please try again!');
      return;
    }

    const dt = new Date();
    const year = dt.getFullYear();
    const examTimeDay = "09th November, Sunday at 11:00 AM";

    const heading = `SADISHA MATH TALENT TEST-${year}`;
    var doc = new jspdf();

    // Header and logo
    doc.setTextColor(0, 0, 255);
    doc.addImage("/assets/images/sadisha.png", "JPEG", 90, 10, 30, 30);
    doc.setFont("times", "italic");
    doc.setFontSize(20);
    doc.text(heading, 105, 60, { align: "center" });
    doc.setTextColor(255, 0, 0);
    doc.text(`HALL TICKET`, 105, 50, { align: "center" });
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(18);

    // Image borders
    doc.rect(144, 69, 57, 70);
    if (this.studentPhoto) {
      doc.addImage(doc.loadFile(this.studentPhoto), "JPEG", 145, 85, 55, 45);
    }

    // Text borders
    doc.rect(9, 69, 135, 20);
    doc.rect(9, 89, 135, 25);
    doc.rect(9, 114, 135, 25);
    doc.rect(9, 139, 192, 10);  // Box for Aadhar number
    doc.rect(9, 149, 192, 10);  // Box for School Name

    // Add the details as text
    doc.text(`Registration Number:  ${this.userName}`, 10, 75, { maxWidth: 130, baseline: 'top' });
    doc.text(`Student Name: ${this.studentName || ''}`, 10, 90, { maxWidth: 130, baseline: 'top' });
    doc.text(`Parent Name: ${this.parentName || ''}`, 10, 115, { maxWidth: 130, baseline: 'top' });
    doc.text(`Aadhar Number: ${this.aadharNumber || ''}`, 10, 140, { maxWidth: 190, baseline: 'top' });
    doc.text(`School Name: ${this.schoolName || ''}`, 10, 150, { maxWidth: 190, baseline: 'top' });

    // Handle long Exam Center Name by splitting the text into multiple lines if needed
    var examCenterText = doc.splitTextToSize(`Exam Center Name: ${this.examCentreName || ''}`, 180);

    // Dynamically calculate the height of the wrapped exam center text
    var examCenterTextHeight = examCenterText.length * 7; // Approximate line height is 7

    // Create a new rectangle for Exam Center Name based on text height
    doc.rect(9, 159, 192, examCenterTextHeight + 5); // Adjust box height based on text
    doc.rect(9, 178, 192, 10); // Box for examCenterName

    // Add the exam center name text inside the adjusted box
    doc.text(examCenterText, 10, 165); // Adjust starting y-position to avoid overlap
    doc.text(`Exam Date and Time: ${examTimeDay}`, 10, 185);

    // Add the notice for candidates
    doc.setFontSize(15);
    doc.setTextColor(255, 0, 0);
    doc.text(`Please arrive at the exam center 1 hour before the exam.
      Candidate must bring the printed or electronic-copy of the Hall-Ticket.
    Otherwise the candidate is not allowed to write the exam.`, 105, 190 + examCenterTextHeight, { align: "center" });

    doc.setFontSize(14);
    doc.setTextColor(255, 0, 0);

    // Save the PDF
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      var blob = doc.output('blob');
      window.open(URL.createObjectURL(blob));
    } else {
      doc.save('hall-ticket.pdf');
    }
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
