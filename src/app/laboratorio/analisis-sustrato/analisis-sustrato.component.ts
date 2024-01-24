import { Component, EventEmitter, Input, Output } from '@angular/core';
import * as moment from 'moment';
import { AnalisisSustrato, AnalisisSustrato2 } from 'src/app/compras/models/modelos-compra';
import { AnalisisService } from 'src/app/services/analisis.service';

@Component({
  selector: 'app-analisis-sustrato',
  templateUrl: './analisis-sustrato.component.html',
  styleUrls: ['./analisis-sustrato.component.scss']
})
export class AnalisisSustratoComponent {

  @Input() sustrato!: boolean;
  @Input() Recepcion:any;
  @Input() Materiales:any;
  @Input() Index:any;
  @Input() analisis:any;
  @Output() onCloseModal = new EventEmitter();
  @Output() onCloseSencillo = new EventEmitter()


  constructor(public api:AnalisisService){
    
  }

  public Gramaje_Cobb = true;
  public calibre = false;
  public curling = false;
  public dimensiones = false;

  tabs(n){
    switch(n){
      case 1:
        this.Gramaje_Cobb = true;
        this.calibre = false;
        this.curling = false;
        this.dimensiones = false;
      break;
      case 2:
        this.calibre = true;
        this.Gramaje_Cobb = false;
        this.curling = false;
        this.dimensiones = false;
      break;
      case 3:
        this.curling = true;
        this.dimensiones = false;
        this.Gramaje_Cobb = false;
        this.calibre = false;
      break;
      case 4:
        this.Gramaje_Cobb = false;
        this.calibre = false;
        this.curling = false;
        this.dimensiones = true;
      break;
    }
  }

  desviacionEstandar(array, promedio) {
    let suma = 0;
    for (let i = 0; i < array.length; i++) {
      suma += Math.pow(array[i] - promedio, 2);
    }
    return Math.sqrt(suma / (array.length - 1));
  }

  Promedio(array){
    const sum = array.reduce((a, b) => a + b, 0);
    const average = sum / array.length;
    return Number(average.toFixed(2))
  }

  gramaje(i){
    this.analisis.gramaje.gramaje[i] = (this.analisis.gramaje.masa_inicial[i]/(this.analisis.ancho*this.analisis.largo))*10000;
    this.analisis.gramaje.gramaje[i] = Number(this.analisis.gramaje.gramaje[i].toFixed(2))
    this.analisis.gramaje.max = Number(Math.max.apply(Math, this.analisis.gramaje.gramaje).toFixed(2));
    this.analisis.gramaje.min = Number(Math.min.apply(Math, this.analisis.gramaje.gramaje).toFixed(2));

    const sum = this.analisis.gramaje.gramaje.reduce((a, b) => a + b, 0);
    const average = sum / this.analisis.gramaje.gramaje.length;
    this.analisis.gramaje.promedio =   Number(average.toFixed(2));
    this.analisis.gramaje.desviacion = Number(this.desviacionEstandar(this.analisis.gramaje.gramaje, this.analisis.gramaje.promedio).toFixed(2))
    if(this.analisis.gramaje.desviacion > 0){
      this.analisis.gramaje.decimales = 0;
    }
    if(this.analisis.gramaje.desviacion < 1){
      let str = this.analisis.gramaje.desviacion.toString()
      let split = str.split('.')
      let decimales = split[1]

      if(decimales){
        for(let i=0;i<decimales.length;i++){
          if(decimales[i] != '0'){
            this.analisis.gramaje.decimales = Number(i)
            this.analisis.gramaje.decimales = this.analisis.gramaje.decimales + 1;
            i = 100;
          }
        }
      }else{
        this.analisis.gramaje.decimales = 2;
      }
    }
  }

