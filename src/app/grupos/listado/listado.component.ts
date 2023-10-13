import { Component } from '@angular/core';
import { GruposService } from 'src/app/services/grupos.service';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.scss']
})
export class ListadoComponent {

  nombre = "";
  parcial = "false";
  icono = "";
  nuevo:boolean = false;

  constructor(public api:GruposService){

  }

  AgregarNuevo(){
    this.nuevo = true;
  }

}
