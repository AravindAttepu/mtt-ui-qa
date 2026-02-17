import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  // State variables
  private isSideNavOpened = false;
  isRegisterDropdownOpen = false;
  isProgramsDropdownOpen = false;
  isAboutUsDropdownOpen = false;
  isMenuOpen = false;
  isMobile = false;
  public userDetails: any = {};

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.checkIfMobile();
    window.addEventListener('resize', () => this.checkIfMobile());
  }

  /** -------------------------
   *  Menu & SideNav Handlers
   *  ------------------------- */

  toggleMenu(event: Event) {
    if (event) {
      event.stopPropagation();
    }
    this.isMenuOpen = !this.isMenuOpen;

    if (this.isMenuOpen) {
      document.body.classList.add('body-lock');
    } else {
      document.body.classList.remove('body-lock');
    }
  }

  closeMenu() {
    this.isMenuOpen = false;
    document.body.classList.remove('body-lock');
  }

  toggleSideNav() {
    // Future implementation for side nav toggle
    // this.apiService.sideNavOpened.next(!this.isSideNavOpened);
  }

  /** -------------------------
   *  Dropdown Handlers
   *  ------------------------- */

  toggleRegisterDropdown(event: Event) {
    event.preventDefault();
    this.isRegisterDropdownOpen = !this.isRegisterDropdownOpen;
  }

  handleRegisterToggle(event: Event) {
    if (this.isMobile) {
      event.preventDefault();
      this.isRegisterDropdownOpen = !this.isRegisterDropdownOpen;
    }
  }

  handleProgramsToggle(event: Event) {
    if (this.isMobile) {
      event.preventDefault();
      this.isProgramsDropdownOpen = !this.isProgramsDropdownOpen;
    }
  }

  handleAboutUsToggle(event: Event) {
    if (this.isMobile) {
      event.preventDefault();
      this.isAboutUsDropdownOpen = !this.isAboutUsDropdownOpen;
    }
  }

  /** -------------------------
   *  Hover Handlers (Desktop Only)
   *  ------------------------- */

  onRegisterMouseEnter() {
    if (!this.isMobile) this.isRegisterDropdownOpen = true;
  }

  onRegisterMouseLeave() {
    if (!this.isMobile) this.isRegisterDropdownOpen = false;
  }

  onProgramsMouseEnter() {
    if (!this.isMobile) this.isProgramsDropdownOpen = true;
  }

  onProgramsMouseLeave() {
    if (!this.isMobile) this.isProgramsDropdownOpen = false;
  }

  onAboutUsMouseEnter() {
    if (!this.isMobile) this.isAboutUsDropdownOpen = true;
  }

  onAboutUsMouseLeave() {
    if (!this.isMobile) this.isAboutUsDropdownOpen = false;
  }

  /** -------------------------
   *  Misc Handlers
   *  ------------------------- */

  logOut() {
    // TODO: implement logout logic
  }

  checkIfMobile() {
    this.isMobile = window.innerWidth < 992; // Bootstrap lg breakpoint
  }
}
