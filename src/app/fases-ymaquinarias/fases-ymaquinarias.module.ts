import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FasesRoutingModule } from './fases-routing.module';
import { NavbarModule } from '../shared/navbar/navbar.module';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FasesComponent } from './fases/fases.component';
import { MainComponent } from './main/main.component';
import { NuevaFaseComponent } from './fases/nueva-fase/nueva-fase.component';
import { FasesYMaquinariasComponent } from './fases-ymaquinarias.component';
import { InformacionComponent } from './fases/informacion/informacion.component';



@NgModule({
  declarations: [
    FasesComponent,
    MainComponent,
    NuevaFaseComponent,
    FasesYMaquinariasComponent,
    InformacionComponent
  ],
  imports: [
    CommonModule,
    FasesRoutingModule,
    NavbarModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class FasesYmaquinariasModule { }
