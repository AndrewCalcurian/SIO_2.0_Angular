import { Component, EventEmitter, Input, Output } from '@angular/core';
import Swal from 'sweetalert2';
import { Fabricante, Fabricante_populated, Grupo, Origenes } from '../../models/modelos-compra';
import { FabricantesService } from 'src/app/services/fabricantes.service';

@Component({
  selector: 'app-nuevo-fabricante',
  templateUrl: './nuevo-fabricante.component.html',
  styleUrls: ['./nuevo-fabricante.component.scss']
})
export class NuevoFabricanteComponent {
  @Input() nuevo :any;
  @Input() data!  :Fabricante_populated;
  @Input() editar:any;
  @Output() onCloseModal = new EventEmitter();

  nombre :string = '';
  alias  :string = '';
  pais   :string = 'Venezuela';
  estado :string = '';
  grupo  :string = ''

  public origenes:Array<Origenes> = [];
  public grupos:Array<Grupo> = []

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

  deleteOrigen_(i:number){
    this.data.origenes.splice(i, 1)
  }

  deleteGrupo_(i:number){
    this.data.grupo.splice(i, 1)
  }

  addOrigen_(){
    let busqueda = this.data.origenes.find( x => x.pais === this.pais && x.estado === this.estado)

    if(!busqueda){
      this.data.origenes.push({pais:this.pais, estado:this.estado})
      this.estado = ''
    }
  }

  addGrupo_(){
    let s_ = this.grupo.split('*')
    let nombre = s_[0]
    let id = s_[1]
    let busqueda = this.data.grupo.find(x=> x._id === id && x.nombre === nombre)
    if(!busqueda){
      this.data.grupo.push({_id:id, nombre})
      this.grupo = ''
    }
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
      grupo:[],
      _id:''
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

  editarFabricante(){
    

    this.api.editarFabricante(this.data)

    this.onCloseModal.emit()

    Swal.fire({
      title:'Se editó fabricante',
      icon:'success',
      timer:5000,
      timerProgressBar:true,
      toast:true,
      position:'top-end',
      showConfirmButton:false
    })
  }


}
