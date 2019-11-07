import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  public errors = new Subject<HttpErrorResponse>();
  constructor() { }

  public add(error: HttpErrorResponse): void {
    this.errors.next(error);
  }

  public get(): Subject<HttpErrorResponse> {
    return this.errors;
  }
}
