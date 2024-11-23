import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './component/list/list.component';
import { CreateComponent } from './component/create/create.component';

const routes: Routes = [
  {path:'invoice',component:ListComponent},
  {path:'invoice/create',component:CreateComponent},
  {path:'invoice/edit/:invoiceno',component:CreateComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
