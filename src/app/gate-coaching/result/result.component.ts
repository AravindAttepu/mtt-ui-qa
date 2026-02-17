import { Component, OnInit } from '@angular/core';
import { ApiService } from "src/app/api.service";

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {

  finalResult: Array<any> = [];
   constructor(private apiService: ApiService) {}

   ngOnInit() {
     try {
       this.apiService.showLoader.next(true);
       this.apiService.getGateResults().subscribe(
         (res: any) => {
           this.apiService.showLoader.next(false);
           if (res && res.length) {
             this.finalResult = res;
           }
         }
       );
     } catch(e) {
       console.warn(e);
     }
   }
}
