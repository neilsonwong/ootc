import { Component, OnInit, Input, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-error-dialog',
  templateUrl: './error-dialog.component.html',
  styleUrls: ['./error-dialog.component.scss']
})
export class ErrorDialogComponent implements OnInit {
  private text: string;
  public readonly sadFace: string = `(๑◕︵◕๑)`;

  constructor(@Inject(MAT_DIALOG_DATA) public data: string) { }

  ngOnInit() {
    this.text = this.data;
  }
}
