import { Component, OnInit } from '@angular/core';
import { ApiService } from './api.service';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { SEOService } from './seo.service';
import { filter, map, mergeMap } from 'rxjs/operators';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'sadisha-ui';
  public showAlert = false;
  public showLoader = false;
  constructor(
    private apiService: ApiService,
    private _seoService: SEOService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private cookieService: CookieService) {
      if (!this.cookieService.get('studentId')) {
        this.cookieService.set('studentId', this.apiService.getUUID());
      }
  }
  ngOnInit() {
    this.apiService.showLoader.subscribe((flag: boolean) => {
      if (this.showLoader !== flag) {
        this.showLoader = flag;
      }
    });

    this.apiService.internalNotifier.subscribe((data: any) => {
     this.showAlert = data.value;
    });

    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map(() => this.activatedRoute),
      map((route) => {
        while (route.firstChild) route = route.firstChild;
        return route;
      }),
      filter((route) => route.outlet === 'primary'),
      mergeMap((route) => route.data)
     )
     .subscribe((event) => {
       this._seoService.updateTitle(event['title']);
       this._seoService.updateOgUrl(event['ogUrl']);
       //Updating Description tag dynamically with title
       this._seoService.updateDescription(event['title'] + event['description']);
       this._seoService.updateKeyword(event['keywords']);
     }); 
  }
}
