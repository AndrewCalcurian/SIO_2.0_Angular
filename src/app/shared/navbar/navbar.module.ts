import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SolicitudMaterialComponent } from './solicitud-material/solicitud-material.component';


@NgModule({
  declarations: [
    NavbarComponent,
    SolicitudMaterialComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[NavbarComponent]
})
export class NavbarModule { }
