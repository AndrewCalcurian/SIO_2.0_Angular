import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FabricantesService } from 'src/app/services/fabricantes.service';
import { GruposService } from 'src/app/services/grupos.service';
import { Fabricante } from '../../models/modelos-compra';
import { MaterialesService } from 'src/app/services/materiales.service';

@Component({
  selector: 'app-nuevo-material',
  templateUrl: './nuevo-material.component.html',
  styleUrls: ['./nuevo-material.component.scss']
})
export class NuevoMaterialComponent {

  public Fabricantes:any = []
  public origenes:any = []
  public selected_sustrato:boolean = false;
  public selected_tinta:boolean = false;
  public selected_pantone:boolean = false;

  @Input() nuevo_material:any;
  @Output() onCloseModal = new EventEmitter();

  public grupo:string = '';
  public gramaje:string = '';
  public calibre:string = '';
  public color:string = '';
  public codigo:string = '';
  public Fabricante:string = '';
  public origen:string = '';
  public serie:string = '';
  public nombre:string = '';


  constructor(public grupos:GruposService,
              public fabricante:FabricantesService,
              public api:MaterialesService){}


    buscarFabricante(e:any){
      this.Fabricantes = this.fabricante.buscarFabricanteDe(this.grupos.grupos[e.value]._id!)
      if(this.grupos.grupos[e.value].nombre === 'Sustrato'){
        this.selected_sustrato = true;
      }else{
        this.selected_sustrato = false;
      }

      if(this.grupos.grupos[e.value].nombre === 'Tintas'){
        this.selected_tinta = true;
      }else{
        this.selected_tinta = false;
      }
    }

    select_color(e:any){
      if(e.value === 'P'){
        this.selected_pantone = true;
      }else{
        this.selected_pantone = false;
      }
    }

    SeleccionarFabricante(e:any){
      this.origenes = this.Fabricantes[e.value].origenes
    }

    cerrar(){
      this.grupo = '';
      this.gramaje = '';
      this.calibre = '';
      this.color = '';
      this.codigo = '';
      this.Fabricante = '';
      this.origen = '';
      this.serie = '';
      this.nombre = '';
      this.onCloseModal.emit();
    }

    guardarMaterial(){

      let data = {
        grupo:this.grupos.grupos[Number(this.grupo)]._id,
        gramaje:this.gramaje,
        calibre:this.calibre,
        color:this.color,
        codigo:this.codigo,
        fabricante:this.Fabricantes[Number(this.Fabricante)]._id,
        origen:this.origen,
        serie:this.serie,
        nombre:this.nombre,
      }

      this.api.nuevoMaterial(data)

      this.cerrar();
    }

}
