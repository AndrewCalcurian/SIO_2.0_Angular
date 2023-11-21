import { Component, OnInit } from '@angular/core';
import { GruposService } from 'src/app/services/grupos.service';
import { MaterialesService } from 'src/app/services/materiales.service';

@Component({
  selector: 'app-especificaciones',
  templateUrl: './especificaciones.component.html',
  styleUrls: ['./especificaciones.component.scss']
})
export class EspecificacionesComponent implements OnInit {
  NUEVA_ESPECIFICACION: boolean = false;
  EDITAR_ESPECIFICACION: boolean = false;
  EDITAR_SUSTRATO: boolean = false;
  NUEVO_SUSTRATO: boolean = false
  Detalle: boolean = false;
  random = 15;
  materiales_seleceted: any = []
  materialesEspecificados: any;
  grupoSelected: any
  Especificacion: any;
  especificacion_para_editar!: any;
  constructor(public grupos: GruposService,
    public material: MaterialesService) {

  }

  ngOnInit(): void {
    setTimeout(() => {
      this.grupoSelected = this.grupos.grupos[0].nombre
      this.materialesEspecificados = this.material.filtrarPorGrupoConEspecificacion(this.grupos.grupos[0]._id)
    }, 1000);
  }

  cerrarNuevo() {
    this.NUEVA_ESPECIFICACION = false;
    this.EDITAR_ESPECIFICACION = false;
    this.EDITAR_SUSTRATO = false;
    this.NUEVO_SUSTRATO = false;
    this.grupoSelected = this.grupos.grupos[0].nombre
    this.materialesEspecificados = this.material.filtrarPorGrupoConEspecificacion(this.grupos.grupos[0]._id)
  }

  Detallar(data: any) {
    this.Detalle = true;
    this.Especificacion = data.especificacion
  }


  nueva_especificacion(id: any) {
    let Grupo:any = this.grupos.grupos.find((x:any) => x._id == id )
    if(Grupo.trato){
      this.NUEVO_SUSTRATO = true;
    }else{
      this.NUEVA_ESPECIFICACION = true;
    }
    this.materiales_seleceted = this.material.filtrarPorGrupoSinEspecificacion(id);

  }

  randomise(grupo: string, id: any) {
    this.grupoSelected = grupo;
    this.materialesEspecificados = this.material.filtrarPorGrupoConEspecificacion(id)
  }

  filas() {
    return Math.ceil(this.grupos.grupos.length / 6)
  }

  Editar(item: any) {
    if(item.grupo.trato){
      this.EDITAR_SUSTRATO = true;
    }else{
      this.EDITAR_ESPECIFICACION = true;
    }
    this.especificacion_para_editar = item.especificacion;
  }

}
