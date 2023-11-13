import { Injectable } from '@angular/core';
import { WebSocketService } from './web-socket.service';
import { Materiales, Mensaje } from '../compras/models/modelos-compra';

@Injectable({
  providedIn: 'root'
})
export class MaterialesService {


  public materiales!:any
  public mensaje!:Mensaje;
  constructor(public socket:WebSocketService) { 
    this.buscarMaterial();
  }

  nuevoMaterial(data:any){
    this.socket.io.emit('CLIENTE:NuevoMaterial', data)
  }

  buscarMaterial(){
    this.socket.io.on('SERVIDOR:enviaMensaje', (data) => {
      console.error(data.mensaje);
      this.mensaje = data
    });

    this.socket.io.emit('CLIENTE:BuscarMaterial')

    this.socket.io.on('SERVER:Materiales', (materiales)=>{
      this.materiales = materiales
      console.log(this.materiales)
    })  
  }

  filtrarGrupos(id:any){
    return this.materiales.filter((x:any)=> x.grupo === id)
  }

  guardarMaterial(data:any){
    this.socket.io.emit('CLIENTE:GuardarMaterial', data);
  }

  EliminarMaterial(id:any){
    this.socket.io.emit('CLIENTE:elminarMaterial', id)
  }

  filtrarPorGrupos(id: string[]): any[] { 
    return this.materiales.filter((x: any) => id.some((groupId: string) => x.grupo.includes(groupId))); 
  } 

  notificarMaterial(id:string) {
    this.socket.io.emit('CLIENTE:NotificarNuevoMaterial', id);
  }


}