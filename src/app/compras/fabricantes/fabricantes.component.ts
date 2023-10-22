import { Component } from '@angular/core';
import { FabricantesService } from 'src/app/services/fabricantes.service';
import { Fabricante, Fabricante_populated } from '../models/modelos-compra';

@Component({
  selector: 'app-fabricantes',
  templateUrl: './fabricantes.component.html',
  styleUrls: ['./fabricantes.component.scss']
})
export class FabricantesComponent {
  constructor(public api:FabricantesService){

  }

  public nuevo:boolean = false;
  public detalle:boolean = false;
  public editar:boolean = false;
  public selected!:any
  public data:any = [];


  filas(){
    return Math.ceil(this.api.fabricantes.length / 5)
  }

  seleccion(i:number){
    this.selected = this.api.fabricantes[i]
    this.detalle = true;
  }

  Editar(i:number){
    this.data = this.api.fabricantes[i]
     this.editar = true;
     console.log(this.data)
  }

  cerrar(){
    this.editar = false;
    this.nuevo = false;
  }
  
}
