import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarModule } from '../shared/navbar/navbar.module';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LaboratorioRoutingModule } from './laboratorio-routing.module';
import { AnalisisTintaComponent } from './analisis/analisis-tinta/analisis-tinta.component';
import { EspecificacionesComponent } from './especificaciones/especificaciones.component';
import { NuevaEspecificacionComponent } from './especificaciones/nueva-especificacion/nueva-especificacion.component';
import { DetallesEspecificacionComponent } from './especificaciones/detalles-especificacion/detalles-especificacion.component';
import { AnalisisComponent } from './analisis/analisis.component';
import { AnalisisSustratoComponent } from './analisis/analisis-sustrato/analisis-sustrato.component';
import { LaboratorioIndexComponent } from './laboratorio-index/laboratorio-index.component';
import { BusquedaComponent } from './analisis/busqueda/busqueda.component';
import { AnalisisPadsComponent } from './analisis-pads/analisis-pads.component';
import { AnalisisOtrosComponent } from './analisis-otros/analisis-otros.component';
import { AnalisisCajasComponent } from './analisis/analisis-cajas/analisis-cajas.component';
import { LaboratorioComponent } from './laboratorio.component';
import { DefectosComponent } from './defectos/defectos.component';



@NgModule({
  declarations: [
    LaboratorioIndexComponent,
    LaboratorioComponent,
    AnalisisTintaComponent,
    EspecificacionesComponent,
    NuevaEspecificacionComponent,
    DetallesEspecificacionComponent,
    AnalisisComponent,
    AnalisisSustratoComponent,
    AnalisisCajasComponent,
    AnalisisPadsComponent,
    BusquedaComponent,
    AnalisisOtrosComponent,
    DefectosComponent,
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
