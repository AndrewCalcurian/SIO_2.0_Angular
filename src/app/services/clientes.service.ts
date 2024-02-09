import { Injectable } from '@angular/core';
import { WebSocketService } from './web-socket.service';
import { Mensaje } from '../compras/models/modelos-compra';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  clientes:any = '';
  mensaje!:Mensaje;

  constructor(private socket:WebSocketService) { 
    this.onClientes()
  }

  GuardarCliente(data:any){
    this.socket.io.emit('CLIENTE:nuevoCliente',data)
    // this.socket.io.emit('NuevoGrupo',{nombre,parcial:false,icono:'test'})
  }

  onClientes(){
    this.socket.io.emit('CLIENTE:buscarCliente')
  
    this.socket.io.on('SERVER:cliente', (data)=>{
      this.clientes = data;
      console.log(this.clientes)
    })
    this.socket.io.on('SERVIDOR:enviaMensaje', (data) => {
      console.log('trabaja')
      console.error(data.mensaje);
      this.mensaje = data
    });

  }
}
