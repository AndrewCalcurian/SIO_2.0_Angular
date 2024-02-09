import { Injectable } from '@angular/core';
import { WebSocketService } from './web-socket.service';
import { Mensaje } from '../compras/models/modelos-compra';

@Injectable({
  providedIn: 'root'
})
export class MaquinasService {

  public mensaje!:Mensaje;
  public maquinas:any = [];

  constructor(private socket:WebSocketService) { 
    this.onMaquinas()
  }

  guardarMaquinas(data:any){
    this.socket.io.emit('CLIENTE:nuevaMaquina',data)
  }

  EditarMaquina(data:any){
    this.socket.io.emit('CLIENTE:EditMaquina', data);
  }

  buscarMaquinaPorFases(fase__){
    return this.maquinas.filter(maquina => maquina.fases.some(fase => fase._id === fase__));
  }

  eliminarMaquina(id){
    this.socket.io.emit('CLIENTE:deleteMaquina', id)
  }

  onMaquinas(){
    this.socket.io.emit('CLIENTE:buscarMaquina')
  
    this.socket.io.on('SERVER:maquina', (data)=>{
      this.maquinas = data;
    })

    this.socket.io.on('SERVIDOR:enviaMensaje', (data) => {
      console.error(data.mensaje);
      this.mensaje = data
    });

  }


}
