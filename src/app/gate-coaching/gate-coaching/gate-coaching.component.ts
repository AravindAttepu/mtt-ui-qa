import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-gate-coaching',
  templateUrl: './gate-coaching.component.html',
  styleUrls: ['./gate-coaching.component.scss']
})
export class GateCoachingComponent implements OnInit {

  isHomePage: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Detect route changes and update home page state
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.isHomePage = event.urlAfterRedirects.includes('/gate-coaching/home');
      });
  }

}
