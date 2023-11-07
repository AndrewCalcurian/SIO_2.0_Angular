import { Component } from '@angular/core';
import { RecepcionService } from 'src/app/services/recepcion.service';

@Component({
  selector: 'app-recepcion',
  templateUrl: './recepcion.component.html',
  styleUrls: ['./recepcion.component.scss']
})
export class RecepcionComponent {
  public clicked:boolean = false;
  public detalle:boolean = false;
  public nueva:boolean = false;


  constructor(public api:RecepcionService){

  }

  showInfo(){
    if(!this.clicked){
      this.clicked = true;
    }else {
      this.clicked = false;
    }
  }

  mostrarDetalle(){
    this.detalle = true;
  }

  NuevaRecepcion(){
    this.nueva = true;
  }

}
