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
  constructor(public api:AlmacenService,
              public grupos:GruposService){}



    filas(){
      return Math.ceil(this.grupos.grupos.length / 5)
    }

    detallar(id:any){
      this.Inventario = true;
      this.listado = this.api.BuscarPorGrupo(id);
      console.log(this.listado)
    }

}
