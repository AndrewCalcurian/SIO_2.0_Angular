import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-analisis-cajas',
  templateUrl: './analisis-cajas.component.html',
  styleUrls: ['./analisis-cajas.component.scss']
})
export class AnalisisCajasComponent {

  @Input() caja!:boolean;
  @Input() Materiales:any;
  @Output() onCloseModal = new EventEmitter();


  public muestras = 0;
  
  interna = true;
  externa = false;
  espesor = false;

  Largo = true;
  Ancho = false;
  Alto = false;

  analisis:any = {
    longitud_interna:{
      largo:{
        largo:[],
        min:0,
        max:0,
        promedio:0,
        desviacion:0,
        decimales:0
      },
      ancho:{
        ancho:[],
        min:0,
        max:0,
        promedio:0,
        desviacion:0,
        decimales:0
      },
      alto:{
        alto:[],
        min:0,
        max:0,
        promedio:0,
        desviacion:0,
        decimales:0
      },
    },
    longitud_externa:{
      largo:{
        largo:[],
        min:0,
        max:0,
        promedio:0,
        desviacion:0,
        decimales:0
      },
      ancho:{
        ancho:[],
        min:0,
        max:0,
        promedio:0,
        desviacion:0,
        decimales:0
      },
      alto:{
        alto:[],
        min:0,
        max:0,
        promedio:0,
        desviacion:0,
        decimales:0
      },
    },
    espesor:{
      espesor:[],
      min:0,
      max:0,
      promedio:0,
      desviacion:0,
      decimales:0
    }
  }

  cerrar(){
    this.onCloseModal.emit();
  }

