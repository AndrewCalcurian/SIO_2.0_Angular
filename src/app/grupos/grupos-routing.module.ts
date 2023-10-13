import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { GruposComponent } from './grupos.component';
import { ListadoComponent } from './listado/listado.component';

const routes: Routes =[
  {
    path:'',
    component:GruposComponent,
    children:[
      {
        path:'',
        component:ListadoComponent
      }
    ]
}]



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class GruposRoutingModule { }
