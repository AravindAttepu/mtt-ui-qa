import { Directive, HostListener, Input  } from '@angular/core';

@Directive({
  selector: '[appEventTracker]'
})
export class EventTrackerDirective {
  @Input('eventTracker') option: any = {
    category: '',
    action: ''
  };
  @HostListener('click', ['$event']) onClick($event) {

    (<any>window).ga('send', 'event', this.option.category, this.option.action, {
      hitCallback: function () {

        console.log('Tracking is successful');

      }

    });

  }
  constructor() { }

}



// import { Directive, HostListener, Input } from '@angular/core';


// @Directive({
//   selector: '[appEventTracker]'
// })
// export class EventTrackerDirective {

//   @Input('eventTracker') option: any;

//   @HostListener('click', ['$event']) onClick($event) {

//     (<any>window).ga('send', 'event', this.option.category, this.option.action, {
//       hitCallback: function () {

//         console.log('Tracking is successful');

//       }

//     });

//   }
//   constructor() { }

// }