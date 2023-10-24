import { Component } from '@angular/core';
import { FabricantesService } from 'src/app/services/fabricantes.service';
import { Fabricante, Fabricante_populated } from '../models/modelos-compra';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-fabricantes',
  templateUrl: './fabricantes.component.html',
  styleUrls: ['./fabricantes.component.scss']
})
export class FabricantesComponent {
  constructor(public api:FabricantesService){

  }

  public nuevo:boolean = false;
  public detalle:boolean = false;
  public editar:boolean = false;
  public selected!:any
  public data:any = [];


  filas(){
    return Math.ceil(this.api.fabricantes.length / 5)
  }

  seleccion(i:number){
    this.selected = this.api.fabricantes[i]
    this.detalle = true;
  }

  Editar(i:number){
    this.data = this.api.fabricantes[i]
     this.editar = true;
     console.log(this.data)
  }

  cerrar(){
    this.editar = false;
    this.nuevo = false;
  }

  borrarFabricante(id:string){
    Swal.fire({
      title:'¿Eliminar este Fabricante?',
      text:'El fabricante se eliminará de manera permanente',
      icon:'question',
      showCancelButton:true,
      confirmButtonColor:'#48c78e',
      confirmButtonText:'Eliminar',
      cancelButtonText:'Cancelar',
      cancelButtonColor:'#f03a5f'
    }).then(resultado => {
      if(resultado.isConfirmed){
        this.api.eliminarFabricante(id)
        Swal.fire({
        title:'Fabricante eliminado',
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
  
}
