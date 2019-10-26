import { Component, OnInit, Input, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent implements OnInit {
  public title: string;
  public text: string;
  public positiveButtonText: string = 'OK';
  public negativeButtonText: string = 'Cancel';

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.title = this.data.title;
    this.text = this.data.text;
    if (this.data.yesNo) {
      this.positiveButtonText = 'Yes';
      this.negativeButtonText = 'No';
    }
  }
}
