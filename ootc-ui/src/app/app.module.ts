import { BrowserModule } from '@angular/platform-browser'; 
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HomeModule } from 'src/app/modules/home/home.module';
import { ReservationModule } from 'src/app/modules/reservation/reservation.module';
import { AdminModule } from 'src/app/modules/admin/admin.module';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { AuthenticationModule } from 'src/app/modules/authentication/authentication.module';

import { BasicAuthInterceptor } from 'src/app/helpers/basic-auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    SharedModule,
    HomeModule,
    ReservationModule,
    AdminModule,
    AuthenticationModule,
    HttpClientModule,
    
    // make sure app routing is last so the catch-all is imported last!!!
    AppRoutingModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: BasicAuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
