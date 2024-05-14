import { Injectable } from '@angular/core';
import { WebSocketService } from './web-socket.service';
import { Mensaje } from '../compras/models/modelos-compra';

@Injectable({
  providedIn: 'root'
})
export class OpoligraficaService {

  constructor(public socket:WebSocketService) { 
    this.onOrdenPoligrafica()
  }

  public orden!:any
  public mensaje!:Mensaje

  onOrdenPoligrafica(){
    this.socket.io.emit('CLIENTE:BuscarOrdenesPoligrafica')
  
    this.socket.io.on('SERVER:OrdenesPoligrafica', (data)=>{
      this.orden = data;
    })

    this.socket.io.on('SERVIDOR:enviaMensaje', (data) => {
      console.error(data.mensaje);
      this.mensaje = data
    });
  }

  filtrarPorProveedor(proveedorID){
    return this.orden.filter((x:any)=> x.proveedor._id === proveedorID)
  }

  nuevaOrden(data){
    this.socket.io.emit('CLIENTE:NuevaOrdenPoligrafica', data)
  }


}
