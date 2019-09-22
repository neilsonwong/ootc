import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './components/home/home.component';
import { TopBarComponent } from './components/home/top-bar/top-bar.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    HomeComponent, TopBarComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      
    ])
  ],
  bootstrap: [ HomeComponent ]
})
export class HomeModule { }
