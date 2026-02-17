import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonDeleteWarningDialogComponent } from './common-delete-warning-dialog.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

describe('CommonDeleteWarningDialogComponent', () => {
  let component: CommonDeleteWarningDialogComponent;
  let fixture: ComponentFixture<CommonDeleteWarningDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CommonDeleteWarningDialogComponent],
      providers: [
        { provide: MatDialogRef, useValue: { close: jasmine.createSpy('close') } },
        { provide: MAT_DIALOG_DATA, useValue: {} }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommonDeleteWarningDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close dialog with type on closePopup()', () => {
    const closeSpy = TestBed.inject(MatDialogRef).close as jasmine.Spy;
    component.closePopup('confirm');
    expect(closeSpy).toHaveBeenCalledWith('confirm');
  });
});

