import { Injectable } from '@angular/core';
import { WebSocketService } from './web-socket.service';
import { Mensaje } from '../compras/models/modelos-compra';

@Injectable({
  providedIn: 'root'
})
export class RecepcionService {

  public mensaje!:Mensaje;
  public recepciones:any;
  constructor(public socket:WebSocketService) { 
    this.BuscarRecepciones();
  }




  BuscarRecepciones(){
    this.socket.io.on('SERVIDOR:enviaMensaje', (data) => {
      this.mensaje = data
    });

    this.socket.io.emit('CLIENTE:BuscarRecepciones')

    this.socket.io.on('SERVER:Recepciones', (Recepciones)=>{
      this.recepciones = Recepciones
      console.log(this.recepciones)
    })
  }

  GuardarRecepcion(data:any){
    this.socket.io.emit('CLIENTE:NuevaRecepcion', data)
  }
}