  cobb(i){

    if(i+1 <= this.analisis.numero_muestras/2){
      this.analisis.cobb.top.cobb[i] = (this.analisis.gramaje.masa_final[i] - this.analisis.gramaje.masa_inicial[i]) * 100;
      this.analisis.cobb.top.cobb[i] = Number(this.analisis.cobb.top.cobb[i].toFixed(2))
      console.log(this.analisis.cobb.top.cobb[i], 'cobb');
      
      this.analisis.cobb.top.max = Math.max.apply(Math, this.analisis.cobb.top.cobb);
      this.analisis.cobb.top.min = Math.min.apply(Math, this.analisis.cobb.top.cobb); 

      const sum = this.analisis.cobb.top.cobb.reduce((a, b) => a + b, 0);
    const average = sum / this.analisis.cobb.top.cobb.length;
    this.analisis.cobb.top.promedio =   Number(average.toFixed(2));
    this.analisis.cobb.top.desviacion = Number(this.desviacionEstandar(this.analisis.cobb.top.cobb, this.analisis.cobb.top.promedio).toFixed(2))
    if(this.analisis.cobb.top.desviacion > 0){
      this.analisis.cobb.top.decimales = 0;
    }
    if(this.analisis.cobb.top.desviacion < 1){
      let str = this.analisis.cobb.top.desviacion.toString()
      let split = str.split('.')
      let decimales = split[1]

      if(decimales){
        for(let i=0;i<decimales.length;i++){
          if(decimales[i] != '0'){
            this.analisis.cobb.top.decimales = Number(i)
            this.analisis.cobb.top.decimales = this.analisis.gramaje.decimales + 1;
            i = 100;
          }
        }
      }else{
        this.analisis.cobb.top.decimales = 2;
      }
    }
    }
    if(i+1 > this.analisis.numero_muestras/2){
      this.analisis.cobb.back.cobb[i] = (this.analisis.gramaje.masa_final[i] - this.analisis.gramaje.masa_inicial[i]) * 100;
      this.analisis.cobb.back.cobb[i] = Number(this.analisis.cobb.back.cobb[i].toFixed(2))
      let fill = this.analisis.cobb.back.cobb.filter(x=> x >= 0)
      this.analisis.cobb.back.max = Math.max(...fill);
      this.analisis.cobb.back.min = Math.min(...fill);

      const sum = this.analisis.cobb.back.cobb.reduce((a, b) => a + b, 0);
    const average = sum / fill.length;
    this.analisis.cobb.back.promedio =   Number(average.toFixed(2));
    this.analisis.cobb.back.desviacion = Number(this.desviacionEstandar(fill, this.analisis.cobb.back.promedio).toFixed(2))
    if(this.analisis.cobb.back.desviacion > 0){
      this.analisis.cobb.back.decimales = 0;
    }
    if(this.analisis.cobb.back.desviacion < 1){
      let str = this.analisis.cobb.back.desviacion.toString()
      let split = str.split('.')
      let decimales = split[1]

      if(decimales){
        for(let i=0;i<decimales.length;i++){
          if(decimales[i] != '0'){
            this.analisis.cobb.back.decimales = Number(i)
            this.analisis.cobb.back.decimales = this.analisis.gramaje.decimales + 1;
            i = 100;
          }
        }
      }else{
        this.analisis.cobb.back.decimales = 2;
      }

    }
    }
  }

