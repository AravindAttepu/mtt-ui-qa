import { HttpErrorResponse } from "@angular/common/http";
import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ApiService } from "src/app/api.service";
import jspdf from 'jspdf';
import { Observable, Subject } from "rxjs";
import { WebcamImage, WebcamInitError, WebcamUtil } from "ngx-webcam";
import { prepareSyntheticListenerFunctionName } from "@angular/compiler/src/render3/util";

@Component({
  selector: "app-students-registration",
  templateUrl: "./students-registration.component.html",
  styleUrls: ["./students-registration.component.scss"],
})
export class StudentsRegistrationComponent implements OnInit {
  registrationForm: FormGroup;
  isAPILoading = false;
  formSubmitted = false;
  showForm = true;
  regDone = false;
  selectedFile: File | null = null;
  isFormSubmitted: boolean = false;
  newStudent: any = {};
  genders: Array<string> = ["MALE", "FEMALE"];
  classesList: Array<string> = ["10th Class"];
  mediusList: Array<string> = ["Telugu", "English"];
  districtsList: any = [];
  schoolsList: Array<string> = [];
  mandalsList: any = [];
  examCentersList: any = [];
  examCentersInDistrictsList: any = [];
  studentImage: string = "";
  previewStudentImages: string = "";
  studentPhoto: File;
  previewImage: string =
    "https://h5p.org/sites/default/files/styles/medium-logo/public/logos/drag-and-drop-icon.png?itok=0dFV3ej6";
  examCenterName: string = "";
  public showWebcam = true;
  public allowCameraSwitch = true;
  public multipleWebcamsAvailable = false;
  public errors: WebcamInitError[] = [];
  imageChoice: string = "";
  videoModalVisible = false;
  videoURL = 'https://www.youtube.com/embed/IBgWOMtvYgE';
  safeVideoURL: any;

