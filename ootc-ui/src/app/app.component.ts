import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Subscription } from 'rxjs';
import { DIALOG_WIDTHS } from './constants/dialog-widths';
import { ILoaderInfo } from './interfaces/ILoaderInfo';
import { ErrorDialogComponent } from './modules/shared/components/error-dialog/error-dialog.component';
import { LoadingDialogComponent } from './modules/shared/components/loading-dialog/loading-dialog.component';
import { ErrorService } from './services/error.service';
import { LoadingService } from './services/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  private errorSub: Subscription;
  private loaderSub: Subscription;
  private loaderRef: MatDialogRef<LoadingDialogComponent, any>;

  constructor(
    private dialog: MatDialog,
    private errorService: ErrorService,
    private loadingService: LoadingService
  ) { }

  ngOnInit(): void {
    this.errorSub = this.errorService.get().subscribe((error: string) => {
      this.popError(error);
    });
    this.loaderSub = this.loadingService.get().subscribe((info: ILoaderInfo) => {
      this.popLoader(info);
    });
  }

  ngOnDestroy(): void {
    this.errorSub.unsubscribe();
  }

  popError(error: string) {
    if (this.dialog.openDialogs.length === 0) {
      this.dialog.open(ErrorDialogComponent, {
        data: error,
        maxWidth: DIALOG_WIDTHS.ERROR
      });
    }
  }

  popLoader(info: ILoaderInfo) {
    if (this.loaderRef) {
      this.loaderRef.componentInstance.show(info);
    }
    else {
      this.loaderRef = this.dialog.open(LoadingDialogComponent, {
        data: info,
        maxWidth: DIALOG_WIDTHS.LOADING
      });
      this.loaderRef.afterClosed().subscribe(() => {
        this.loaderRef = undefined;
      });
    }
  }
}