  calibre_(i){
    this.analisis.calibre.um.um[i] = this.analisis.calibre.mm.mm[i]*1000;
    this.analisis.calibre.um.um[i] = Number(this.analisis.calibre.um.um[i].toFixed(2))
    this.analisis.calibre.pt.pt[i] = this.analisis.calibre.mm.mm[i]/0.0254;
    this.analisis.calibre.pt.pt[i] = Number(this.analisis.calibre.pt.pt[i].toFixed(2))

    this.analisis.calibre.mm.max = Math.max(...this.analisis.calibre.mm.mm)
    this.analisis.calibre.mm.min = Math.min(...this.analisis.calibre.mm.mm)
    this.analisis.calibre.mm.promedio = this.Promedio(this.analisis.calibre.mm.mm)
    this.analisis.calibre.mm.desviacion = this.desviacionEstandar(this.analisis.calibre.mm.mm, this.analisis.calibre.mm.promedio)
    if(this.analisis.calibre.mm.desviacion < 1){
      let str = this.analisis.calibre.mm.desviacion.toString()
      let split = str.split('.')
      let decimales = split[1]

      if(decimales){
        for(let i=0;i<decimales.length;i++){
          if(decimales[i] != '0'){
            this.analisis.calibre.mm.decimales = Number(i)
            this.analisis.calibre.mm.decimales = this.analisis.calibre.mm.decimales + 1;
            i = 100;
          }
        }
      }else{
        this.analisis.calibre.mm.decimales = 2;
      }
    }
    
    this.analisis.calibre.um.max = Math.max(...this.analisis.calibre.um.um)
    this.analisis.calibre.um.min = Math.min(...this.analisis.calibre.um.um)
    this.analisis.calibre.um.promedio = this.Promedio(this.analisis.calibre.um.um)
    this.analisis.calibre.um.desviacion = this.desviacionEstandar(this.analisis.calibre.um.um, this.analisis.calibre.um.promedio)
    if(this.analisis.calibre.um.desviacion < 1){
      let str = this.analisis.calibre.um.desviacion.toString()
      let split = str.split('.')
      let decimales = split[1]

      if(decimales){
        for(let i=0;i<decimales.length;i++){
          if(decimales[i] != '0'){
            this.analisis.calibre.um.decimales = Number(i)
            this.analisis.calibre.um.decimales = this.analisis.calibre.um.decimales + 1;
            i = 100;
          }
        }
      }else{
        this.analisis.calibre.um.decimales = 2;
      }
    }

    
    this.analisis.calibre.pt.max = Math.max(...this.analisis.calibre.pt.pt)
    this.analisis.calibre.pt.min = Math.min(...this.analisis.calibre.pt.pt)
    this.analisis.calibre.pt.promedio = this.Promedio(this.analisis.calibre.pt.pt)
    this.analisis.calibre.pt.desviacion = this.desviacionEstandar(this.analisis.calibre.pt.pt, this.analisis.calibre.pt.promedio)
    if(this.analisis.calibre.pt.desviacion < 1){
      let str = this.analisis.calibre.pt.desviacion.toString()
      let split = str.split('.')
      let decimales = split[1]

      if(decimales){
        for(let i=0;i<decimales.length;i++){
          if(decimales[i] != '0'){
            this.analisis.calibre.pt.decimales = Number(i)
            this.analisis.calibre.pt.decimales = this.analisis.calibre.pt.decimales + 1;
            i = 100;
          }
        }
      }else{
        this.analisis.calibre.pt.decimales = 2;
      }
    }

  }

  curling_(i){
    this.analisis.curling_blancura.curling.max = Number(Math.max.apply(Math, this.analisis.curling_blancura.curling.curling).toFixed(2));
    this.analisis.curling_blancura.curling.min = Number(Math.min.apply(Math, this.analisis.curling_blancura.curling.curling).toFixed(2));
  
    const sum = this.analisis.curling_blancura.curling.curling.reduce((a, b) => a + b, 0);
    const average = sum / this.analisis.curling_blancura.curling.curling.length;
    this.analisis.curling_blancura.curling.promedio =   Number(average.toFixed(2));
    this.analisis.curling_blancura.curling.desviacion = Number(this.desviacionEstandar(this.analisis.curling_blancura.curling.curling, this.analisis.curling_blancura.curling.promedio).toFixed(2))
    if(this.analisis.curling_blancura.curling.desviacion > 0){
      this.analisis.curling_blancura.curling.decimales = 0;
    }
    if(this.analisis.curling_blancura.curling.desviacion < 1){
      let str = this.analisis.curling_blancura.curling.desviacion.toString()
      let split = str.split('.')
      let decimales = split[1]

      if(decimales){
        for(let i=0;i<decimales.length;i++){
          if(decimales[i] != '0'){
            this.analisis.curling_blancura.curling.decimales = Number(i)
            this.analisis.curling_blancura.curling.decimales = this.analisis.curling_blancura.curling.decimales + 1;
            i = 100;
          }
        }
      }else{
        this.analisis.curling_blancura.curling.decimales = 2;
      }
    }
  }

