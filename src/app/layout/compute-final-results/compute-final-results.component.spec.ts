import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComputeFinalResultsComponent } from './compute-final-results.component';

describe('ComputeFinalResultsComponent', () => {
  let component: ComputeFinalResultsComponent;
  let fixture: ComponentFixture<ComputeFinalResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComputeFinalResultsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComputeFinalResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
