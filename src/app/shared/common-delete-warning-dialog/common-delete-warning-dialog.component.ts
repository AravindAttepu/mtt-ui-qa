
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-common-delete-warning-dialog',
  templateUrl: './common-delete-warning-dialog.component.html',
  styleUrls: ['./common-delete-warning-dialog.component.scss']
})
export class CommonDeleteWarningDialogComponent implements OnInit {

  htmlContent = '';
  constructor(
    public dialogRef: MatDialogRef<CommonDeleteWarningDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }
  closePopup(type): void {
    this.dialogRef.close(type);
  }
}
