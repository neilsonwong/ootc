import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ErrorStateMatcher, ShowOnDirtyErrorStateMatcher } from '@angular/material/core';

const routes: Routes = [
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
