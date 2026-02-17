import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GateCoachingHomeComponent } from './gate-coaching-home.component';

describe('GateCoachingHomeComponent', () => {
  let component: GateCoachingHomeComponent;
  let fixture: ComponentFixture<GateCoachingHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GateCoachingHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GateCoachingHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
