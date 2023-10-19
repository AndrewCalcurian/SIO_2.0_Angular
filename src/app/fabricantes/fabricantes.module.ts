import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FabricantesComponent } from './fabricantes.component';
import { FabricantesRoutingModule } from './fabricantes-routing.module';
import { NavbarModule } from '../shared/navbar/navbar.module';
import { RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { NuevoComponent } from './nuevo/nuevo.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DetallesComponent } from './detalles/detalles.component';



@NgModule({
  declarations: [
    FabricantesComponent,
    MainComponent,
    NuevoComponent,
    DetallesComponent
  ],
  imports: [
    CommonModule,
    FabricantesRoutingModule,
    NavbarModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class FabricantesModule { }
