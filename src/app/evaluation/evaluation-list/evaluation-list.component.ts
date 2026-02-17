import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-evaluation-list',
  templateUrl: './evaluation-list.component.html',
  styleUrls: ['./evaluation-list.component.scss']
})
export class EvaluationListComponent implements OnInit {
  testPapers = [];
  constructor(private apiService: ApiService, private router: Router) { }

  getPapers(): void {
    try {
      this.apiService.showLoader.next(true);
      this.apiService.fetchPapersBasedOnStatus('IN_PROGRESS').subscribe((res: any) => {
        this.apiService.showLoader.next(false);
        if (res && typeof res === 'object') {
          Object.keys(res).forEach(key => {
            this.testPapers.push(res[key]);
          });
        }
      }, error => {
        this.apiService.showLoader.next(false);
        if (error.status === 401) {
          this.router.navigate(['/login']);
          return;
        }
        if (error.error) {
          const serverError = typeof error.error === 'string' ? JSON.parse(error.error) : {};
          this.apiService.genericMessage(serverError.error || 'something went wrong', 'error');
        }
        console.log(error);
      });
    } catch (e) {
      console.warn(e);
    }
  }

  ngOnInit() {
    this.getPapers();
  }

}
