import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ErrorStateMatcher, ShowOnDirtyErrorStateMatcher } from '@angular/material/core';

const routes: Routes = [
  // catch all
  { path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [{
    provide: ErrorStateMatcher, useClass:
    ShowOnDirtyErrorStateMatcher
  }]
})
export class AppRoutingModule { }
