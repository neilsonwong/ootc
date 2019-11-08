import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Subscription } from 'rxjs';
import { DIALOG_WIDTHS } from './constants/dialog-widths';
import { ErrorDialogComponent } from './modules/shared/components/error-dialog/error-dialog.component';
import { ErrorService } from './services/error.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  private errorSub: Subscription;

  constructor(
    private dialog: MatDialog,
    private errorService: ErrorService
  ) { }

  ngOnInit(): void {
    this.errorSub = this.errorService.get().subscribe((error: string) => {
      this.popError(error);
    });
  }

  ngOnDestroy(): void {
    this.errorSub.unsubscribe();
  }

  popError(error: string) {
    if (this.dialog.openDialogs.length === 0) {
      this.dialog.open(ErrorDialogComponent, {
        data: error,
        width: DIALOG_WIDTHS.ERROR
      });
    }
  }
}
