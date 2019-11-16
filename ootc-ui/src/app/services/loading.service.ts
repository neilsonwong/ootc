import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { LoadState } from '../constants/load-state.enum';
import { ILoaderInfo } from '../interfaces/ILoaderInfo';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private updates = new Subject<ILoaderInfo>();
  private readonly closeMessage: ILoaderInfo = { state: LoadState.Close };

  constructor() { }

  public callWithLoader(obs: Observable<any>, handlers: ILoaderInfo[]) {
    const loadingMessage = handlers.find(e => e.state === LoadState.Loading);
    if (!loadingMessage) {
      throw 'Call with loader called without a loading message';
    }

    const completedMessage = handlers.find(e => e.state === LoadState.Complete) || this.closeMessage;
    const errorMessage = handlers.find(e => e.state === LoadState.Error) || this.closeMessage;

    this.updates.next(loadingMessage);
    obs.pipe(
      tap(() => {
        this.updates.next(completedMessage);
      }),
      catchError((err: HttpErrorResponse) => {
        if (!errorMessage.text) {
          errorMessage.text = err.error ? err.error.error : 'An error occured';
        }
        this.updates.next(errorMessage);
        return throwError(err);
      })).subscribe();
  }

  public get(): Subject<ILoaderInfo> {
    return this.updates;
  }
}
