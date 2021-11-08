import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TransactionsComponent} from './transactions.component';

const routes: Routes = [
  {
    path: '',
    data: {breadcrumb: 'Transactions'},
    component: TransactionsComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransactionsRoutingModule {}