  // public videoOptions: MediaTrackConstraints = {
  //   width: {ideal: 500},
  //   height: {ideal: 500}
  // };
  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private cd: ChangeDetectorRef,
    private router: Router,
    private sanitizer: DomSanitizer
  ) {
    this.registrationForm = this.fb.group({
      surName: ["", [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      studentName: ["", [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      parentName: ["", Validators.required],
      gender: ["", Validators.required],
      zone: ["", Validators.required],
      mandal: ["", Validators.required],
      schoolName: ["", Validators.required],
      contactNumber: ["", Validators.required],
      secondaryContact: [""],
      aadharNumber: ["", Validators.required],
      TandC: [false, Validators.requiredTrue],
      emailId: [""]
    });
  }

  ngOnInit() {
    return;
    this.getAllSchools();
    this.getListOfExamCenters();

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
    this.studentPhoto = file;
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

  openModal() {
    this.safeVideoURL = this.sanitizer.bypassSecurityTrustResourceUrl(this.videoURL + '?autoplay=1');
    this.videoModalVisible = true;
  }

  closeModal() {
    this.videoModalVisible = false;
    this.safeVideoURL = null; // stops video immediately
  }
  openRegForm() {
    this.registrationForm.reset();
    this.showForm = true;
    this.isFormSubmitted = false;
  }

  // Image upload things
  studentImageUploadFile(event: any) {
    const reader = new FileReader(); // HTML5 FileReader API
    // const file = event[0];
    const file = event.target.files[0];
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
  removeImg() {
    this.studentImage = "";
    this.studentPhoto = null;
  }
  imageFileProgress(event: any) {
    //const file = event.target.files;
    this.studentImageUploadFile(event);
  }
  resetImage() {
    this.previewStudentImages = "";
    this.studentImage = "";
    this.studentPhoto = null;
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

  saveImages() {
    try {
      // console.log("saveImages", this.studentImage);
      if (this.studentImage) {
        let data = new FormData();
        data.append("studentPhoto", this.studentPhoto);
        this.apiService.showLoader.next(true);
        const studentId = this.newStudent.user.userName;
        this.apiService.addStudentImage(data, studentId).subscribe(
          (res) => {
            this.apiService.showLoader.next(false);
            this.isFormSubmitted = false;
            this.regDone = true;
            if (res && typeof res === "string") {
              const response = JSON.parse(res);
              if (response && response.message) {
                // this.imageUploadService.refreshAssets.next({time: new Date().getTime(), type: payLoad.mediaType});
                // this.galleryImages = [];
                // this.previewImages = [];
                // this.galleryUpload.reset();
                this.apiService.genericMessage(response.message, "success");
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

  getListOfExamCenters() {
    try {
      this.apiService.showLoader.next(true);
      this.apiService.getListOfExamCenters().subscribe(
        (res: any) => {
          this.apiService.showLoader.next(false);
          if (res && Object.keys(res)) {
            this.examCentersInDistrictsList = res;
          }
        }
      );
    } catch (e) {
      console.warn(e);
    }
  }

  getAllSchools() {
    try {
      this.apiService.showLoader.next(true);
      this.apiService.getListOfSchools().subscribe(
        (res: any) => {
          this.apiService.showLoader.next(false);
          // console.log(res);
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

  onSelectDistrict(): void {
    this.mandalsList = [];
    const selectedDist = this.registrationForm.value.zone;
    if (selectedDist && selectedDist.mandals) {
      this.mandalsList = selectedDist.mandals;
      this.examCentersList = this.examCentersInDistrictsList[selectedDist.name];
    }
    this.mandalsList.sort((a, b) => {
      return a.name.localeCompare(b.name);
    });
  }

  onSelectMandal(): void {
    this.schoolsList = [];
    const selectedMandal = this.registrationForm.value.mandal;
    if (selectedMandal && selectedMandal.schools) {
      this.schoolsList = selectedMandal.schools;
    }
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  registerStudent(): void {
    this.newStudent = {};
    this.formSubmitted = true;
    if (this.registrationForm.invalid) {
      return;
    }
    if (!this.studentPhoto) {
      alert("Please upload student image");
      return;
    }
    const payload: any = { ...this.registrationForm.value };
    if (
      payload.contactNumber.length < 10 ||
      (payload.secondaryContact && payload.secondaryContact.length < 10)
    ) {
      return;
    }
    if (payload.aadharNumber.length < 12) {
      alert("Please enter valid Aadhar Number");
      return;
    }
    if (payload.emailId && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.emailId)) {
      alert("Please enter a valid Email ID");
      return;
    }
    payload.zone = payload.zone && payload.zone.name ? payload.zone.name : "";
    payload.center = "";
    payload.studentName = payload.studentName.trim() + " " + payload.surName.trim();
    delete payload.mandal;
    // console.log("payload:", payload);
    try {
      this.apiService.showLoader.next(true);
      // this.apiService.studentRegistration(payload).subscribe(
      this.apiService.registerStudentWithPhoto(payload, this.studentPhoto).subscribe(
        (res: any) => {
          if (res.message) {
            this.apiService.genericMessage(res.message, "warning");
            this.isFormSubmitted = false;
            this.showForm = true;

          } else {
            this.showForm = false;
            this.isFormSubmitted = true;
            this.newStudent = res;
            this.examCenterName = res.examCenter.examCenterName;
            this.apiService.genericMessage("Successfully registered!", "success");
          }

          this.resetForm();
          this.apiService.showLoader.next(false);
        },
        (error) => {
          this.apiService.showLoader.next(false);
          if (error.error && error.error.message) {
            // Show alert with backend message
            alert(error.error.message);
            this.apiService.genericMessage(error.error.message, "error");
          } else {
            alert("Something went wrong");
            this.apiService.genericMessage("Something went wrong", "error");
          }
          console.error(error);

        }
      );
    } catch (e) {
      console.warn(e);
    }
  }

  resetForm() {
    this.registrationForm.reset();
    this.webcamPreviewImage = "";
    this.previewStudentImages = "";
    this.stream = null;
    this.status = null;
    this.formSubmitted = false;
    this.isAPILoading = false;
  }

  download() {
    if (!this.newStudent.user) {
      alert('Something went wrong. Please try again!');
      return;
    }

    const dt = new Date();
    const year = dt.getFullYear();
    const examTimeDay = "09th November, Sunday at 11:00 AM";

    const heading = `SADISHA MATH TALENT TEST-${year}`;
    var doc = new jspdf();
    var imgURI = this.studentImage || "";

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
    if (imgURI) {
      doc.addImage(imgURI, "JPEG", 145, 85, 55, 45);
    }

    // Text borders
    doc.rect(9, 69, 135, 20);   // Registration Number box
    doc.rect(9, 89, 135, 25);   // Student Name box
    doc.rect(9, 114, 135, 25);  // Parent Name box
    doc.rect(9, 139, 192, 10);  // Aadhar Number box
    doc.rect(9, 149, 192, 10);  // School Name box

    // Add the details as text
    doc.text(`Registration Number:  ${this.newStudent.user.userName}`, 10, 75, { maxWidth: 130, baseline: 'top' });
    doc.text(`Student Name: ${this.newStudent.user.studentName || ''}`, 10, 90, { maxWidth: 130, baseline: 'top' });
    doc.text(`Parent Name: ${this.newStudent.student.parentName || ''}`, 10, 115, { maxWidth: 130, baseline: 'top' });
    doc.text(`Aadhar Number: ${this.newStudent.student.aadharNumber || ''}`, 10, 140, { maxWidth: 190, baseline: 'top' });
    doc.text(`School Name: ${this.newStudent.school.schoolName || ''}`, 10, 150, { maxWidth: 190, baseline: 'top' });

    // Handle long Exam Center Name by splitting the text into multiple lines if needed
    var examCenterText = doc.splitTextToSize(`Exam Center Name: ${this.examCenterName || ''}`, 180);

    // Dynamically calculate the height of the wrapped exam center text
    var examCenterTextHeight = examCenterText.length * 7; // Approximate line height is 7

    // Create a new rectangle for Exam Center Name based on text height
    doc.rect(9, 159, 192, examCenterTextHeight + 5); // Adjust box height based on text
    doc.rect(9, 178, 192, 10); // Box for examCenterName

    // Add the exam center name text inside the adjusted box
    doc.text(examCenterText, 10, 167); // Adjust starting y-position to avoid overlap
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
}
