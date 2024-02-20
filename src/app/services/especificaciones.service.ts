import { Injectable } from '@angular/core';
import { WebSocketService } from './web-socket.service';

@Injectable({
  providedIn: 'root'
})
export class EspecificacionesService {

  especificaciones!: any
  constructor(private socket: WebSocketService) {
    this.buscarEspecificacion();
  }



  buscarEspecificacion() {
    this.socket.io.on('SERVER:Especificaciones', async (especificaciones) => {
      this.especificaciones = especificaciones;
    })

    this.socket.io.emit('CLIENTE:BuscarEspecificaciones');
  }

  GuardarEspecificacion(data: any) {
    this.socket.io.emit('CLIENTE:nuevaEspecificacion', data)
  }

  GuardarEspecificacion2(data: any) {
    this.socket.io.emit('CLIENTE:nuevaEspecificacion2', data)
  }


  EditarESpecificacion(data: any) {
    this.socket.io.emit('CLIENTE:EdicionEspecificacion', data)
  }
}
