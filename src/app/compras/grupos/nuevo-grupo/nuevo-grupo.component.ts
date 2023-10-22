import { Component, EventEmitter, Input, Output } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nuevo-grupo',
  templateUrl: './nuevo-grupo.component.html',
  styleUrls: ['./nuevo-grupo.component.scss']
})
export class NuevoGrupoComponent {
  @Input() api:any;
  @Input() nuevo:any;
  @Input() editar:any;
  @Input() data:any;
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

  EditarGrupo(){
    this.onCloseModal.emit()
    Swal.fire({
      title:'Edición realizada con exito',
      icon:'success',
      toast:true,
      position:'top-end',
      showConfirmButton:false,
      timer:5000,
      timerProgressBar:true
    })
    this.api.EditarGrupo(this.data)
  }
}
