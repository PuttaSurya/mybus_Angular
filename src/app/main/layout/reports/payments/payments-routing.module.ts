import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PaymentsComponent} from './payments.component';

const routes: Routes = [
  {
    path: '',
    data: {breadcrumb: 'Payments'},
    component: PaymentsComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentsRoutingModule { }
