import { Component } from '@angular/core';
import { GruposService } from 'src/app/services/grupos.service';
import { MaterialesService } from 'src/app/services/materiales.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-grupos',
  templateUrl: './grupos.component.html',
  styleUrls: ['./grupos.component.scss']
})
export class GruposComponent {
  nombre = "";
  parcial = "false";
  icono = "";
  nuevo:boolean = false;
  editar:boolean = false;
  material:boolean = false;
  nuevo_material:boolean = false;
  data:any = [];
  lineas:number = 0;
  material_selected = []

  constructor(public api:GruposService,
              public materiales:MaterialesService){

  }

  AgregarNuevo(){
    this.nuevo = true;
  }

  filas(){
    return Math.ceil(this.api.grupos.length / 5)
  }

  eliminarGrupo(id:any){
    Swal.fire({
      title:'¿Eliminar este grupo?',
      text:'El grupo se eliminará de manera permanente',
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

  NuevoMaterial(){
    this.nuevo_material = true;
  }

  cerrarNuevoMaterial(){
    this.nuevo_material = false;
  }

  buscarMaterial(grupo:number){
    const id = this.api.grupos[grupo]._id
    this.material_selected = this.materiales.filtrarGrupos(id)
    this.material = true;
  }

  cerrarMateriales(){
    this.material = false;
  }

}
