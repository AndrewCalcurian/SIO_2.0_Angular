import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EspecificacionSustrato } from 'src/app/compras/models/modelos-compra';
import { EspecificacionesService } from 'src/app/services/especificaciones.service';

@Component({
  selector: 'app-nueva-especificacion',
  templateUrl: './nueva-especificacion.component.html',
  styleUrls: ['./nueva-especificacion.component.scss']
})
export class NuevaEspecificacionComponent {

  constructor(public api: EspecificacionesService) {

  }

  @Input() NUEVA_ESPECIFICACION!: boolean;
  @Input() NUEVO_SUSTRATO!:boolean;
  @Input() Materiales!: any;
  @Input() Edicion!: any;
  @Input() Editable!: any;
  @Input() Edicion_sustrato!: any;
  @Output() onCloseModal = new EventEmitter();

  public EspecificacionTinta: any = {
    viscosidad: {
      min: 0,
      max: 0,
      con: ''
    },
    rigidez: {
      min: 0,
      max: 0,
      con: ''
    },
    tack: {
      min: 0,
      max: 0,
      con: ''
    },
    finura: {
      min: 0,
      max: 0,
      con: ''
    },
    secado: {
      min: 0,
      max: 0,
      con: ''
    }
  }
  
EspecificacionSustrato: EspecificacionSustrato = {
    gramaje: {
      min: 0,
      nom: 0,
      max: 0,
    },
    calibre: {
      pt: {
        min: 0,
        nom: 0,
        max: 0,
      },
      um: {
        min: 0,
        nom: 0,
        max: 0,
      },
      mm: {
        min: 0,
        nom: 0,
        max: 0,
      },
    },
    cobb: {
      top: {
        min: 0,
        nom: 0,
        max: 0,
      },
      back: {
        min: 0,
        nom: 0,
        max: 0,
      },
    },
    curling: {
      min: 0,
      nom: 0,
      max: 0,
    },
    blancura: {
      min: 0,
      nom: 0,
      max: 0,
    },
  };

  public Material_selected: any = '#';

  cerrar() {
    this.Material_selected = '#'
    // Código para establecer los valores min y max en 0
    Object.keys(this.EspecificacionTinta).forEach((key: any) => {
      this.EspecificacionTinta[key].min = 0;
      this.EspecificacionTinta[key].max = 0;
      this.EspecificacionTinta[key].con = '';
    });
    
    this.EspecificacionSustrato = {
      gramaje: {
        min: 0,
        nom: 0,
        max: 0,
      },
      calibre: {
        pt: {
          min: 0,
          nom: 0,
          max: 0,
        },
        um: {
          min: 0,
          nom: 0,
          max: 0,
        },
        mm: {
          min: 0,
          nom: 0,
          max: 0,
        },
      },
      cobb: {
        top: {
          min: 0,
          nom: 0,
          max: 0,
        },
        back: {
          min: 0,
          nom: 0,
          max: 0,
        },
      },
      curling: {
        min: 0,
        nom: 0,
        max: 0,
      },
      blancura: {
        min: 0,
        nom: 0,
        max: 0,
      },
    };

    this.onCloseModal.emit();
  }

  guardar() {
    let data = {
      especificacion: this.EspecificacionTinta,
      material: this.Materiales[this.Material_selected]
    }
    this.api.GuardarEspecificacion(data);
    this.cerrar();
  }

  guardar_sustrato(){
    let data = {
      especificacion: this.EspecificacionSustrato,
      material: this.Materiales[this.Material_selected]
    }
    this.api.GuardarEspecificacion(data);
    this.cerrar();
  }

  Editar_() {
    console.log(this.Editable)
    this.api.EditarESpecificacion(this.Editable);
    this.cerrar()

  }

}
