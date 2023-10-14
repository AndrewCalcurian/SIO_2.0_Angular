import { Injectable } from '@angular/core';
import { WebSocketService } from './web-socket.service';

@Injectable({
  providedIn: 'root'
})
export class GruposService {

  public grupos:any = []
  constructor(private socket:WebSocketService) {
    this.onGrupos();
   }

  GuardarGrupo(data:any){
    this.socket.io.emit('NuevoGrupo',data)
    // this.socket.io.emit('NuevoGrupo',{nombre,parcial:false,icono:'test'})
  }

  onGrupos(){
    this.socket.io.on('cargarGrupos', (grupo) => {
      this.grupos = grupo
    })

    this.socket.io.on('newGroup', (grupo) =>{
      this.grupos.push(grupo)
    })
  }
}
