import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-analisis-pads',
  templateUrl: './analisis-pads.component.html',
  styleUrls: ['./analisis-pads.component.scss']
})
export class AnalisisPadsComponent {
  @Input() pads:any;
  @Input() Materiales:any;
  @Output() onCloseModal = new EventEmitter();

  public muestras = 5;

  public analisis:any = {
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
    signado:{
      signado:[],
      min:0,
      max:0,
      promedio:0,
      desviacion:0,
      decimales:0
    },
    espesor:{
      espesor:[],
      min:0,
      max:0,
      promedio:0,
      desviacion:0,
      decimales:0
    },
  }

  desviacionEstandar(array, promedio) {
    let suma = 0;
    for (let i = 0; i < array.length; i++) {
      suma += Math.pow(array[i] - promedio, 2);
    }
    return Math.sqrt(suma / (array.length - 1));
  }


  largo(){
    this.analisis.largo.max = Number(Math.max.apply(Math, this.analisis.largo.largo).toFixed(2));
    this.analisis.largo.min = Number(Math.min.apply(Math, this.analisis.largo.largo).toFixed(2));
  
    const sum = this.analisis.largo.largo.reduce((a, b) => a + b, 0);
    console.log(sum)
    const average = sum / this.analisis.largo.largo.length;
    this.analisis.largo.promedio =   Number(average.toFixed(2));
    this.analisis.largo.desviacion = Number(this.desviacionEstandar(this.analisis.largo.largo, this.analisis.largo.promedio).toFixed(2))
  
    if(this.analisis.largo.desviacion < 1){
      let str = this.analisis.largo.desviacion.toString()
      let split = str.split('.')
      let decimales = split[1]
  
      if(decimales){
        for(let i=0;i<decimales.length;i++){
          if(decimales[i] != '0'){
            this.analisis.largo.decimales = Number(i)
            this.analisis.largo.decimales = this.analisis.largo.decimales + 1;
            i = 100;
          }
        }
      }else{
        this.analisis.largo.decimales = 2;
      }
    }
  
  }

  ancho(){
    this.analisis.ancho.max = Number(Math.max.apply(Math, this.analisis.ancho.ancho).toFixed(2));
    this.analisis.ancho.min = Number(Math.min.apply(Math, this.analisis.ancho.ancho).toFixed(2));
  
    const sum = this.analisis.ancho.ancho.reduce((a, b) => a + b, 0);
    console.log(sum)
    const average = sum / this.analisis.ancho.ancho.length;
    this.analisis.ancho.promedio =   Number(average.toFixed(2));
    this.analisis.ancho.desviacion = Number(this.desviacionEstandar(this.analisis.ancho.ancho, this.analisis.ancho.promedio).toFixed(2))
  
    if(this.analisis.ancho.desviacion < 1){
      let str = this.analisis.ancho.desviacion.toString()
      let split = str.split('.')
      let decimales = split[1]
  
      if(decimales){
        for(let i=0;i<decimales.length;i++){
          if(decimales[i] != '0'){
            this.analisis.ancho.decimales = Number(i)
            this.analisis.ancho.decimales = this.analisis.ancho.decimales + 1;
            i = 100;
          }
        }
      }else{
        this.analisis.ancho.decimales = 2;
      }
    }
  
  }

  signado(){
    this.analisis.signado.max = Number(Math.max.apply(Math, this.analisis.signado.signado).toFixed(2));
    this.analisis.signado.min = Number(Math.min.apply(Math, this.analisis.signado.signado).toFixed(2));
  
    const sum = this.analisis.signado.signado.reduce((a, b) => a + b, 0);
    console.log(sum)
    const average = sum / this.analisis.signado.signado.length;
    this.analisis.signado.promedio =   Number(average.toFixed(2));
    this.analisis.signado.desviacion = Number(this.desviacionEstandar(this.analisis.signado.signado, this.analisis.signado.promedio).toFixed(2))
  
    if(this.analisis.signado.desviacion < 1){
      let str = this.analisis.signado.desviacion.toString()
      let split = str.split('.')
      let decimales = split[1]
  
      if(decimales){
        for(let i=0;i<decimales.length;i++){
          if(decimales[i] != '0'){
            this.analisis.signado.decimales = Number(i)
            this.analisis.signado.decimales = this.analisis.signado.decimales + 1;
            i = 100;
          }
        }
      }else{
        this.analisis.signado.decimales = 2;
      }
    }
  
  }

  espesor(){
    this.analisis.espesor.max = Number(Math.max.apply(Math, this.analisis.espesor.espesor).toFixed(2));
    this.analisis.espesor.min = Number(Math.min.apply(Math, this.analisis.espesor.espesor).toFixed(2));
  
    const sum = this.analisis.espesor.espesor.reduce((a, b) => a + b, 0);
    console.log(sum)
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

// Función genérica para realizar los cálculos de ancho y signado
calcularMedidas(tipo: string, medidas: number[], analisis: any) {
  // Calcular el máximo y mínimo
  analisis[tipo].max = Number(Math.max.apply(Math, medidas).toFixed(2));
  analisis[tipo].min = Number(Math.min.apply(Math, medidas).toFixed(2));

  // Calcular la suma, promedio y desviación estándar
  const sum = medidas.reduce((a, b) => a + b, 0);
  const average = sum / medidas.length;
  analisis[tipo].promedio = Number(average.toFixed(2));
  analisis[tipo].desviacion = Number(this.desviacionEstandar(medidas, average).toFixed(2));

  // Calcular el número de decimales si la desviación es menor que 1
  if (analisis[tipo].desviacion < 1) {
      let str = analisis[tipo].desviacion.toString();
      let split = str.split('.');
      let decimales = split[1];
      if (decimales) {
          for (let i = 0; i < decimales.length; i++) {
              if (decimales[i] !== '0') {
                  analisis[tipo].decimales = Number(i) + 1;
                  break;
              }
          }
      } else {
          analisis[tipo].decimales = 2;
      }
  }
}

// Llamar a la función genérica para calcular las medidas de ancho
// ancho() {
//   this.calcularMedidas('ancho', this.analisis.ancho.ancho, this.analisis);
// }

// // Llamar a la función genérica para calcular las medidas de signado
// signado() {
//   this.calcularMedidas('signado', this.analisis.signado.signado, this.analisis);
// }

  cerrar(){
    this.onCloseModal.emit();
  }

}
