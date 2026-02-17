import {
    QueryList,
    Component,
    HostListener,
    Input,
    ContentChildren,
    AfterViewInit,
    AfterContentInit
} from '@angular/core';
import { AccordionItemComponent } from './accordion-item.component';

export enum AccordionMode {
    Single = 'single',
    Multiple = 'multiple',
}

@Component({
    selector: 'accordion',
    template: '<ng-content></ng-content>',
    styles: [`:host {
      padding: 5px 10px;
      display: block;
    }`]
})
export class AccordionComponent implements AfterViewInit {
    @ContentChildren(AccordionItemComponent) items: QueryList<AccordionItemComponent>;
    @Input() mode: AccordionMode = AccordionMode.Multiple;

    openChild: AccordionItemComponent = null;

    ngAfterViewInit() {
        this.items.forEach(item => {
            item.toggleEmitter.subscribe(item => {
                this.expand(item);
            });
        })
    }

    expand(item) {
        if (item == this.openChild && item.expanded) {
            return item.close();
        }
        item.toggle();
        this.openChild = item;

        // Multiple mode, don't close others.
        if (this.mode == AccordionMode.Multiple) {
            return;
        }

        // Single mode, close others.
        this.items
            .filter(item => item != this.openChild)
            .map(item => item.close())
    }
}