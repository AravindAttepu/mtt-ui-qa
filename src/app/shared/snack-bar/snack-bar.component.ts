import { Component, Renderer2, ViewChild, ElementRef, Input } from '@angular/core';
import { ApiService, CommonAlert } from 'src/app/api.service';
// import { SharedService,  } from 'src/app/servicess/';


@Component({
  selector: 'app-snack-bar',
  templateUrl: './snack-bar.component.html',
  styleUrls: ['./snack-bar.component.scss']
})
export class CommonAlertSnackComponent {
  data: CommonAlert['value'];
  @ViewChild('containerBox', { static: true }) containerRef: ElementRef;
  constructor(
    private apiService: ApiService,
    private render: Renderer2) { }
  @Input('data') set processData(data) {
    this.data = data;
    if (this.data.position === 'v-center') {
      this.render.setStyle(this.containerRef.nativeElement, 'top', '50vh');
    } else {
      this.render.setStyle(this.containerRef.nativeElement, 'bottom', '5vh');
    }

    if (this.data.duration) {
      setTimeout(() => {
        this.closeAlert();
      }, this.data.duration);
    }
  }


  closeAlert() {
    this.apiService.internalNotifier.next({
      type: 'dru-alert',
      value: false
    });
  }

}
