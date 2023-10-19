import { Component } from '@angular/core';
import { FabricantesService } from 'src/app/services/fabricantes.service';
import { Fabricante } from '../models/models-compra';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {

  constructor(public api:FabricantesService){

  }

  public nuevo:boolean = false;
  public detalle:boolean = false;
  public selected!:Fabricante

  filas(){
    return Math.ceil(this.api.fabricantes.length / 5)
  }

  seleccion(i:number){
    this.selected = this.api.fabricantes[i]
    this.detalle = true;
  }

}
