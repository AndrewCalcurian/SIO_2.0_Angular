import { Component, Input } from '@angular/core';
import { empty } from 'rxjs';
import { AnalisisSustrato, AnalisisSustrato2 } from 'src/app/compras/models/modelos-compra';

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

  public Gramaje_Cobb = true;
  public calibre = false;
  public curling = false;
  public dimensiones = false;


  public analisis:AnalisisSustrato2 = {
    numero_muestras: 0,
    ancho:0,
    largo:0,
    gramaje:{
      masa_inicial:[],
      masa_final:[],
      gramaje:[],
      promedio:0,
      desviacion:0,
      max:0,
      min:0,
      decimales:0
    },
    cobb:{
      top:{
        cobb:[],
        max:0,
        min:0,
        promedio:0,
        desviacion:0,
        decimales:0
      },
      back:{
        cobb:[],
        max:0,
        min:0,
        promedio:0,
        desviacion:0,
        decimales:0
      }
    },
    calibre:{
      mm:{
        mm:[],
        max:0,
        min:0,
        promedio:0,
        desviacion:0,
        decimales:0
      },
      um:{
        um:[],
        max:0,
        min:0,
        promedio:0,
        desviacion:0,
        decimales:0
      },
      pt:{
        pt:[],
        max:0,
        min:0,
        promedio:0,
        desviacion:0,
        decimales:0
      }
    }
  } 

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
    
    this.analisis.calibre.um.min = Math.min(...this.analisis.calibre.um.um)
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

    
    this.analisis.calibre.pt.min = Math.min(...this.analisis.calibre.pt.pt)
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


}