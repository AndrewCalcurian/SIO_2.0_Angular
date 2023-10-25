import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FabricantesService } from 'src/app/services/fabricantes.service';
import { Proveedores } from '../../models/modelos-compra';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nuevo-proveedor',
  templateUrl: './nuevo-proveedor.component.html',
  styleUrls: ['./nuevo-proveedor.component.scss']
})
export class NuevoProveedorComponent {


  @Input() nuevo!:boolean;
  @Input() editar!:boolean;
  @Input() proveedor!:Proveedores
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
    this.nombre = '';
    this.direccion = '';
    this.rif = '';
    this.contactos = [];
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

  NuevoContacto_(){
    this.proveedor.contactos.push({
      nombre:this.contacto_nombre,
      numero:this.contacto_numero,
      email:this.contacto_email
    })
    this.contacto_email = '';
    this.contacto_nombre = '';
    this.contacto_numero = '';
  }

  GuardarProveedor(){
    let data:Proveedores = {
      fabricantes:this.fabricantes.fabricantes[this.fabricante]._id,
      nombre    :this.nombre,
      direccion :this.direccion,
      rif       :this.rif,
      contactos :this.contactos

    }

    this.api.nuevoProveedor(data);

    Swal.fire({
      title:'Se guardó nuevo proveedor',
      icon:'success',
      timer:5000,
      position:'top-end',
      timerProgressBar:true,
      showConfirmButton:false,
      toast:true
    })

    this.cerrar();
  }

  EditarProveedor(){
    this.proveedor.fabricantes = this.proveedor.fabricantes._id;
    this.api.editarProveedores(this.proveedor);
    this.cerrar();
  }


}
