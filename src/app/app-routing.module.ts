import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { GruposComponent } from './grupos/grupos.component';


const routes: Routes = [{
  path:'',
  loadChildren: () => import('./grupos/grupos.module').then(m => m.GruposModule)
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
