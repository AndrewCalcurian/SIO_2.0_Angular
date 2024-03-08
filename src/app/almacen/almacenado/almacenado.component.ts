import { Component } from '@angular/core';
import { AlmacenService } from 'src/app/services/almacen.service';
import { GruposService } from 'src/app/services/grupos.service';

@Component({
  selector: 'app-almacenado',
  templateUrl: './almacenado.component.html',
  styleUrls: ['./almacenado.component.scss']
})
export class AlmacenadoComponent {


  listado!:any;
  Inventario:boolean = false;
  Generales!:{ [id: string]: number };
  ByLotes!:{ [id: string]: { [lote: string]: number } }
  constructor(public api:AlmacenService,
              public grupos:GruposService){}



    filas(){
      return Math.ceil(this.grupos.grupos.length / 3)
    }

    detallar = async(id:any)=>{
      const sumByMaterialId:any = []
      this.Inventario = true;
      this.listado = this.api.BuscarPorGrupo(id);
      this.sumarMateriales()
    }

    sumarMateriales() {
      const sumByMaterialId: { [id: string]: number } = {};
      const sumByMaterialIdAndLote: { [id: string]: { [lote: string]: number } } = {};
      for (const material of this.listado) {
        const materialId = material.material._id.toString(); // Convertir el ID a cadena
        const neto = Number(material.neto); // Convertir a número
        const ancho = material.ancho.toString(); // Convertir el ancho a cadena
        const largo = material.largo.toString(); // Convertir el largo a cadena
        const key = `${materialId}-${ancho}-${largo}`; // Crear una clave única para el material
    
        if (!sumByMaterialId[key]) {
          sumByMaterialId[key] = 0;
        }
        sumByMaterialId[key] += neto;
    
        if (!sumByMaterialIdAndLote[key]) {
          sumByMaterialIdAndLote[key] = {};
        }
        if (!sumByMaterialIdAndLote[key][material.lote]) {
          sumByMaterialIdAndLote[key][material.lote] = 0;
        }
        sumByMaterialIdAndLote[key][material.lote] += neto;
      }
      this.Generales = sumByMaterialId;
      this.ByLotes = sumByMaterialIdAndLote;
    }
}
