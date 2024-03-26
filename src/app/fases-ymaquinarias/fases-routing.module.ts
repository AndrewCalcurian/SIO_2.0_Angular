import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FasesYMaquinariasComponent } from './fases-ymaquinarias.component';
import { MainComponent } from './main/main.component';
import { FasesComponent } from './fases/fases.component';
import { MaquinasComponent } from './maquinas/maquinas.component';
import { ProductosComponent } from './productos/productos.component';
import { CategoriasComponent } from './categorias/categorias.component';

const routes: Routes =[
  {
    path:'',
    component:FasesYMaquinariasComponent,
    children:[
      {
        path:'',
        component:MainComponent
      },
      {
        path:'fases',
        component:FasesComponent
      },
      {
        path:'maquinas',
        component:MaquinasComponent
      },
      {
        path:'productos',
        component:ProductosComponent
      },
      {
        path:'categoria',
        component:CategoriasComponent
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
export class FasesRoutingModule { }
