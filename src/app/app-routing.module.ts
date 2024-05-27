import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegistrationComponent } from './registration/registration';
import { ListComponent } from './list/list';

const routes: Routes = [
  { path: 'registration', component: RegistrationComponent },
  { path: 'list', component: ListComponent },
  { path: '', redirectTo: '/registration', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
