import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit, Input, ChangeDetectorRef } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ApiService } from "src/app/api.service";
import { ImageUploadService } from "src/app/image-upload/image-upload.service";
import { WebcamImage, WebcamInitError, WebcamUtil } from "ngx-webcam";
import { Observable, Subject } from "rxjs";

@Component({
  selector: "app-new-image-upload",
  templateUrl: "./new-image-upload.component.html",
  styleUrls: ["./new-image-upload.component.scss"],
})
export class NewImageUploadComponent implements OnInit {
  @Input() labelsList: Array<string> = [];
  galleryUpload: FormGroup;
  serverResponce: string = "";
  isResponceSuccess: boolean = false;
  showLeftDiv: boolean = true;
  answerSheet: File;
  paperImage: string = "";
  maxDate: any = new Date().toLocaleDateString();
  formSubmitted = false;
  public showWebcam = true;
  public allowCameraSwitch = true;
  public multipleWebcamsAvailable = false;
  public errors: WebcamInitError[] = [];

  previewImage: string =
    "https://h5p.org/sites/default/files/styles/medium-logo/public/logos/drag-and-drop-icon.png?itok=0dFV3ej6";
  url: string =
    "https://h5p.org/sites/default/files/styles/medium-logo/public/logos/drag-and-drop-icon.png?itok=0dFV3ej6";
 
  constructor(
    private fb: FormBuilder,
    private cd: ChangeDetectorRef,
    private apiService: ApiService,
    private router: Router,
    private imageUploadService: ImageUploadService
  ) {}

  ngOnInit() {
    WebcamUtil.getAvailableVideoInputs()
    .then((mediaDevices: MediaDeviceInfo[]) =>{
      this.multipleWebcamsAvailable = mediaDevices && mediaDevices.length > 1;
    });
  }
  hideAlert(){
    this.showLeftDiv = true; 
    this.webcamPreviewImage = "";
  }
  
  sendDetails() {
    try {
      
      if (this.paperImage) {
        let data = new FormData();
        data.append("answerSheet", this.answerSheet);
        this.apiService.showLoader.next(true);
        
        this.apiService.addPaperImage(data).subscribe(
          (res) => {
            if (res && typeof res === "string") {
              const response = JSON.parse(res);
              if (response && response.message) {
                this.apiService.genericMessage(response.message, "success");
                this.apiService.showLoader.next(false);
                this.showLeftDiv = true; 
                this.webcamPreviewImage = "";
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
              console.log(err.error);
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

 
  stream: any = null;
  status: any = null;
  trigger: Subject<void> = new Subject<void>();
  webcamPreviewImage: string = '';
  webcamImg: WebcamImage = null;
  captureBtnLable: string = "";

  facingMode: string = 'environment';

  public get videoOptions(): MediaTrackConstraints {
    const result: MediaTrackConstraints = {};
    if(this.facingMode && this.facingMode !== '') {
      result.facingMode = { ideal: this.facingMode };
    }
    return result;
  }

  // webcam trigger
  get $trigger(): Observable<void> {
    return this.trigger.asObservable();
  }

  snapshot(event: WebcamImage) {
    console.log("snapshot", event);
    this.webcamPreviewImage = event.imageAsDataUrl;
    this.paperImage = event.imageAsDataUrl;
    this.captureBtnLable = "Retake Image";
    const arr = event.imageAsDataUrl.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    const file: File = new File([u8arr], "AnswerSheet", { type: "JPEG" })
    console.log(file);
    this.answerSheet = file;
    
  }

  // check perms for webcam access
  checkPermissions() {
    console.log("checkPermissions");
    navigator.mediaDevices.getUserMedia({
      video: {
        width: 500,
        height: 500
      }
    }).then((res) => {
      console.log("Camera allowed: ", res);
      this.stream = res;
      this.status = "Allowed";
      this.captureBtnLable = "Capture Image";
    }).catch(e => {
      console.log(e);
      if (e?.message === 'Permission denied') {
        this.status = "Permission Denied please allow camera access";
      } else {
        this.status = "Camera not found. Please retry...";
      }
    })
  }

  captureImage() {
    this.trigger.next();
    this.showLeftDiv = false; 
   // this.sendDetails(); 
  }

  handleWebcamInitError(error: WebcamInitError): void {
    if (error.mediaStreamError && error.mediaStreamError.name === "NotAllowedError") {
      console.warn("Camera access was not allowed by user!");
    }
    this.errors.push(error);
  }

}
