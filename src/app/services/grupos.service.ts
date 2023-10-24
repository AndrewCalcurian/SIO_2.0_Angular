import { Injectable } from '@angular/core';
import { WebSocketService } from './web-socket.service';
import { Grupo } from '../compras/models/modelos-compra';

@Injectable({
  providedIn: 'root'
})
export class GruposService {

  public grupos:Array<Grupo> = []
  constructor(private socket:WebSocketService) {
    this.onGrupos();
   }

  GuardarGrupo(data:Grupo){
    this.socket.io.emit('CLIENTE:NuevoGrupo',data)
    // this.socket.io.emit('NuevoGrupo',{nombre,parcial:false,icono:'test'})
  }

  EliminarGrupo(id:String){
    this.socket.io.emit('CLIENTE:deleteGrupo', id)
  }

  EditarGrupo(data:Grupo){
    this.socket.io.emit('CLIENTE:EditarGrupo', data)
  }

  onGrupos(){

    this.socket.io.emit('CLIENTE:buscarGrupos')

    this.socket.io.on('cargarGrupos', (grupo:Array<Grupo>) => {
      this.grupos = grupo
    })

    this.socket.io.on('SERVER:NuevoGrupo', (grupo:Grupo) =>{
      this.grupos.push(grupo)
    })
  }
}
