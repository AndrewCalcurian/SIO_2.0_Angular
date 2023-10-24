import { Injectable } from '@angular/core';
import { WebSocketService } from './web-socket.service';
import { Proveedores } from '../compras/models/modelos-compra';

@Injectable({
  providedIn: 'root'
})
export class ProveedoresService {


  public proveedores:any = []
  constructor(public socket:WebSocketService) { 
    this.buscarProveedor()
  }


  buscarProveedor(){
    this.socket.io.emit('CLIENTE:BuscarProveedores')

    this.socket.io.on('SERVER:proveedores', (proveedores:Array<Proveedores>) => {
      this.proveedores = proveedores
    })
  }

  nuevoProveedor(data:Proveedores){
    this.socket.io.emit('CLIENTE:NuevoProveedor', data)
  }

  editarProveedores(data:Proveedores){
    this.socket.io.emit('CLIENTE:EditarProveedor', data)
  }
}
