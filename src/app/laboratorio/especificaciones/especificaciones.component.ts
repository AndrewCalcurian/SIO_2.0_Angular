import { Component, OnInit } from '@angular/core';
import { GruposService } from 'src/app/services/grupos.service';
import { MaterialesService } from 'src/app/services/materiales.service';

@Component({
  selector: 'app-especificaciones',
  templateUrl: './especificaciones.component.html',
  styleUrls: ['./especificaciones.component.scss']
})
export class EspecificacionesComponent implements OnInit{
  NUEVA_ESPECIFICACION:boolean = false;
  random = 15;
  materiales_seleceted:any = []
  materialesEspecificados:any;
  grupoSelected:any
  constructor(public grupos:GruposService,
    public material:MaterialesService){

  }

  ngOnInit(): void {
    setTimeout(() => {
      this.grupoSelected = this.grupos.grupos[0].nombre
      this.materialesEspecificados = this.material.filtrarPorGrupoConEspecificacion(this.grupos.grupos[0]._id)
    }, 1000);
  }

  nueva_especificacion(id:any){
    this.NUEVA_ESPECIFICACION = true;
    this.materiales_seleceted = this.material.filtrarPorGrupoSinEspecificacion(id);
    
  }

  randomise(grupo:string, id:any){
    this.grupoSelected = grupo;
    this.materialesEspecificados = this.material.filtrarPorGrupoConEspecificacion(id)
    console.log(this.materialesEspecificados)
  }

  filas(){
    return Math.ceil(this.grupos.grupos.length / 6)
  }
}
