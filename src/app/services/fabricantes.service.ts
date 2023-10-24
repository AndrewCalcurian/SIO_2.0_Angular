import { Injectable, OnInit } from '@angular/core';
import { WebSocketService } from './web-socket.service';
import { Fabricante, Fabricante_populated } from '../compras/models/modelos-compra';

@Injectable({
  providedIn: 'root'
})
export class FabricantesService{

  public grupos:any = []
  public fabricantes:Array<Fabricante> = []

  constructor(private socket:WebSocketService) { 
    this.buscarGrupos()
    
  }

  buscarGrupos(){
    this.socket.io.emit('CLIENTE:buscarGrupos')

    this.socket.io.on('cargarGrupos', (grupo) => {
      this.grupos = grupo
    })


    this.socket.io.emit('CLIENTE:BuscarFabricante')

    this.socket.io.on('SERVER:Fabricantes', (fabricantes:Array<Fabricante>)=>{
      this.fabricantes = fabricantes
    })
    // console.log(this.grupos) 
  }

  agregarFabricante(data:Fabricante){
    this.socket.io.emit('CLIENTE:NuevoFabricante', data)
  }

  editarFabricante(data:Fabricante_populated){
    this.socket.io.emit('CLIENTE:EditarFabricante', data)
  }

  eliminarFabricante(id:string){
    this.socket.io.emit('CLIENTE:deleteFabricante', id)
  }


}
