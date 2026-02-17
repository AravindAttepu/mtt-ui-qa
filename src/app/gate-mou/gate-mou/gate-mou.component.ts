import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-gate-mou',
  templateUrl: './gate-mou.component.html',
  styleUrls: ['./gate-mou.component.scss']
})
export class GATEMOUComponent implements OnInit {
 isHomePage: boolean = false;

  constructor(private router: Router) {}


 ngOnInit(): void {
     // Detect route changes and update home page state
     this.router.events
       .pipe(filter(event => event instanceof NavigationEnd))
       .subscribe((event: any) => {
         this.isHomePage = event.urlAfterRedirects.includes('/gate-mou/home');
       });

}
}
