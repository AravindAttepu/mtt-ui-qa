import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.scss']
})
export class AdminHeaderComponent implements OnInit {
  public userDetails: any = {};
  public userId = '';

  constructor(private apiService: ApiService) {
    const userDetails = JSON.parse(localStorage.getItem('adminUser') || '{}');
    this.userDetails = userDetails.attributes;
    const userId = localStorage.getItem('userName');
    this.userId = userId;
  }

  ngOnInit() {
  }

  toggleSideNav() {
    this.apiService.sideNavOpened.next(true);
  }

}
