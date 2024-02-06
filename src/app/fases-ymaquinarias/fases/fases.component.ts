import { Component } from '@angular/core';
import { FasesService } from 'src/app/services/fases.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-fases',
  templateUrl: './fases.component.html',
  styleUrls: ['./fases.component.scss']
})
export class FasesComponent {

  constructor(public api:FasesService){}

  public data = {
    nombre:'',
    descripcion:''
  }
  public informacion:any = ''

  public nueva:boolean = false
  public editar:boolean = false
  public info:boolean = false

  nueva_fase(){
    this.nueva = true;
  }

  filas(){
    return Math.ceil(this.api.fases.length / 5)
  }

  cerrarSimple(){
    this.nueva = false;
    this.editar = false;
    this.data = {
      nombre:'',
      descripcion:''
    }
  }

  cerrar(){
    this.nueva = false;
    this.editar = false;
    this.data = {
      nombre:'',
      descripcion:''
    }
    setTimeout(() => {
      Swal.fire({
        icon:this.api.mensaje.icon,
        text:this.api.mensaje.mensaje,
        timer:1500,
        timerProgressBar:true,
        toast:true,
        position:'top-end',
        showConfirmButton:false
      })
    }, 1000);
  }

  editarFase(fase){
    this.data = fase;
    this.editar = true;
  }


  verInfo(data){
    this.info = true;
    this.informacion = data;
  }

}
