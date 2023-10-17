import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProveedoresComponent } from './proveedores.component';
import { MainComponent } from './main/main.component';


const routes: Routes =[
  {
    path:'',
    component:ProveedoresComponent,
    children:[
      {
        path:'',
        component:MainComponent
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
export class ProveedoresRoutingModule { }
