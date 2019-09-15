import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Check this later
import { LoginComponent } from 'src/app/modules/authentication/components/login/login.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
