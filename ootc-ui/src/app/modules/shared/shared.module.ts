import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';

import { HeaderBarComponent } from './components/header-bar/header-bar.component';
import { FooterBarComponent } from './components/footer-bar/footer-bar.component';
import { AppContainerComponent } from './components/app-container/app-container.component';
import { EmojiTextComponent } from './components/emoji-text/emoji-text.component';
import { EmojiComponent } from './components/emoji/emoji.component';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';

@NgModule({
  declarations: [
    HeaderBarComponent,
    FooterBarComponent,
    AppContainerComponent,
    EmojiTextComponent,
    EmojiComponent,
    ConfirmationDialogComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatSelectModule,
    MatButtonToggleModule,
    MatCardModule,
    MatDialogModule,
  ],
  exports: [
    AppContainerComponent,
    EmojiTextComponent,
    ConfirmationDialogComponent,

    // re-export ng stuff that we don't wanna import everywhere
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatSelectModule,
    MatButtonToggleModule,
    MatCardModule,
    MatDialogModule,
    RouterModule,
  ],
  entryComponents: [
    ConfirmationDialogComponent
  ]
})
export class SharedModule { }
