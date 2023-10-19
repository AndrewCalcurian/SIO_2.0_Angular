import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GruposComponent } from './grupos.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GruposRoutingModule } from './grupos-routing.module';
import { NuevoModalComponent } from './nuevo-modal/nuevo-modal.component';
import { ListadoComponent } from './listado/listado.component';
import { NavbarModule } from '../shared/navbar/navbar.module';
import { RouterModule } from '@angular/router';
import { MaterialesComponent } from './materiales/materiales.component';



@NgModule({
  declarations: [
    GruposComponent,
    NuevoModalComponent,
    ListadoComponent,
    MaterialesComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    GruposRoutingModule,
    NavbarModule,
    RouterModule  
  ]
})
export class GruposModule { }
