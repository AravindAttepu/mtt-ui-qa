import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GATEMOUComponent } from './gate-mou.component';

describe('GATEMOUComponent', () => {
  let component: GATEMOUComponent;
  let fixture: ComponentFixture<GATEMOUComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GATEMOUComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GATEMOUComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
