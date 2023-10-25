import { Component, OnInit } from '@angular/core';
import { ProveedoresService } from 'src/app/services/proveedores.service';
import { Proveedores } from '../models/modelos-compra';

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.scss']
})
export class ProveedoresComponent{

  public nuevo:boolean = false;
  public editar:boolean = false;
  public proveedor_selected!:Proveedores;

  constructor(public api:ProveedoresService){

  }

  addnuevo(){
    this.nuevo = true;
  }


  cerrar(){
    this.nuevo = false;
    this.editar = false;
  }

  filas(){
    return Math.ceil(this.api.proveedores.length / 5)
  }

  EditarProveedor(i:number){
    console.log('funciona')
    this.editar = true;
    this.proveedor_selected = this.api.proveedores[i]
  }

}
