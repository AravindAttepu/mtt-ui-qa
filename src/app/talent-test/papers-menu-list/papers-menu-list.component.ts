import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-papers-menu-list',
  templateUrl: './papers-menu-list.component.html',
  styleUrls: ['./papers-menu-list.component.scss']
})
export class PapersMenuListComponent implements OnInit {
  paperList: Array<any> = [];
  selectedItem: any;
  @Output() messageEvent = new EventEmitter();
  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    let paperId = this.route.snapshot.paramMap.get('paper');
    if (paperId == null) {
      paperId = "2023";
    }

    this.fetchQuestionPapers(paperId);
  }
  private fetchQuestionPapers(paperId) {
    try {
      let index = 0, i=0;
      this.apiService.showLoader.next(true);
      this.apiService.fetchQuestionPapers().subscribe((response: any) => {
        this.apiService.showLoader.next(false);
        if (response && Object.keys(response).length) {
          console.log('hueeyyyy');
          console.log(response);
            Object.keys(response).sort().forEach(key => {
              if(key == paperId) {
                index = i;
              }
              const obj = {
                displayName: key,
                value: key,
                questions: (response[key] || []).map(val => {
                  return {
                    question: val,
                    ans: null
                  };
                })
              };
              this.paperList.push(obj);
              i++;
            });
            this.sendMessage(this.paperList[index]);
        }
        console.log(this.paperList);
        this.paperList.reverse();
      }, error => {
        this.apiService.showLoader.next(false);
        if (error.error && error.error.message) {
          this.apiService.genericMessage(error.error.message || 'something went wrong', 'error');
        }
        console.log(error);
      });
    } catch (e) {
      console.warn(e);
    }
  }
  sendMessage(data) {
    this.selectedItem = data;
    this.messageEvent.emit(data);
  }
}