  blancura_(i){
    this.analisis.curling_blancura.blancura.max = Number(Math.max.apply(Math, this.analisis.curling_blancura.blancura.blancura).toFixed(2));
    this.analisis.curling_blancura.blancura.min = Number(Math.min.apply(Math, this.analisis.curling_blancura.blancura.blancura).toFixed(2));
  
    const sum = this.analisis.curling_blancura.blancura.blancura.reduce((a, b) => a + b, 0);
    const average = sum / this.analisis.curling_blancura.blancura.blancura.length;
    this.analisis.curling_blancura.blancura.promedio =   Number(average.toFixed(2));
    this.analisis.curling_blancura.blancura.desviacion = Number(this.desviacionEstandar(this.analisis.curling_blancura.blancura.blancura, this.analisis.curling_blancura.blancura.promedio).toFixed(2))
    if(this.analisis.curling_blancura.blancura.desviacion > 0){
      this.analisis.curling_blancura.blancura.decimales = 0;
    }
    if(this.analisis.curling_blancura.blancura.desviacion < 1){
      let str = this.analisis.curling_blancura.blancura.desviacion.toString()
      let split = str.split('.')
      let decimales = split[1]

      if(decimales){
        for(let i=0;i<decimales.length;i++){
          if(decimales[i] != '0'){
            this.analisis.curling_blancura.blancura.decimales = Number(i)
            this.analisis.curling_blancura.blancura.decimales = this.analisis.curling_blancura.blancura.decimales + 1;
            i = 100;
          }
        }
      }else{
        this.analisis.curling_blancura.blancura.decimales = 2;
      }
    }
  }

  escuadra_(i){
    this.analisis.dimensiones.Escuadra.max = Number(Math.max.apply(Math, this.analisis.dimensiones.Escuadra.escuadra).toFixed(2));
    this.analisis.dimensiones.Escuadra.min = Number(Math.min.apply(Math, this.analisis.dimensiones.Escuadra.escuadra).toFixed(2));
  
    const sum = this.analisis.dimensiones.Escuadra.escuadra.reduce((a, b) => a + b, 0);
    const average = sum / this.analisis.dimensiones.Escuadra.escuadra.length;
    this.analisis.dimensiones.Escuadra.promedio =   Number(average.toFixed(2));
    this.analisis.dimensiones.Escuadra.desviacion = Number(this.desviacionEstandar(this.analisis.dimensiones.Escuadra.escuadra, this.analisis.dimensiones.Escuadra.promedio).toFixed(2))
    if(this.analisis.dimensiones.Escuadra.desviacion > 0){
      this.analisis.dimensiones.Escuadra.decimales = 0;
    }
    if(this.analisis.dimensiones.Escuadra.desviacion < 1){
      let str = this.analisis.dimensiones.Escuadra.desviacion.toString()
      let split = str.split('.')
      let decimales = split[1]

      if(decimales){
        for(let i=0;i<decimales.length;i++){
          if(decimales[i] != '0'){
            this.analisis.dimensiones.Escuadra.decimales = Number(i)
            this.analisis.dimensiones.Escuadra.decimales = this.analisis.dimensiones.Escuadra.decimales + 1;
            i = 100;
          }
        }
      }else{
        this.analisis.dimensiones.Escuadra.decimales = 2;
      }
    }
  }

  contraEscuadra_(i){
    this.analisis.dimensiones.contraEscuadra.max = Number(Math.max.apply(Math, this.analisis.dimensiones.contraEscuadra.contraEscuadra).toFixed(2));
    this.analisis.dimensiones.contraEscuadra.min = Number(Math.min.apply(Math, this.analisis.dimensiones.contraEscuadra.contraEscuadra).toFixed(2));
  
    const sum = this.analisis.dimensiones.contraEscuadra.contraEscuadra.reduce((a, b) => a + b, 0);
    const average = sum / this.analisis.dimensiones.contraEscuadra.contraEscuadra.length;
    this.analisis.dimensiones.contraEscuadra.promedio =   Number(average.toFixed(2));
    this.analisis.dimensiones.contraEscuadra.desviacion = Number(this.desviacionEstandar(this.analisis.dimensiones.contraEscuadra.contraEscuadra, this.analisis.dimensiones.contraEscuadra.promedio).toFixed(2))
    if(this.analisis.dimensiones.contraEscuadra.desviacion > 0){
      this.analisis.dimensiones.contraEscuadra.decimales = 0;
    }
    if(this.analisis.dimensiones.contraEscuadra.desviacion < 1){
      let str = this.analisis.dimensiones.contraEscuadra.desviacion.toString()
      let split = str.split('.')
      let decimales = split[1]

      if(decimales){
        for(let i=0;i<decimales.length;i++){
          if(decimales[i] != '0'){
            this.analisis.dimensiones.contraEscuadra.decimales = Number(i)
            this.analisis.dimensiones.contraEscuadra.decimales = this.analisis.dimensiones.contraEscuadra.decimales + 1;
            i = 100;
          }
        }
      }else{
        this.analisis.dimensiones.contraEscuadra.decimales = 2;
      }
    }
  }

