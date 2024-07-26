import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
{
  path:'',
  loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
},
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
},
{
  path: 'maquinas',
  loadChildren: () => import('./fases-ymaquinarias/fases-routing.module').then(m => m.FasesRoutingModule)
},
{
  path: 'ventas',
  loadChildren: () => import('./ordenes/ordenes-routing.module').then(m=> m.OrdenesRoutingModule)
},
{
  path:'empresa',
  loadChildren: () => import('./empleados/empleados.module').then(m=>m.EmpleadosModule)
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