  change(n: string): void {
    switch(n) {
      case 'a':
        this.interna = true;
        this.externa = false;
        this.espesor = false;
        break;
      case 'b':
        this.interna = false;
        this.externa = true;
        this.espesor = false;
        break;
      case 'c':
        this.interna = false;
        this.externa = false;
        this.espesor = true;
        break;
      default:
        // Handle default case if needed
        break;
    }
}

change2(n: string): void {
  switch(n) {
    case 'a':
      this.Largo = true;
      this.Ancho = false;
      this.Alto = false;
      break;
    case 'b':
      this.Largo = false;
      this.Ancho = true;
      this.Alto = false;
      break;
    case 'c':
      this.Largo = false;
      this.Ancho = false;
      this.Alto = true;
      break;
    default:
      // Handle default case if needed
      break;
  }
}

guardar(){
  console.log(this.analisis)
}

desviacionEstandar(array, promedio) {
  let suma = 0;
  for (let i = 0; i < array.length; i++) {
    suma += Math.pow(array[i] - promedio, 2);
  }
  return Math.sqrt(suma / (array.length - 1));
}

interna_larga(){
    this.analisis.longitud_interna.largo.max = Number(Math.max.apply(Math, this.analisis.longitud_interna.largo.largo).toFixed(2));
    this.analisis.longitud_interna.largo.min = Number(Math.min.apply(Math, this.analisis.longitud_interna.largo.largo).toFixed(2));
  
    const sum = this.analisis.longitud_interna.largo.largo.reduce((a, b) => a + b, 0);
    console.log(sum)
    const average = sum / this.analisis.longitud_interna.largo.largo.length;
    this.analisis.longitud_interna.largo.promedio =   Number(average.toFixed(2));
    this.analisis.longitud_interna.largo.desviacion = Number(this.desviacionEstandar(this.analisis.longitud_interna.largo.largo, this.analisis.longitud_interna.largo.promedio).toFixed(2))

    if(this.analisis.longitud_interna.largo.desviacion < 1){
      let str = this.analisis.longitud_interna.largo.desviacion.toString()
      let split = str.split('.')
      let decimales = split[1]

      if(decimales){
        for(let i=0;i<decimales.length;i++){
          if(decimales[i] != '0'){
            this.analisis.longitud_interna.largo.decimales = Number(i)
            this.analisis.longitud_interna.largo.decimales = this.analisis.longitud_interna.largo.decimales + 1;
            i = 100;
          }
        }
      }else{
        this.analisis.longitud_interna.largo.decimales = 2;
      }
    }

}

interna_ancha(){
  this.analisis.longitud_interna.ancho.max = Number(Math.max.apply(Math, this.analisis.longitud_interna.ancho.ancho).toFixed(2));
  this.analisis.longitud_interna.ancho.min = Number(Math.min.apply(Math, this.analisis.longitud_interna.ancho.ancho).toFixed(2));

  const sum = this.analisis.longitud_interna.ancho.ancho.reduce((a, b) => a + b, 0);
  console.log(sum)
  const average = sum / this.analisis.longitud_interna.ancho.ancho.length;
  this.analisis.longitud_interna.ancho.promedio =   Number(average.toFixed(2));
  this.analisis.longitud_interna.ancho.desviacion = Number(this.desviacionEstandar(this.analisis.longitud_interna.ancho.ancho, this.analisis.longitud_interna.ancho.promedio).toFixed(2))

  if(this.analisis.longitud_interna.ancho.desviacion < 1){
    let str = this.analisis.longitud_interna.ancho.desviacion.toString()
    let split = str.split('.')
    let decimales = split[1]

    if(decimales){
      for(let i=0;i<decimales.length;i++){
        if(decimales[i] != '0'){
          this.analisis.longitud_interna.ancho.decimales = Number(i)
          this.analisis.longitud_interna.ancho.decimales = this.analisis.longitud_interna.ancho.decimales + 1;
          i = 100;
        }
      }
    }else{
      this.analisis.longitud_interna.ancho.decimales = 2;
    }
  }

}

interna_alta(){
  this.analisis.longitud_interna.alto.max = Number(Math.max.apply(Math, this.analisis.longitud_interna.alto.alto).toFixed(2));
  this.analisis.longitud_interna.alto.min = Number(Math.min.apply(Math, this.analisis.longitud_interna.alto.alto).toFixed(2));

  const sum = this.analisis.longitud_interna.alto.alto.reduce((a, b) => a + b, 0);
  console.log(sum)
  const average = sum / this.analisis.longitud_interna.alto.alto.length;
  this.analisis.longitud_interna.alto.promedio =   Number(average.toFixed(2));
  this.analisis.longitud_interna.alto.desviacion = Number(this.desviacionEstandar(this.analisis.longitud_interna.alto.alto, this.analisis.longitud_interna.alto.promedio).toFixed(2))

  if(this.analisis.longitud_interna.alto.desviacion < 1){
    let str = this.analisis.longitud_interna.alto.desviacion.toString()
    let split = str.split('.')
    let decimales = split[1]

    if(decimales){
      for(let i=0;i<decimales.length;i++){
        if(decimales[i] != '0'){
          this.analisis.longitud_interna.alto.decimales = Number(i)
          this.analisis.longitud_interna.alto.decimales = this.analisis.longitud_interna.alto.decimales + 1;
          i = 100;
        }
      }
    }else{
      this.analisis.longitud_interna.alto.decimales = 2;
    }
  }

}


externa_larga(){
  this.analisis.longitud_externa.largo.max = Number(Math.max.apply(Math, this.analisis.longitud_externa.largo.largo).toFixed(2));
  this.analisis.longitud_externa.largo.min = Number(Math.min.apply(Math, this.analisis.longitud_externa.largo.largo).toFixed(2));

  const sum = this.analisis.longitud_externa.largo.largo.reduce((a, b) => a + b, 0);
  console.log(sum)
  const average = sum / this.analisis.longitud_externa.largo.largo.length;
  this.analisis.longitud_externa.largo.promedio =   Number(average.toFixed(2));
  this.analisis.longitud_externa.largo.desviacion = Number(this.desviacionEstandar(this.analisis.longitud_externa.largo.largo, this.analisis.longitud_externa.largo.promedio).toFixed(2))

  if(this.analisis.longitud_externa.largo.desviacion < 1){
    let str = this.analisis.longitud_externa.largo.desviacion.toString()
    let split = str.split('.')
    let decimales = split[1]

    if(decimales){
      for(let i=0;i<decimales.length;i++){
        if(decimales[i] != '0'){
          this.analisis.longitud_externa.largo.decimales = Number(i)
          this.analisis.longitud_externa.largo.decimales = this.analisis.longitud_externa.largo.decimales + 1;
          i = 100;
        }
      }
    }else{
      this.analisis.longitud_externa.largo.decimales = 2;
    }
  }

}

externa_ancha(){
this.analisis.longitud_externa.ancho.max = Number(Math.max.apply(Math, this.analisis.longitud_externa.ancho.ancho).toFixed(2));
this.analisis.longitud_externa.ancho.min = Number(Math.min.apply(Math, this.analisis.longitud_externa.ancho.ancho).toFixed(2));

const sum = this.analisis.longitud_externa.ancho.ancho.reduce((a, b) => a + b, 0);
console.log(sum)
const average = sum / this.analisis.longitud_externa.ancho.ancho.length;
this.analisis.longitud_externa.ancho.promedio =   Number(average.toFixed(2));
this.analisis.longitud_externa.ancho.desviacion = Number(this.desviacionEstandar(this.analisis.longitud_externa.ancho.ancho, this.analisis.longitud_externa.ancho.promedio).toFixed(2))

if(this.analisis.longitud_externa.ancho.desviacion < 1){
  let str = this.analisis.longitud_externa.ancho.desviacion.toString()
  let split = str.split('.')
  let decimales = split[1]

  if(decimales){
    for(let i=0;i<decimales.length;i++){
      if(decimales[i] != '0'){
        this.analisis.longitud_externa.ancho.decimales = Number(i)
        this.analisis.longitud_externa.ancho.decimales = this.analisis.longitud_externa.ancho.decimales + 1;
        i = 100;
      }
    }
  }else{
    this.analisis.longitud_externa.ancho.decimales = 2;
  }
}

}

externa_alta(){
this.analisis.longitud_externa.alto.max = Number(Math.max.apply(Math, this.analisis.longitud_externa.alto.alto).toFixed(2));
this.analisis.longitud_externa.alto.min = Number(Math.min.apply(Math, this.analisis.longitud_externa.alto.alto).toFixed(2));

const sum = this.analisis.longitud_externa.alto.alto.reduce((a, b) => a + b, 0);
console.log(sum)
const average = sum / this.analisis.longitud_externa.alto.alto.length;
this.analisis.longitud_externa.alto.promedio =   Number(average.toFixed(2));
this.analisis.longitud_externa.alto.desviacion = Number(this.desviacionEstandar(this.analisis.longitud_externa.alto.alto, this.analisis.longitud_externa.alto.promedio).toFixed(2))

if(this.analisis.longitud_externa.alto.desviacion < 1){
  let str = this.analisis.longitud_externa.alto.desviacion.toString()
  let split = str.split('.')
  let decimales = split[1]

  if(decimales){
    for(let i=0;i<decimales.length;i++){
      if(decimales[i] != '0'){
        this.analisis.longitud_externa.alto.decimales = Number(i)
        this.analisis.longitud_externa.alto.decimales = this.analisis.longitud_externa.alto.decimales + 1;
        i = 100;
      }
    }
  }else{
    this.analisis.longitud_externa.alto.decimales = 2;
  }
}

}

externa_espesor(){
  this.analisis.espesor.max = Number(Math.max.apply(Math, this.analisis.espesor.espesor).toFixed(2));
  this.analisis.espesor.min = Number(Math.min.apply(Math, this.analisis.espesor.espesor).toFixed(2));
  
  const sum = this.analisis.espesor.espesor.reduce((a, b) => a + b, 0);
  const average = sum / this.analisis.espesor.espesor.length;
  this.analisis.espesor.promedio =   Number(average.toFixed(2));
  this.analisis.espesor.desviacion = Number(this.desviacionEstandar(this.analisis.espesor.espesor, this.analisis.espesor.promedio).toFixed(2))
  
  if(this.analisis.espesor.desviacion < 1){
    let str = this.analisis.espesor.desviacion.toString()
    let split = str.split('.')
    let decimales = split[1]
  
    if(decimales){
      for(let i=0;i<decimales.length;i++){
        if(decimales[i] != '0'){
          this.analisis.espesor.decimales = Number(i)
          this.analisis.espesor.decimales = this.analisis.espesor.decimales + 1;
          i = 100;
        }
      }
    }else{
      this.analisis.espesor.decimales = 2;
    }
  }
  
  }

}
