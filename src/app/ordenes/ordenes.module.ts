import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdenesRoutingModule } from './ordenes-routing.module';
import { CompraComponent } from './compra/compra.component';
import { NuevaOrdenComponent } from './compra/nueva-orden/nueva-orden.component';
import { NavbarModule } from '../shared/navbar/navbar.module';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProduccionComponent } from './produccion/produccion.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NuevaOPComponent } from './produccion/nueva-op/nueva-op.component';
import { ResizableModule } from 'angular-resizable-element';



@NgModule({
  declarations: [
    CompraComponent,
    NuevaOrdenComponent,
    ProduccionComponent,
    NuevaOPComponent
  ],
  imports: [
    CommonModule,
    OrdenesRoutingModule,
    NavbarModule,
    RouterModule,
    FormsModule,
    DragDropModule,
    ReactiveFormsModule,
    ResizableModule
  ]
})
export class OrdenesModule { }
