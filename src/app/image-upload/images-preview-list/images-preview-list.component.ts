import { Component, OnInit, Input } from "@angular/core";
import { ApiService } from "src/app/api.service";
import { HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";
import { ImageUploadService } from "../image-upload.service";
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: "app-images-preview-list",
  templateUrl: "./images-preview-list.component.html",
  styleUrls: ["./images-preview-list.component.scss"],
})
export class ImagesPreviewListComponent implements OnInit {
  @Input() labelsList: Array<string> = [];
  photosList: Array<any> = [];
  isFirstTimeVideoOpen = true;
  constructor(
    private apiService: ApiService,
    private router: Router,
    private imageUploadService: ImageUploadService,
    private sanitizer: DomSanitizer
    ) {}
  // photosList = [{
  //   mediaUrl: 'https://images.unsplash.com/photo-1628243426757-b092ba839ff9?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1740&q=80',
  //   mediaName: 'Photo name',
  //   active: false
  // }];
  videosList = [];
  isImageView = true;
  ngOnInit() {
    this.getGalleryImages("photos");
    this.imageUploadService.refreshAssets.subscribe((res: any) => {
      if (res && res.type) {
        this.getGalleryImages(res.type);
      }
    });
  }
  onClickVideo() {
    this.isImageView = false;
    if (this.isFirstTimeVideoOpen) {
      this.getGalleryImages("videos");
    }
  }
  editAsset(i, photoObj, type) {
    this.imageUploadService.editAssets.next({index: i, asset: photoObj, type});
  }
  updateActiveStatus(i, photoObj, type) {
    const payload = {
      isActive: photoObj.active,
    };
    try {
      this.apiService.showLoader.next(true);
      this.apiService
        .updateGalleryAssetStatus(payload, photoObj.mediaUrl)
        .subscribe(
          (res) => {
            this.apiService.showLoader.next(false);
            // this.getGalleryImages(type);
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
  getGalleryImages(type) {
    try {
      this.apiService.showLoader.next(true);
      this.apiService.getAllGalleryImages(type).subscribe(
        (res) => {
          this.apiService.showLoader.next(false);
          if (type === "videos") {
            this.videosList = res;
            this.videosList = this.videosList.map(val => {
              val.path = val.mediaUrl;
              if (val.path) {
                val.path = val.path.split('"').filter(path => path).join();
                val.path = this.sanitizer.bypassSecurityTrustResourceUrl(val.path);
              }
              return val;
            });
          } else {
            this.photosList = res;
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
}
