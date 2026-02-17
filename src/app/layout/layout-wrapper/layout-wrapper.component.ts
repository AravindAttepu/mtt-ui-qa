import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-layout-wrapper',
  templateUrl: './layout-wrapper.component.html',
  styleUrls: ['./layout-wrapper.component.scss']
})
export class LayoutWrapperComponent implements OnInit {
  public isSideNavOpened = false;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.apiService.sideNavOpened.subscribe((flag: boolean) => {
      this.isSideNavOpened = flag;
    });
  }

  closeSideNav() {
    this.isSideNavOpened = false;
    this.apiService.sideNavOpened.next(false);
  }
}
