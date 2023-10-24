import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FabricantesService } from 'src/app/services/fabricantes.service';
import { Proveedores } from '../../models/modelos-compra';

@Component({
  selector: 'app-nuevo-proveedor',
  templateUrl: './nuevo-proveedor.component.html',
  styleUrls: ['./nuevo-proveedor.component.scss']
})
export class NuevoProveedorComponent {


  @Input() nuevo!:boolean;
  @Input() api:any;
  @Output() onCloseModal = new EventEmitter();

  public proveedor_directo:any = false;
  public nombre:string = '';
  public direccion:string = '';
  public rif:string = ''
  public contacto_nombre:string = '';
  public contacto_numero:string = '';
  public contacto_email :string = ''
  public fabricante:any
  public contactos:any = [];

  constructor(public fabricantes:FabricantesService){

  }

  cerrar(){
    this.onCloseModal.emit();
  }

  checkProveedor(){
    if(!this.proveedor_directo){
      this.nombre = this.fabricantes.fabricantes[this.fabricante].nombre;
      (<HTMLInputElement>document.getElementById('nombre')).disabled = true;
    }else{
      this.nombre = '';
      (<HTMLInputElement>document.getElementById('nombre')).disabled = false;

    }
  }

  fabricante_selected(e:any | null){
    if(e.value != '#'){
      this.fabricante = e.value;
    }
  }

  NuevoContacto(){
    this.contactos.push(
      {
        nombre:this.contacto_nombre,
        numero:this.contacto_numero,
        email:this.contacto_email
      }
    )
    this.contacto_email = '';
    this.contacto_nombre = '';
    this.contacto_numero = '';
  }

  GuardarProveedor(){
    let data:Proveedores = {
      fabricante:this.fabricantes.fabricantes[this.fabricante]._id,
      nombre    :this.nombre,
      direccion :this.direccion,
      rif       :this.rif,
      contactos :this.contactos

    }

    this.api.nuevoProveedor(data);
  }
}
