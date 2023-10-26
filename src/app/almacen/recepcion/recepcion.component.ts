import { Component } from '@angular/core';

@Component({
  selector: 'app-recepcion',
  templateUrl: './recepcion.component.html',
  styleUrls: ['./recepcion.component.scss']
})
export class RecepcionComponent {
  public clicked:boolean = false;
  public detalle:boolean = false;
  public nueva:boolean = false;

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
