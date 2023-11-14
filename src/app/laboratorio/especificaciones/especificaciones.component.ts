import { Component } from '@angular/core';

@Component({
  selector: 'app-especificaciones',
  templateUrl: './especificaciones.component.html',
  styleUrls: ['./especificaciones.component.scss']
})
export class EspecificacionesComponent {
  NUEVA_ESPECIFICACION:boolean = false;

  random = 15;

  nueva_especificacion(){
    this.NUEVA_ESPECIFICACION = true;
  }

  randomise(){
    this.random = Math.floor(Math.random() * 15) + 1;
  }
}
