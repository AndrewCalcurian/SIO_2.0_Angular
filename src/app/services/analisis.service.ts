import { Injectable } from '@angular/core';
import { WebSocketService } from './web-socket.service';
import { Mensaje } from '../compras/models/modelos-compra';

@Injectable({
  providedIn: 'root'
})
export class AnalisisService {

  public mensaje!: Mensaje;
  public AnalisisTintas;
  constructor(private socket:WebSocketService) {
    this.BuscarAnalisisTinta()
   }



  BuscarAnalisisTinta(){
    this.socket.io.on('SERVIDOR:enviaMensaje', (data) => {
      this.mensaje = data
    });

    this.socket.io.emit('CLIENTE:BuscarAnalisisTinta');

    this.socket.io.on('SERVER:AnalisisTinta', async(AnalisisTinta)=>{
      this.AnalisisTintas = AnalisisTinta;
    })
  
  }

  buscarAnalisisPorID(id){
    return this.AnalisisTintas.find(x => x._id === id)
  } 

  EnvarAnalisis(data, recepcion, index){
    const Data = {
      data,
      recepcion,
      index
    }
    this.socket.io.emit('CLIENTE:AnalisisTinta', Data)
  }
}
