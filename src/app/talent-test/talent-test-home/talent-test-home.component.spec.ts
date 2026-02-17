import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TalentTestHomeComponent } from './talent-test-home.component';

describe('TalentTestHomeComponent', () => {
  let component: TalentTestHomeComponent;
  let fixture: ComponentFixture<TalentTestHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TalentTestHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TalentTestHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
