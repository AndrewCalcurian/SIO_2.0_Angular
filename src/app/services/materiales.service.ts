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
    return this.materiales.filter((x:any)=> x.grupo._id === id)
  }

  guardarMaterial(data:any){
    this.socket.io.emit('CLIENTE:GuardarMaterial', data);
  }

  EliminarMaterial(id:any){
    this.socket.io.emit('CLIENTE:elminarMaterial', id)
  }

  filtrarPorGrupos(ids: string[]): any[] {
    console.log(ids)
    return this.materiales.filter((x: any) => ids.some((groupId: string) => groupId.includes(x.grupo._id)));
  }

  notificarMaterial(id:string) {
    this.socket.io.emit('CLIENTE:NotificarNuevoMaterial', id);
  }

  filtrarPorGrupoSinEspecificacion(id: string): Materiales[] {
    return this.materiales.filter((material:any) => material.grupo._id === id && !material.especificacion);
  }

  filtrarPorGrupoConEspecificacion(id: any): Materiales[] {
    console.log(this.materiales.filter((material:any) => material.grupo._id === id && material.especificacion));
    return this.materiales.filter((material:any) => material.grupo._id === id && material.especificacion);
  }


}