import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlmacenComponent } from './almacen.component';
import { AlmacenRoutingModule } from './almacen-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NavbarModule } from '../shared/navbar/navbar.module';
import { RecepcionComponent } from './recepcion/recepcion.component';
import { DetallesComponent } from './recepcion/detalles/detalles.component';
import { NuevaRecepcionComponent } from './recepcion/nueva-recepcion/nueva-recepcion.component';
import { ListadoComponent } from './recepcion/listado/listado.component';



@NgModule({
  declarations: [
    AlmacenComponent,
    RecepcionComponent,
    DetallesComponent,
    NuevaRecepcionComponent,
    ListadoComponent
  ],
  imports: [
    CommonModule,
    AlmacenRoutingModule,
    NavbarModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AlmacenModule { }
