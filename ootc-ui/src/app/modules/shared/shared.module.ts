import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { HeaderBarComponent } from './components/header-bar/header-bar.component';
import { FooterBarComponent } from './components/footer-bar/footer-bar.component';

@NgModule({
  declarations: [HeaderBarComponent, FooterBarComponent],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
  ],
  exports: [
    HeaderBarComponent,
    FooterBarComponent,
  ]
})
export class SharedModule { }
