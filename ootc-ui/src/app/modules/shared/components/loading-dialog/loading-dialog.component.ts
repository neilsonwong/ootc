import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { LoadState } from 'src/app/constants/load-state.enum';
import { ILoaderInfo } from 'src/app/interfaces/ILoaderInfo';

@Component({
  selector: 'app-loading-dialog',
  templateUrl: './loading-dialog.component.html',
  styleUrls: ['./loading-dialog.component.scss']
})
export class LoadingDialogComponent implements OnInit {
  public title: string;
  public text: string;
  public state: LoadState;

  public get states() { return LoadState; }

  constructor(
    private dialogRef: MatDialogRef<LoadingDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ILoaderInfo) { }


  ngOnInit() {
    this.show(this.data);
  }

  public show(info: ILoaderInfo) {
    if (!info || info.state === LoadState.Close) {
      this.dialogRef.close()
    }
    else {
      this.title = info.title;
      this.text = info.text;
      this.state = info.state;
    }
  }
}
