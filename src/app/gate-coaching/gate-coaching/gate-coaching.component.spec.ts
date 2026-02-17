import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GateCoachingComponent } from './gate-coaching.component';

describe('GateCoachingComponent', () => {
  let component: GateCoachingComponent;
  let fixture: ComponentFixture<GateCoachingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GateCoachingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GateCoachingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
