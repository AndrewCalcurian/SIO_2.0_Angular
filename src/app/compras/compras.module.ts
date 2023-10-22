import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComprasComponent } from './compras.component';
import { MainComponent } from './main/main.component';
import { ComprasRoutingModule } from './compras-routing.module';
import { NavbarModule } from '../shared/navbar/navbar.module';
import { RouterModule } from '@angular/router';
import { GruposComponent } from './grupos/grupos.component';
import { NuevoGrupoComponent } from './grupos/nuevo-grupo/nuevo-grupo.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialesComponent } from './grupos/materiales/materiales.component';
import { FabricantesComponent } from './fabricantes/fabricantes.component';
import { DetallesComponent } from './fabricantes/detalles/detalles.component';
import { NuevoFabricanteComponent } from './fabricantes/nuevo-fabricante/nuevo-fabricante.component';



@NgModule({
  declarations: [
    ComprasComponent,
    MainComponent,
    GruposComponent,
    NuevoGrupoComponent,
    MaterialesComponent,
    FabricantesComponent,
    DetallesComponent,
    NuevoFabricanteComponent,
  ],
  imports: [
    CommonModule,
    ComprasRoutingModule,
    NavbarModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ComprasModule { }
