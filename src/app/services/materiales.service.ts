import { Injectable } from '@angular/core';
import { WebSocketService } from './web-socket.service';
import { Materiales } from '../compras/models/modelos-compra';

@Injectable({
  providedIn: 'root'
})
export class MaterialesService {


  public materiales!:any
  constructor(public socket:WebSocketService) { 
    this.buscarMaterial();
  }

  nuevoMaterial(data:any){
    this.socket.io.emit('CLIENTE:NuevoMaterial', data)
  }

  buscarMaterial(){
    this.socket.io.emit('CLIENTE:BuscarMaterial')

    this.socket.io.on('SERVER:Materiales', (materiales)=>{
      this.materiales = materiales
      console.log(this.materiales)
    })  
  }

  filtrarGrupos(id:any){
    return this.materiales.filter((x:any)=> x.grupo === id)
  }
}
