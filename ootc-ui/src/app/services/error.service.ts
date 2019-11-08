import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  public errors = new Subject<string>();
  constructor() { }

  public add(error: string): void {
    this.errors.next(error);
  }

  public get(): Subject<string> {
    return this.errors;
  }
}
