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
  public edicion:boolean = false;
  public nueva:boolean = false;
  public Material_selected!:any;
  public n_word!:any

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

  publicMaterial(x:number, y:number){
    this.detalle = true;
    this.Material_selected = this.api.recepciones[x]
    this.n_word = y

    console.log(this.Material_selected)
  }

  EdicionDeMaterial(x:number, y:number){
    this.edicion = true;
    this.Material_selected = this.api.recepciones[x]
    this.n_word = y

    console.log(this.Material_selected)
  }

}
