import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LaboratorioComponent } from './laboratorio.component';
import { NavbarModule } from '../shared/navbar/navbar.module';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LaboratorioRoutingModule } from './laboratorio-routing.module';
import { AnalisisTintaComponent } from './analisis-tinta/analisis-tinta.component';
import { EspecificacionesComponent } from './especificaciones/especificaciones.component';
import { NuevaEspecificacionComponent } from './especificaciones/nueva-especificacion/nueva-especificacion.component';
import { DetallesEspecificacionComponent } from './especificaciones/detalles-especificacion/detalles-especificacion.component';



@NgModule({
  declarations: [
    LaboratorioComponent,
    AnalisisTintaComponent,
    EspecificacionesComponent,
    NuevaEspecificacionComponent,
    DetallesEspecificacionComponent
  ],
  imports: [
    CommonModule,
    LaboratorioRoutingModule,
    NavbarModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class LaboratorioModule { }