  Pinza_(i){
    this.analisis.dimensiones.Pinza.max = Number(Math.max.apply(Math, this.analisis.dimensiones.Pinza.pinza).toFixed(2));
    this.analisis.dimensiones.Pinza.min = Number(Math.min.apply(Math, this.analisis.dimensiones.Pinza.pinza).toFixed(2));
  
    const sum = this.analisis.dimensiones.Pinza.pinza.reduce((a, b) => a + b, 0);
    const average = sum / this.analisis.dimensiones.Pinza.pinza.length;
    this.analisis.dimensiones.Pinza.promedio =   Number(average.toFixed(2));
    this.analisis.dimensiones.Pinza.desviacion = Number(this.desviacionEstandar(this.analisis.dimensiones.Pinza.pinza, this.analisis.dimensiones.Pinza.promedio).toFixed(2))
    if(this.analisis.dimensiones.Pinza.desviacion > 0){
      this.analisis.dimensiones.Pinza.decimales = 0;
    }
    if(this.analisis.dimensiones.Pinza.desviacion < 1){
      let str = this.analisis.dimensiones.Pinza.desviacion.toString()
      let split = str.split('.')
      let decimales = split[1]

      if(decimales){
        for(let i=0;i<decimales.length;i++){
          if(decimales[i] != '0'){
            this.analisis.dimensiones.Pinza.decimales = Number(i)
            this.analisis.dimensiones.Pinza.decimales = this.analisis.dimensiones.Pinza.decimales + 1;
            i = 100;
          }
        }
      }else{
        this.analisis.dimensiones.Pinza.decimales = 2;
      }
    }
  }

  contraPinza_(i){
    this.analisis.dimensiones.contraPinza.max = Number(Math.max.apply(Math, this.analisis.dimensiones.contraPinza.contraPinza).toFixed(2));
    this.analisis.dimensiones.contraPinza.min = Number(Math.min.apply(Math, this.analisis.dimensiones.contraPinza.contraPinza).toFixed(2));
  
    const sum = this.analisis.dimensiones.contraPinza.contraPinza.reduce((a, b) => a + b, 0);
    const average = sum / this.analisis.dimensiones.contraPinza.contraPinza.length;
    this.analisis.dimensiones.contraPinza.promedio =   Number(average.toFixed(2));
    this.analisis.dimensiones.contraPinza.desviacion = Number(this.desviacionEstandar(this.analisis.dimensiones.contraPinza.contraPinza, this.analisis.dimensiones.contraPinza.promedio).toFixed(2))
    if(this.analisis.dimensiones.contraPinza.desviacion > 0){
      this.analisis.dimensiones.contraPinza.decimales = 0;
    }
    if(this.analisis.dimensiones.contraPinza.desviacion < 1){
      let str = this.analisis.dimensiones.contraPinza.desviacion.toString()
      let split = str.split('.')
      let decimales = split[1]

      if(decimales){
        for(let i=0;i<decimales.length;i++){
          if(decimales[i] != '0'){
            this.analisis.dimensiones.contraPinza.decimales = Number(i)
            this.analisis.dimensiones.contraPinza.decimales = this.analisis.dimensiones.contraPinza.decimales + 1;
            i = 100;
          }
        }
      }else{
        this.analisis.dimensiones.contraPinza.decimales = 2;
      }
    }
  }

  guardar(){
    this.analisis.resultado.guardado.fecha = moment().format('DD/MM/YYYY')
    this.api.EnviarAnalisisSustrato(this.analisis, this.Recepcion, this.Index);
    this.onCloseModal.emit();
  }

  AnalisisCompletado(){

  }

  cerrar(){
    this.onCloseSencillo.emit();
  }
}