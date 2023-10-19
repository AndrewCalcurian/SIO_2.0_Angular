import { Component } from '@angular/core';
import { GruposService } from 'src/app/services/grupos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.scss']
})
export class ListadoComponent {

  nombre = "";
  parcial = "false";
  icono = "";
  nuevo:boolean = false;
  editar:boolean = false;
  data:any = [];

  constructor(public api:GruposService){

  }

  AgregarNuevo(){
    this.nuevo = true;
  }

  eliminarGrupo(id:any){
    Swal.fire({
      title:'¿Eliminar este grupo?',
      text:'El grupo se eliminara de manera permanente',
      icon:'question',
      showCancelButton:true,
      confirmButtonColor:'#48c78e',
      confirmButtonText:'Eliminar',
      cancelButtonText:'Cancelar',
      cancelButtonColor:'#f03a5f'
    }).then(resultado => {

      if(resultado.isConfirmed){
        this.api.EliminarGrupo(id)
        Swal.fire({
        title:'Grupo eliminado',
        icon:'success',
        showConfirmButton:false,
        position:'top-end',
        toast:true,
        timer:5000,
        timerProgressBar:true
      })
      }
    }).catch(err => {
      return err
    })
  }

  EditarGrupo(nombre:any, icono:any, parcial:any, id:any){
    this.data = {
      id,
      nombre,
      icono,
      parcial
    }

    this.editar = true;
  }

  cerrarModal(){
    this.nuevo = false;
    this.editar = false;
  }

}
