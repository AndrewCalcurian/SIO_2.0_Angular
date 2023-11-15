import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EspecificacionesService } from 'src/app/services/especificaciones.service';

@Component({
  selector: 'app-nueva-especificacion',
  templateUrl: './nueva-especificacion.component.html',
  styleUrls: ['./nueva-especificacion.component.scss']
})
export class NuevaEspecificacionComponent {

  constructor(public api:EspecificacionesService){

  }

  @Input() NUEVA_ESPECIFICACION!:boolean;
  @Input() Materiales!:any;
  @Output() onCloseModal = new EventEmitter();

  public EspecificacionTinta:any = {
    viscosidad:{
      min:0,
      max:0,
      con:''
    },
    rigidez:{
      min:0,
      max:0,
      con:''
    },
    tack:{
      min:0,
      max:0,
      con:''
    },
    finura:{
      min:0,
      max:0,
      con:''
    },
    secado:{
      min:0,
      max:0,
      con:''
    }
  }

  public Material_selected:any = '#';

  cerrar(){
    this.Material_selected = '#'
    // Código para establecer los valores min y max en 0
Object.keys(this.EspecificacionTinta).forEach((key:any) => {
  this.EspecificacionTinta[key].min = 0;
  this.EspecificacionTinta[key].max = 0;
  this.EspecificacionTinta[key].con = '';
});
    this.onCloseModal.emit();
  }

  guardar(){
    let data = {
      especificacion:this.EspecificacionTinta, 
      material:this.Materiales[this.Material_selected]
    }
    this.api.GuardarEspecificacion(data);
    this.cerrar();
  }

}
