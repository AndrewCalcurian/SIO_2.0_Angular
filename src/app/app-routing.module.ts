import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { GruposComponent } from './grupos/grupos.component';


const routes: Routes = [{
  path:'',
  loadChildren: () => import('./grupos/grupos.module').then(m => m.GruposModule)
},
{
  path:'fabricantes',
  loadChildren: () => import('./fabricantes/fabricantes.module').then(m => m.FabricantesModule)
},
{
  path:'proveedores',
  loadChildren: () => import('./proveedores/proveedores.module').then(m => m.ProveedoresModule)
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
