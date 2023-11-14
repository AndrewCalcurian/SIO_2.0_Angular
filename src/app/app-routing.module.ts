import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
{
  path:'compras',
  loadChildren: () => import('./compras/compras.module').then(m=> m.ComprasModule)
},
{
  path:'almacen',
  loadChildren: () => import('./almacen/almacen.module').then(m => m.AlmacenModule)
},
{
  path:'laboratorio',
  loadChildren: () => import('./laboratorio/laboratorio.module').then(m => m.LaboratorioModule)
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
