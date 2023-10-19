import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FabricantesService } from 'src/app/services/fabricantes.service';

import { Origenes, Grupos, Fabricante } from '../models/models-compra';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nuevo',
  templateUrl: './nuevo.component.html',
  styleUrls: ['./nuevo.component.scss']
})
export class NuevoComponent {

  @Input() nuevo:any;
  @Output() onCloseModal = new EventEmitter();

  nombre:string = '';
  alias:string = '';
  pais:string = 'Venezuela';
  estado:string = '';
  grupo:string = ''

  public origenes:Array<Origenes> = [];
  public grupos:Array<Grupos> = []

  constructor(public api:FabricantesService){
    
  }

  cerrar(){
    this.onCloseModal.emit()
  }

  addOrigen(){
    let busqueda = this.origenes.find( x => x.pais === this.pais && x.estado === this.estado)

    if(!busqueda){
      this.origenes.push({pais:this.pais, estado:this.estado})
      this.estado = ''
    }
  }

  deleteOrigen(i:number){
    this.origenes.splice(i, 1)
  }

  deleteGrupo(i:number){
    this.grupos.splice(i, 1)
  }

  addGrupo(){
    console.log('aja')
    let s_ = this.grupo.split('*')
    let nombre = s_[0]
    let id = s_[1]
    let busqueda = this.grupos.find(x=> x._id === id && x.nombre === nombre)
    if(!busqueda){
      this.grupos.push({_id:id, nombre})
      this.grupo = ''
    }
  }

  guardarFabricante(){
    

    let data:Fabricante = {
      nombre:this.nombre,
      alias:this.alias,
      origenes:this.origenes,
      grupo:[]
    }

    for(let i=0;i<this.grupos.length;i++){
      data.grupo.push(this.grupos[i]._id)
    }

    this.api.agregarFabricante(data)
    this.onCloseModal.emit()
    Swal.fire({
      title:'Se agregó nuevo fabricante',
      icon:'success',
      timer:5000,
      timerProgressBar:true,
      toast:true,
      position:'top-end',
      showConfirmButton:false
    })
  }

}
