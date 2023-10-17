import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FabricantesComponent } from './fabricantes.component';
import { MainComponent } from './main/main.component';

const routes: Routes =[
  {
    path:'',
    component:FabricantesComponent,
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
export class FabricantesRoutingModule { }
