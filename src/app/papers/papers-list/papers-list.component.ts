import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Router } from "@angular/router";
import { NgbModal, NgbModalConfig } from "@ng-bootstrap/ng-bootstrap";
import { ApiService } from "src/app/api.service";
import { trigger, state, style, animate, transition } from '@angular/animations';
@Component({
  selector: "app-papers-list",
  templateUrl: "./papers-list.component.html",
  styleUrls: ["./papers-list.component.scss"],
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
  ]
})
export class PapersListComponent implements OnInit {
  allPapersList: any[] = []; // Master Copy
  papersList: Array<any> = [];
  selectedPath: string = "";
  selectedIndex: number = 0;
  isBasedOnStatus: boolean = true;
  selectedStatus: string = 'IN_PROGRESS';
  user: any = "";
  userName: string = "";
  deleteItemIndex: number = 0;
  rejectedPapers: number = 0;
  verifiedPapers: number = 0;
  pendingPapers: number = 0;
  allPapers: number = 0;
  offset = 0;
  limit = 50;
  isLoading = false;
  shouldLoadPapers: boolean = true;

  @ViewChild('anchor', { static: true }) anchor!: ElementRef<HTMLElement>;

  private observer!: IntersectionObserver;

  constructor(
    private apiService: ApiService,
    private router: Router,
    private modalService: NgbModal,
    private config: NgbModalConfig
  ) {
    this.config.backdrop = "static";
    this.config.keyboard = false;
  }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem("adminUser")) || null;
    this.loadPapersCounts();
    this.papersList = [
      {
        id: 1,
        evaluator: "paper1",
        imageUrl:
          "https://cdn.pixabay.com/photo/2017/08/11/14/02/paper-2631126_1280.jpg",
        status: "Rejected",
      },
    ];
    this.selectedPath = this.papersList[0].path;
  }

  ngAfterViewInit(): void {
    this.observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !this.isLoading) {
        this.loadMorePapers();
      }
    });

    this.observer.observe(this.anchor.nativeElement);
    this.apiService.showLoader.next(true);
    this.loadMorePapers();

  }

  loadMorePapers() {
    this.isLoading = true;
    this.apiService.fetchPapersBasedOnStatus(this.selectedStatus, this.offset, this.limit).subscribe(
      (res) => {
        this.allPapersList = [...this.allPapersList, ...res];
        this.offset += this.limit;
        this.isLoading = false;
        this.apiService.showLoader.next(false);
      },
      (error: HttpErrorResponse) => {
        this.isLoading = false;
        this.handleError(error);
      }
    );
  }

  loadPapersCounts(): void {
    this.apiService.getStatusCounts().subscribe({
      next: (res) => {
        this.verifiedPapers = res.VERIFIED || 0;
        this.rejectedPapers = res.REJECTED || 0;
        // Pending includes both IN_PROGRESS and APPROVED_IN_PROGRESS
        this.pendingPapers = (res.IN_PROGRESS || 0) + (res.APPROVED_IN_PROGRESS || 0);
        // All papers is sum of all statuses
        this.allPapers = this.verifiedPapers + this.pendingPapers + this.rejectedPapers;
        console.log('Status counts:', res);
      },
      error: (err) => {
        console.error('Failed to load status counts', err);
      }
    });
  }

  handleError(error) {
    this.apiService.showLoader.next(false);
    if (error.status === 401) {
      this.router.navigate(["/login"]);
      return;
    }
    if (error.error && error.error.message) {
      this.apiService.genericMessage(
        error.error.message || "something went wrong",
        "error"
      );
    } else {
      this.apiService.genericMessage("something went wrong", "error");
    }
    console.log(error);
  }
  getPapersByUser() {
    this.apiService.showLoader.next(true);
    this.apiService.fetchPapersBasedOnUser(this.userName).subscribe(
      (res) => {
        this.apiService.showLoader.next(false);
        this.allPapersList = res;
      },
      (error: HttpErrorResponse) => {
        this.handleError(error);
      }
    );
  }
  selectType(type) {
    this.isBasedOnStatus = type == "user" ? false : true;
    this.allPapersList = [];
    this.selectedPath = "";
    if (!this.isBasedOnStatus) {
      this.observer.disconnect();

    }
    else {
      this.observer.observe(this.anchor.nativeElement);
      this.selectStatus("IN_PROGRESS");
    }
  }

  selectStatus(status) {
    this.selectedStatus = status;
    this.offset = 0;
    this.allPapersList = []; // Clear immediately
    this.selectedPath = ""; // Clear preview
    this.selectedIndex = 0; // Reset selection
    this.loadMorePapers();

  }
  selectPaper(index) {
    this.selectedIndex = index;
    this.selectedPath = this.allPapersList[index].signedImageUrl || this.allPapersList[index].imageUrl;
  }
  deletePaper(content, index) {
    this.deleteItemIndex = index;
    this.modalService.open(content);
  }
  confirmDelete(index) {
    let url = this.papersList[index].imageUrl;
    let status = this.papersList[index].status;
    this.apiService.showLoader.next(true);
    this.apiService.deletePapers(url, status).subscribe(
      (res) => {
        this.modalService.dismissAll();
        this.apiService.showLoader.next(false);
        this.papersList.splice(index, 1);
      },
      (error: HttpErrorResponse) => {
        this.modalService.dismissAll();
        this.handleError(error);
      }
    );
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
