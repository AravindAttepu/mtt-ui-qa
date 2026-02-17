import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GATEMOUHomeComponent } from './gate-mou-home.component';

describe('GATEMOUHomeComponent', () => {
  let component: GATEMOUHomeComponent;
  let fixture: ComponentFixture<GATEMOUHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GATEMOUHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GATEMOUHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
