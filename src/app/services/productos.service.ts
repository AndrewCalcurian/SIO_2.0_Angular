import { Injectable } from '@angular/core';
import { WebSocketService } from './web-socket.service';
import { Mensaje } from '../compras/models/modelos-compra';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  public mensaje!:Mensaje;
  public producto:any = [];

  constructor(public socket:WebSocketService) { 
    this.onProductos()
  }

  onProductos(){
    this.socket.io.emit('CLIENTE:buscarProducto')
  
    this.socket.io.on('SERVER:producto', (data)=>{
      this.producto = data;
      console.log(this.producto)
    })
    this.socket.io.on('SERVIDOR:enviaMensaje', (data) => {
      console.error(data.mensaje);
      this.mensaje = data
    });
  }

  GuardarProducto(data:any){
    this.socket.io.emit('CLIENTE:nuevoProducto',data)
    // this.socket.io.emit('NuevoGrupo',{nombre,parcial:false,icono:'test'})
  }

  buscarPorClientes(cliente){
    console.log(cliente)
    return this.producto.filter(x=> {
      return x.identificacion.cliente._id === cliente
    })
  }
}
