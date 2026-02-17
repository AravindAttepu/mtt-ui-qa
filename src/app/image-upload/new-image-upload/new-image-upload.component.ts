import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit, Input, ChangeDetectorRef } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ApiService } from "src/app/api.service";
import { ImageUploadService } from "../image-upload.service";

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
  isImageUpload: boolean = true;
  galleryImages: Array<any> = [];
  previewImages: Array<any> = [];
  maxDate: any = new Date().toLocaleDateString();
  formSubmitted = false;

  previewImage: string =
    "https://h5p.org/sites/default/files/styles/medium-logo/public/logos/drag-and-drop-icon.png?itok=0dFV3ej6";
  url: string =
    "https://h5p.org/sites/default/files/styles/medium-logo/public/logos/drag-and-drop-icon.png?itok=0dFV3ej6";
  editAssetObj: any = {};
  editAsset = false;
  constructor(
    private fb: FormBuilder,
    private cd: ChangeDetectorRef,
    private apiService: ApiService,
    private router: Router,
    private imageUploadService: ImageUploadService
  ) {}

  ngOnInit() {
    this.galleryUpload = this.fb.group({
      mediaName: ["", Validators.required],
      mediaDesc: ["", Validators.required],
      mediaPlace: ["", Validators.required],
      image: ["", Validators.required],
    });
    this.imageUploadService.editAssets.subscribe((res: any) => {
      if (res && Object.keys(res).length && res.asset) {
        this.isImageUpload = res.type === 'photos';
        this.editAssetObj = res;
        this.editAsset = true;
        this.galleryUpload.patchValue({...res.asset});
      }
    });
  }

  updateAssetDetails() {
    const value = { ...this.galleryUpload.value };
    const payload = {
      mediaName: value.mediaName,
      mediaType: value.mediaType,
      mediaDesc: value.mediaDesc,
      mediaPlace: value.mediaPlace
    };
    try {
      this.apiService.showLoader.next(true);
      this.apiService
        .updateGalleryAssetStatus(payload, this.editAssetObj.asset.mediaUrl)
        .subscribe(
          (res) => {
            this.apiService.showLoader.next(false);
            if (res && typeof res === "string") {
              const response = JSON.parse(res);
              this.apiService.genericMessage(response.message, "success");
              this.imageUploadService.refreshAssets.next({time: new Date().getTime(), type: this.editAssetObj.type});
              this.editAsset = false;
              this.galleryUpload.reset();
            }
          },
          (err: HttpErrorResponse) => {
            this.apiService.showLoader.next(false);
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
          }
        );
    } catch (e) {
      console.warn(e);
    }
  }

  imageUpload() {
    this.isImageUpload = true;
    if (this.galleryUpload.contains("videoUrl")) {
      this.previewImage = this.url;
      this.galleryUpload.addControl(
        "image",
        this.fb.control("", [Validators.required])
      );
      this.galleryUpload.removeControl("videoUrl");
    }
  }
  videoUpload() {
    this.isImageUpload = false;
    if (this.galleryUpload.contains("image")) {
      this.galleryUpload.addControl(
        "videoUrl",
        this.fb.control("", [Validators.required])
      );
      this.galleryUpload.removeControl("image");
    }
  }

  hideAlert(){
    this.isResponceSuccess = false;
  }

  sendDetails() {
    try {
      let endUrl = "photos";
      const payLoad = { ...this.galleryUpload.value };
      payLoad.mediaType = this.isImageUpload ? "photos" : "videos";
      let data = new FormData();
      if (this.isImageUpload) {
        data = new FormData();
        delete payLoad.image;
        payLoad.mediaType = "photos";
        this.galleryImages.forEach((file) => {
          data.append("gallery", file);
        });
        data.append("galleryStr", JSON.stringify({ ...payLoad }));
      } else {
        payLoad.mediaType = "videos";
        delete payLoad.videoUrl;
        endUrl = "videos";
        data.append(
          "gallery",
          JSON.stringify(this.galleryUpload.get("videoUrl").value)
        );
        data.append("galleryStr", JSON.stringify({ ...payLoad }));
      }
      this.apiService.showLoader.next(true);
      this.apiService.addGallery(data, endUrl).subscribe(
        (res) => {
          this.apiService.showLoader.next(false);
          if (res && typeof res === "string") {
            const response = JSON.parse(res);
            if (response && response.message) {
              this.imageUploadService.refreshAssets.next({time: new Date().getTime(), type: payLoad.mediaType});
              this.galleryImages = [];
              this.previewImages = [];
              this.galleryUpload.reset();
              this.apiService.genericMessage(response.message, "success");
            }
          }
        },
        (err: HttpErrorResponse) => {
          this.apiService.showLoader.next(false);
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
        }
      );
    } catch (e) {
      console.warn(e);
    }
  }
  fileProgress(event: any) {
    const file = event.target.files;
    this.uploadFile(file);
  }
  uploadFile(event: any) {
    const reader = new FileReader(); // HTML5 FileReader API
    const file = event[0];
    if (event) {
      reader.readAsDataURL(file);
      // When file uploads set it to file formcontrol
      reader.onload = (ev: any) => {
        // this.galleryUpload.get('image').setValue(file);
        this.galleryImages.push(file);
        this.previewImages.push(ev.target.result);
      };
      // ChangeDetectorRef since file is loading outside the zone
      this.cd.markForCheck();
    }
  }
  removeImg(img, index) {
    this.previewImages.splice(index, 1);
    this.galleryImages.splice(index, 1);
  }

  showGallery() {
    console.log("Show Gallery functions");
  }
}
