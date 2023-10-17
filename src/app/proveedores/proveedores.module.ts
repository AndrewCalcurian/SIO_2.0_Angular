import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProveedoresComponent } from './proveedores.component';
import { ProveedoresRoutingModule } from './proveedores-routing.module';
import { NavbarModule } from '../shared/navbar/navbar.module';
import { RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';



@NgModule({
  declarations: [
    ProveedoresComponent,
    MainComponent
  ],
  imports: [
    CommonModule,
    ProveedoresRoutingModule,
    NavbarModule,
    RouterModule 
  ]
})
export class ProveedoresModule { }
