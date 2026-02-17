import { Component, Input, Output, OnInit, HostListener, EventEmitter } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
import { Observable } from 'rxjs';

@Component({
  selector: 'accordion-item',
  template: `
  <header class="d-flex justify-content-between m-0" (click)="onToggle()" [ngClass]="{'expanded':expanded }">
    <ng-content select="span"></ng-content>
    <div>
    <span *ngIf="!expanded" class="mdi mdi-plus-circle"></span>
    <span *ngIf="expanded" class="mdi mdi-minus-circle"></span>
    </div>
  </header>
  <div [@toggle]="expanded">
    <ng-content select="p"></ng-content>
  </div>
  `,
  styles: [`:host {
    display: block;
    padding: 10px 5px;
    border-bottom: 1px solid #eee;
    margin: 5px 0;
  }
  header {
    font-size: 20px;
    font-weight: 500;
    margin-bottom: 5px;
    cursor: pointer;
  }
  header.expanded {
    color: #6e63ff;
}
  div {
    overflow: hidden;
  }`],
  animations: [
    trigger('toggle', [
      state('true', style({ height: '*' })),
      state('false', style({ height: '0px' })),
      transition('false <=> true', animate('250ms ease-out'))
    ])
  ]
})
export class AccordionItemComponent {
  @Output() toggleEmitter: EventEmitter<any> = new EventEmitter<any>();
  expanded = false;

  onToggle() {
    this.toggleEmitter.next(this);
  }

  toggle() {
    this.expanded = !this.expanded;
  }

  close() {
    this.expanded = false;
  }
}
