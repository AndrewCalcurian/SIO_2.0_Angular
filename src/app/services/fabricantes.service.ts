import { Injectable, OnInit } from '@angular/core';
import { WebSocketService } from './web-socket.service';

@Injectable({
  providedIn: 'root'
})
export class FabricantesService{

  public grupos:any = []

  constructor(private socket:WebSocketService) { 
    this.buscarGrupos()
    
  }

  buscarGrupos(){
    this.socket.io.emit('CLIENTE:buscarGrupos')

    this.socket.io.on('cargarGrupos', (grupo) => {
      this.grupos = grupo
    })

    // console.log(this.grupos) 
  }


}
