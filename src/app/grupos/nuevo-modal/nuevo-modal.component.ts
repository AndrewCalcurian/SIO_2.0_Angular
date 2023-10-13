import { Component, EventEmitter, Input, Output } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nuevo-modal',
  templateUrl: './nuevo-modal.component.html',
  styleUrls: ['./nuevo-modal.component.scss']
})
export class NuevoModalComponent {

  @Input() api:any;
  @Input() nuevo:any;
  @Output() onCloseModal = new EventEmitter();

  nombre = "";
  parcial = "false";
  icono = "";

  nuevoGrupo(){
    let bool

    if(this.parcial === 'true'){
      bool = true
    }else{
      bool = false
    }

    let data = {
      nombre:this.nombre,
      parcial:this.parcial,
      icono:this.icono
    }
    this.api.GuardarGrupo(data)

    this.nombre = "";
    this.parcial = 'false';
    this.icono = "";

    this.onCloseModal.emit()

    Swal.fire({
      title:'Nuevo Grupo agregado',
      icon:'success',
      timer:5000,
      showConfirmButton:false,
      timerProgressBar:true,
      toast:true,
      position:'top-end'
    })
  }

  cerrar(){
    this.nombre = "";
    this.parcial = 'false';
    this.icono = "";

    this.onCloseModal.emit()

  }

  Eliminar(id:any){

  }

  

}
