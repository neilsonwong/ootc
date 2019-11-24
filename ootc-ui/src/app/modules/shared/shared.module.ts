import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatMenuModule } from '@angular/material/menu';
import { MatMomentDateModule } from "@angular/material-moment-adapter";

import { HeaderBarComponent } from './components/header-bar/header-bar.component';
import { FooterBarComponent } from './components/footer-bar/footer-bar.component';
import { AppContainerComponent } from './components/app-container/app-container.component';
import { EmojiTextComponent } from './components/emoji-text/emoji-text.component';
import { EmojiComponent } from './components/emoji/emoji.component';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { MatTableModule, MatSortModule } from '@angular/material';
import { LoadingDialogComponent } from './components/loading-dialog/loading-dialog.component';
import { ErrorDialogComponent } from './components/error-dialog/error-dialog.component';

import { MarkdownPipe } from './pipes/markdown.pipe';

@NgModule({
  declarations: [
    HeaderBarComponent,
    FooterBarComponent,
    AppContainerComponent,
    EmojiTextComponent,
    EmojiComponent,
    ConfirmationDialogComponent,
    LoadingDialogComponent,
    ErrorDialogComponent,
    MarkdownPipe,
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
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
    MatTableModule,
    MatSortModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatChipsModule,
    MatIconModule,
    MatDatepickerModule,
    MatAutocompleteModule,
    MatMenuModule,
    MatMomentDateModule,
  ],
  exports: [
    AppContainerComponent,
    EmojiTextComponent,
    ConfirmationDialogComponent,
    LoadingDialogComponent,

    MarkdownPipe,

    // re-export ng stuff that we don't wanna import everywhere
    CommonModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatSelectModule,
    MatButtonToggleModule,
    MatCardModule,
    MatDialogModule,
    MatTableModule,
    MatSortModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatChipsModule,
    MatIconModule,
    MatDatepickerModule,
    MatAutocompleteModule,
    MatMenuModule,
    MatMomentDateModule,
    RouterModule,
  ],
  entryComponents: [
    ConfirmationDialogComponent,
    LoadingDialogComponent,
    ErrorDialogComponent,
  ]
})
export class SharedModule { }
