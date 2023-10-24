import { Injectable } from '@angular/core';
import { WebSocketService } from './web-socket.service';
import { Proveedores } from '../compras/models/modelos-compra';

@Injectable({
  providedIn: 'root'
})
export class ProveedoresService {

  constructor(public socket:WebSocketService) { 
    this.buscarProveedor()
  }


  buscarProveedor(){
    this.socket.io.emit('CLIENTE:BuscarProveedores')

    this.socket.io.on('SERVER:proveedores', (proveedores:Array<Proveedores>) => {
      console.log(proveedores)
    })
  }

  nuevoProveedor(data:Proveedores){
    console.log(data)
    this.socket.io.emit('CLIENTE:NuevoProveedor', data)
  }
}
