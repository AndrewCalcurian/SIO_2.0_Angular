import { Component } from '@angular/core';
import { RecepcionService } from 'src/app/services/recepcion.service';

@Component({
  selector: 'app-analisis',
  templateUrl: './analisis.component.html',
  styleUrls: ['./analisis.component.scss']
})
export class AnalisisComponent {

  public Tinta:boolean = false;
  public Recepcion_selected:boolean = false;
  public Material_selected:boolean = false;

  constructor(public recepciones:RecepcionService){

  }

  Analizar(recepcion:any, material:any, index_recepcion:number, index_material:number){
    if(material[0].material.grupo.nombre === 'Tintas'){
      this.Tinta = true;
      this.Recepcion_selected = recepcion;
      this.Material_selected = material;
    }
  }

}
