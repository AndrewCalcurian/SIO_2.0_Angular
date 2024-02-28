import { Injectable } from '@angular/core';
import { WebSocketService } from './web-socket.service';
import { Mensaje } from '../compras/models/modelos-compra';

@Injectable({
  providedIn: 'root'
})
export class AnalisisService {

  public mensaje!: Mensaje;
  public AnalisisTintas;
  public AnalisisSustrato;
  public AnalisisCajas;
  public AnalisisPads;
  public AnalisisOtros;
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

    this.socket.io.emit('CLIENTE:BuscarAnalisisSustrato');
    this.socket.io.on('SERVER:AnalisisSustrato', async(AnalisisSustrato)=>{
      this.AnalisisSustrato = AnalisisSustrato;
    })

    this.socket.io.emit('CLIENTE:BuscarAnalisisCajas');
    this.socket.io.on('SERVER:AnalisisCajas', async(AnalisisCajas)=>{
      this.AnalisisCajas = AnalisisCajas;
    })

    this.socket.io.emit('CLIENTE:BuscarAnalisisPads');
    this.socket.io.on('SERVER:AnalisisPads', async(AnalisisPads)=>{
      this.AnalisisPads = AnalisisPads;
    })

    this.socket.io.emit('CLIENTE:BuscarAnalisisOtros');
    this.socket.io.on('SERVER:AnalisisOtros', async(AnalisisOtros)=>{
      this.AnalisisOtros = AnalisisOtros;
    })
  
  }

  buscarAnalisisPorID(id){
    return this.AnalisisTintas.find(x => x._id === id)
  } 

  buscarAnalisisSustratoPorID(id){
    return this.AnalisisSustrato.find(x => x._id === id)
  }

  buscarAnalisisCajasPorID(id){
    return this.AnalisisCajas.find(x => x._id === id)
  }

  buscarAnalisisPadsPorID(id){
    return this.AnalisisPads.find(x => x._id === id)
  }

  buscarAnalisisOtrosPorID(id){
    return this.AnalisisOtros.find(x => x._id === id)
  }

  EnvarAnalisis(data, recepcion, index){
    const Data = {
      data,
      recepcion,
      index
    }
    this.socket.io.emit('CLIENTE:AnalisisTinta', Data)
  }

  EnviarAnalisisSustrato(data, recepcion, index){
    const Data = {
      data,
      recepcion,
      index
    }
    this.socket.io.emit('CLIENTE:AnalisisSustrato', Data)
  }

  EnviarAnalisisCajas(data, recepcion, index){
    const Data = {
      data,
      recepcion,
      index
    }
    this.socket.io.emit('CLIENTE:AnalisisCajas', Data)
  }

  EnviarAnalisisPads(data, recepcion, index){
    const Data = {
      data,
      recepcion,
      index
    }
    this.socket.io.emit('CLIENTE:AnalisisPads', Data)
  }

  EnviarAnalisisOtros(data, recepcion, index){
    const Data = {
      data,
      recepcion,
      index
    }
    this.socket.io.emit('CLIENTE:AnalisisOtros', Data)
  }
}
