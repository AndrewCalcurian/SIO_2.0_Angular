import { Component } from '@angular/core';
import { AnalisisService } from 'src/app/services/analisis.service';
import { RecepcionService } from 'src/app/services/recepcion.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-analisis',
  templateUrl: './analisis.component.html',
  styleUrls: ['./analisis.component.scss']
})
export class AnalisisComponent {

  public Tinta:boolean = false;
  public Sustrato:boolean = false;
  public Recepcion_selected;
  public Material_selected;
  public index_material;

  public Analisis:any = {
    img:'no-image',
    cualitativo:{
      tono:false,
      opacidad:false,
      viscosidad:false,
      secadoCapaFina:false,
      secadoCapaGruesa:false,
      brillo:false
    },
    cuantitativo:{
      papel:false,
      carton:false,
      gramaje:'',
      calibre:'',
      muestra:''
    },
    sustrato_muestra:'',
    carton:{
      estandar_1:{
        l:'',
        a:'',
        b:''
      },
      estandar_2:{
        l:'',
        a:'',
        b:''
      },
      estandar_3:{
        l:'',
        a:'',
        b:''
      },
     muestra_1:{
        l:'',
        a:'',
        b:'',
        ll:'',
        aa:'',
        bb:'',
        e:''
      },
     muestra_2:{
        l:'',
        a:'',
        b:'',
        ll:'',
        aa:'',
        bb:'',
        e:''
      },
     muestra_3:{
        l:'',
        a:'',
        b:'',
        ll:'',
        aa:'',
        bb:'',
        e:''
      }
    },
    papel:{
      estandar_1:{
        l:'',
        a:'',
        b:''
      },
      estandar_2:{
        l:'',
        a:'',
        b:''
      },
      estandar_3:{
        l:'',
        a:'',
        b:''
      },
     muestra_1:{
        l:'',
        a:'',
        b:'',
        ll:'',
        aa:'',
        bb:'',
        e:''
      },
     muestra_2:{
        l:'',
        a:'',
        b:'',
        ll:'',
        aa:'',
        bb:'',
        e:''
      },
     muestra_3:{
        l:'',
        a:'',
        b:'',
        ll:'',
        aa:'',
        bb:'',
        e:''
      }
    },
    muestra:{
      estandar_1:{
        l:'',
        a:'',
        b:''
      },
      estandar_2:{
        l:'',
        a:'',
        b:''
      },
      estandar_3:{
        l:'',
        a:'',
        b:''
      },
    },
    resultado:{
      estandar:'',
      resultado:'',
      observacion:'',
      guardado:{
        usuario:'',
        fecha:''
      },
      validado:{
        usuario:'',
        fecha:''
      }
    }
  }

  constructor(public recepciones:RecepcionService,
              public analisis:AnalisisService){

  }

  Format(n:any){
    n = Number(n);
    return n.toLocaleString('es-ES');
  }

  Analizar(recepcion:any, material:any, index_recepcion:number, index_material:number){
    if(material[0].material.grupo.nombre === 'Tintas'){
      this.Tinta = true;
      this.Recepcion_selected = recepcion;
      this.Material_selected = material;
      this.index_material = index_material;

      if(this.analisis.buscarAnalisisPorID(material[0].analisis)){
        this.Analisis = this.analisis.buscarAnalisisPorID(material[0].analisis)
      }


    }

    if(material[0].material.grupo.trato){
      this.Sustrato = true;
      this.Recepcion_selected = recepcion;
      this.Material_selected = material;
      this.index_material = index_material;
      console.log( this.Material_selected)
    }
  }

  Cerrar_(){
    this.Tinta = false;
  }

  Cerrar(){
    this.Tinta = false;
    setTimeout(() => {
      Swal.fire({
        title: this.analisis.mensaje.mensaje,
        icon: this.analisis.mensaje.icon,
        timer: 5000,
        showConfirmButton: false,
        timerProgressBar: true,
        toast: true,
        position: 'top-end'
      });
    }, 1000);
  }

}
