import { Component, EventEmitter, Input, Output } from '@angular/core';
import * as moment from 'moment';
import { Cell, Img, PdfMakeWrapper, Stack, Table, Txt } from 'pdfmake-wrapper';
import * as pdfFonts from "pdfmake/build/vfs_fonts";
import { AnalisisService } from 'src/app/services/analisis.service';

@Component({
  selector: 'app-analisis-cajas',
  templateUrl: './analisis-cajas.component.html',
  styleUrls: ['./analisis-cajas.component.scss']
})
export class AnalisisCajasComponent {

  constructor(public api:AnalisisService){}

  @Input() caja!:boolean;
  @Input() Recepcion:any;
  @Input() Materiales:any;
  @Input() analisis:any;
  @Input() Index:any;
  @Output() onCloseModal = new EventEmitter()
  
  interna = true;
  externa = false;
  espesor = false;

  Largo = true;
  Ancho = false;
  Alto = false;

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
  this.analisis.resultado.guardado.fecha = moment().format('DD/MM/YYYY')
    this.api.EnviarAnalisisCajas(this.analisis, this.Recepcion, this.Index);
    this.onCloseModal.emit();
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

  AnalisisCompletado(){

    let analisis = this.analisis
    let Material = this.Materiales[0]

    let muestras:number[] = [];
    let muestras1:string[] = [];
    let muestras2:string[] = [];
    let muestras3:string[] = [];
    let muestras4:string[] = [];
    let muestras5:string[] = [];
    let muestras6:string[] = [];
    let muestras7:string[] = [];

    let muestras11:string[] = [];
    let muestras22:string[] = [];
    let muestras33:string[] = [];
    let muestras44:string[] = [];
    let muestras55:string[] = [];
    let muestras66:string[] = [];
    let muestras77:string[] = [];

    let muestras111:string[] = [];
    let muestras222:string[] = [];
    let muestras333:string[] = [];
    let muestras444:string[] = [];
    let muestras555:string[] = [];
    let muestras666:string[] = [];
    let muestras777:string[] = [];

    for (let i = 1; i <= 50; i++) {
    muestras.push(i);
    // Generar un número aleatorio entre 1 y 99
  let randomNumber = Math.floor(Math.random() * 99) + 1;

  // Generar dos decimales aleatorios
  let randomDecimals = Math.floor(Math.random() * 100);

  // Combinar el número entero con los decimales
  let result = parseFloat(`${randomNumber}.${randomDecimals}`).toFixed(2);
    muestras1.push(result);
    muestras2.push(result);
    muestras3.push(result);
    muestras4.push(result);
    muestras5.push(result);
    muestras6.push(result);
    muestras7.push(result);

    if(i > 16){
      
    }



    }

    for(let i = 1; i <= 3; i++){

      // Generar un número aleatorio entre 1 y 99
  let randomNumber = Math.floor(Math.random() * 99) + 1;

  // Generar dos decimales aleatorios
  let randomDecimals = Math.floor(Math.random() * 100);

// Combinar el número entero con los decimales
let result = parseFloat(`${randomNumber}.${randomDecimals}`).toFixed(2);
      muestras11.push(result);
      muestras22.push(result);
      muestras33.push(result);
      muestras44.push(result);
      muestras55.push(result);
      muestras66.push(result);
      muestras77.push(result);
    }

    for(let i = 1; i <= 3; i++){

      // Generar un número aleatorio entre 1 y 99
  let randomNumber = Math.floor(Math.random() * 99) + 1;

  // Generar dos decimales aleatorios
  let randomDecimals = Math.floor(Math.random() * 100);

// Combinar el número entero con los decimales
let result = parseFloat(`${randomNumber}.${randomDecimals}`).toFixed(2);
      muestras111.push(result);
      muestras222.push(result);
      muestras333.push(result);
      muestras444.push(result);
      muestras555.push(result);
      muestras666.push(result);
      muestras777.push(result);
    }

    let operaciones = ['S','MÍN','MÁX']
    let operaciones2 = ['S','MÍN','MÁX']

    let hoy = moment().format('dd/mm/yyyy')
    async function GenerarCertificado(){
    const pdf = new PdfMakeWrapper();
    PdfMakeWrapper.setFonts(pdfFonts);
    pdf.pageOrientation('portrait');
    pdf.pageSize('A4');

    pdf.add(
      new Table([
        [
          new Cell(await new Img('../../assets/poli_cintillo.png').width(60).margin([0, 5]).build()).alignment('center').rowSpan(4).end,
          new Cell(new Txt(`
          FORMATO DE ANÁLISIS DE CAJAS DE CARTÓN CORRUGADAS
          `).bold().end).alignment('center').fontSize(9).rowSpan(4).end,
          new Cell(new Txt('Código: FLC-003').end).fillColor('#dedede').fontSize(5).alignment('center').end,
        ],
        [
          new Cell(new Txt('').end).end,
          new Cell(new Txt('').end).end,
          new Cell(new Txt('N° de Revisión: 0').end).fillColor('#dedede').fontSize(5).alignment('center').end,
        ],
        [
          new Cell(new Txt('').end).end,
          new Cell(new Txt('').end).end,
          new Cell(new Txt('Fecha de Revision: 18/08/2022').end).fillColor('#dedede').fontSize(5).alignment('center').end,
        ],
        [
          new Cell(new Txt('').end).end,
          new Cell(new Txt('').end).end,
          new Cell(new Txt('Página: 1 de 1').end).fillColor('#dedede').fontSize(5).alignment('center').end,
        ],
      ]).widths(['25%','50%','25%']).end
    )

    pdf.add(
      new Table([
        [
          new Cell(new Txt('').end).border([false]).fontSize(1).end
        ]
      ]).widths(['100%']).end
    )

    pdf.add(
      new Table([
        [
          new Cell(new Txt('INFORMACIÓN').bold().end).fontSize(8).color('#ffffff').fillColor('#000000').decorationColor('#ffffff').alignment('center').end
        ]
      ]).widths(['100%']).end
    )

    pdf.add(
      new Table([
        [
          new Cell(new Txt('DESCRIPCIÓN').end).fontSize(7).fillColor('#c8c8c8').end,
          new Cell(new Txt('Caja Nro 9').end).colSpan(3).fontSize(7).end,
          new Cell(new Txt('').end).fontSize(7).fillColor('#c8c8c8').end,
          new Cell(new Txt('').end).fontSize(7).end,
          new Cell(new Txt('LOTE').end).fontSize(7).fillColor('#c8c8c8').end,
          new Cell(new Txt('23022024-360').end).fontSize(7).end,
        ],
        [
          new Cell(new Txt('PROVEEDOR').end).fontSize(7).fillColor('#c8c8c8').end,
          new Cell(new Txt('Panel Sysmen, C.A').end).colSpan(3).fontSize(7).end,
          new Cell(new Txt('').end).fontSize(7).fillColor('#c8c8c8').end,
          new Cell(new Txt('').end).fontSize(7).end,
          new Cell(new Txt('FABRICACIÓN').end).fontSize(7).fillColor('#c8c8c8').end,
          new Cell(new Txt('09/10/2023').end).fontSize(7).end,
        ],
        [
          new Cell(new Txt('TIPO DE CARTÓN').end).fontSize(7).fillColor('#c8c8c8').end,
          new Cell(new Txt('C-6.0').end).fontSize(7).end,
          new Cell(new Txt('PRESENTACIÓN').end).fontSize(7).fillColor('#c8c8c8').end,
          new Cell(new Txt('Paquete de 25').end).fontSize(7).end,
          new Cell(new Txt('CANTIDAD').end).fontSize(7).fillColor('#c8c8c8').end,
          new Cell(new Txt('550').end).fontSize(7).end,
        ]
      ]).widths(['16%','10%','16%','26%','16%','16%']).end
    )

    pdf.add(
      new Table([
        [
          new Cell(new Txt(' ').end).border([false]).fontSize(1).end
        ]
      ]).widths(['100%']).end
    )

    pdf.add(
      new Table([
        [
          new Cell(new Txt('CARACTERÍSTICAS Y PROPIEDADES').bold().end).fontSize(8).color('#ffffff').fillColor('#000000').decorationColor('#ffffff').alignment('center').end
        ]
      ]).widths(['100%']).end
    )

    pdf.add(
      new Table([
        [
          new Cell(new Txt('Muestra').end).fillColor('#9b9b9b').margin([0,5.5]).rowSpan(2).colSpan(2).fontSize(7).alignment('center').end,
          new Cell(new Txt('Muestra').end).fillColor('#9b9b9b').rowSpan(2).fontSize(7).alignment('center').end,
          new Cell(new Txt('LONGITUD INTERNA (cm)').end).fillColor('#9b9b9b').colSpan(3).fontSize(7).alignment('center').end,
          new Cell(new Txt('').end).fontSize(7).alignment('center').end,
          new Cell(new Txt('').end).fontSize(7).alignment('center').end,
          new Cell(new Txt('LONGITUD EXTERNA (cm)').end).fillColor('#9b9b9b').colSpan(3).fontSize(7).alignment('center').end,
          new Cell(new Txt('').end).fontSize(7).alignment('center').end,
          new Cell(new Txt('').end).fontSize(7).alignment('center').end,
          new Cell(new Txt('ESPESOR (mm)').end).fillColor('#9b9b9b').margin([0,5.5]).rowSpan(2).fontSize(7).alignment('center').end,
        ],
        [
          new Cell(new Txt('').end).fontSize(7).alignment('center').end,
          new Cell(new Txt('').end).fillColor('#9b9b9b').rowSpan(2).fontSize(7).alignment('center').end,
          new Cell(new Txt('Largo').end).fillColor('#c8c8c8').fontSize(7).alignment('center').end,
          new Cell(new Txt('Ancho').end).fillColor('#c8c8c8').fontSize(7).alignment('center').end,
          new Cell(new Txt('Alto').end).fillColor('#c8c8c8').fontSize(7).alignment('center').end,
          new Cell(new Txt('Largo').end).fillColor('#c8c8c8').fontSize(7).alignment('center').end,
          new Cell(new Txt('Ancho').end).fillColor('#c8c8c8').fontSize(7).alignment('center').end,
          new Cell(new Txt('Alto').end).fillColor('#c8c8c8').fontSize(7).alignment('center').end,
          new Cell(new Txt('').end).fontSize(7).alignment('center').end,
        ],
        [
          new Cell(new Stack(muestras).end).colSpan(2).fontSize(7).alignment('center').end,
          new Cell(new Txt('').end).fontSize(7).alignment('center').end,
          new Cell(new Stack(muestras1).end).fontSize(7).alignment('center').end,
          new Cell(new Stack(muestras2).end).fontSize(7).alignment('center').end,
          new Cell(new Stack(muestras3).end).fontSize(7).alignment('center').end,
          new Cell(new Stack(muestras4).end).fontSize(7).alignment('center').end,
          new Cell(new Stack(muestras5).end).fontSize(7).alignment('center').end,
          new Cell(new Stack(muestras6).end).fontSize(7).alignment('center').end,
          new Cell(new Stack(muestras7).end).fontSize(7).alignment('center').end,
        ],
        [
          // new Cell(new Txt('X').bold().end).fillColor('#9b9b9b').colSpan(2).border([true,false]).fontSize(7).alignment('center').end,
          new Cell(await new Img('../../assets/promedio.gif').width(4).build()).alignment('center').fillColor('#9b9b9b').colSpan(2).border([true,false]).end,

          new Cell(new Txt('').end).fontSize(7).alignment('center').end,
          new Cell(new Txt('50,91').bold().end).fillColor('#9b9b9b').border([true,false,false,false]).fontSize(7).alignment('center').end,
          new Cell(new Txt('50,91').bold().end).fillColor('#9b9b9b').border([true,false,false,false]).fontSize(7).alignment('center').end,
          new Cell(new Txt('50,91').bold().end).fillColor('#9b9b9b').border([true,false,false,false]).fontSize(7).alignment('center').end,
          new Cell(new Txt('50,91').bold().end).fillColor('#9b9b9b').border([true,false,false,false]).fontSize(7).alignment('center').end,
          new Cell(new Txt('50,91').bold().end).fillColor('#9b9b9b').border([true,false,false,false]).fontSize(7).alignment('center').end,
          new Cell(new Txt('50,91').bold().end).fillColor('#9b9b9b').border([true,false,false,false]).fontSize(7).alignment('center').end,
          new Cell(new Txt('50,91').bold().end).fillColor('#9b9b9b').border([true,false,true,false]).fontSize(7).alignment('center').end,
        ],
        [
          new Cell(new Stack(operaciones).end).border([true,false]).colSpan(2).fontSize(7).fillColor('#9b9b9b').alignment('center').end,
          new Cell(new Txt('').end).fontSize(7).fillColor('#c8c8c8').alignment('center').end,
          new Cell(new Stack(muestras11).end).border([true,false]).fillColor('#c8c8c8').fontSize(7).alignment('center').end,
          new Cell(new Stack(muestras22).end).border([true,false]).fillColor('#c8c8c8').fontSize(7).alignment('center').end,
          new Cell(new Stack(muestras33).end).border([true,false]).fillColor('#c8c8c8').fontSize(7).alignment('center').end,
          new Cell(new Stack(muestras44).end).border([true,false]).fillColor('#c8c8c8').fontSize(7).alignment('center').end,
          new Cell(new Stack(muestras55).end).border([true,false]).fillColor('#c8c8c8').fontSize(7).alignment('center').end,
          new Cell(new Stack(muestras66).end).border([true,false]).fillColor('#c8c8c8').fontSize(7).alignment('center').end,
          new Cell(new Stack(muestras77).end).border([true,false,true,false]).fillColor('#c8c8c8').fontSize(7).alignment('center').end,
        ],
        [
          new Cell(new Txt('ESP.').end).margin([0,6]).fillColor('#9b9b9b').fontSize(7).alignment('center').end,
          new Cell(new Stack(operaciones2).end).fillColor('#9b9b9b').fontSize(7).alignment('center').end,
          new Cell(new Stack(muestras111).end).fontSize(7).alignment('center').end,
          new Cell(new Stack(muestras222).end).fontSize(7).alignment('center').end,
          new Cell(new Stack(muestras333).end).fontSize(7).alignment('center').end,
          new Cell(new Stack(muestras444).end).fontSize(7).alignment('center').end,
          new Cell(new Stack(muestras555).end).fontSize(7).alignment('center').end,
          new Cell(new Stack(muestras666).end).fontSize(7).alignment('center').end,
          new Cell(new Stack(muestras777).end).fontSize(7).alignment('center').end,
        ]

      ]).widths(['6.25%','6.25%','12.5%','12.5%','12.5%','12.5%','12.5%','12.5%','12.5%']).end
    )

    pdf.add(
      new Table([
        [
          new Cell(new Txt('').end).border([false]).fontSize(1).end
        ]
      ]).widths(['100%']).end
    )

    pdf.add(
      new Table([
        [
          new Cell(new Txt('OBSERVACIÓN').bold().end).fontSize(8).color('#ffffff').fillColor('#000000').decorationColor('#ffffff').alignment('center').end,
          new Cell(new Txt('').end).border([false]).fontSize(1).end,
          new Cell(new Txt('RESULTADO').bold().end).fontSize(8).color('#ffffff').fillColor('#000000').decorationColor('#ffffff').alignment('center').end
        ],
        [
          new Cell(new Txt('Observación ingresada por los sabis').fontSize(8).end).rowSpan(2).end,
          new Cell(new Txt('').end).border([false]).fontSize(1).end,
          new Cell(new Txt('APROBADO').fontSize(10).bold().end).border([false]).alignment('center').end
        ],
        [
          new Cell(new Txt('').fontSize(8).end).rowSpan(2).end,
          new Cell(new Txt('').end).border([false]).fontSize(1).end,
          new Cell(new Table([
            [
              new Cell(new Txt('Realizado por:').fontSize(8).alignment('center').end).colSpan(2).fillColor('#000000').color('#FFFFFF').end,
              new Cell(new Txt('Realizado por:').fontSize(8).alignment('center').end).fillColor('#000000').color('#FFFFFF').end,
              new Cell(new Txt('').fontSize(1).alignment('center').end).border([false]).fillColor('#FFFFFF').end,
              new Cell(new Txt('Validado por:').fontSize(8).alignment('center').end).colSpan(2).fillColor('#0000000').color('#FFFFFF').end,
              new Cell(new Txt('Validado por:').fontSize(8).alignment('center').end).fillColor('#000000').color('#FFFFFF').end
            ],
            [
              new Cell(new Txt('Firma:').fontSize(7).alignment('center').end).end,
              new Cell(new Txt('usuario').fontSize(7).alignment('center').end).end,
              new Cell(new Txt('').fontSize(7).alignment('center').end).border([false]).fillColor('#FFFFFF').end,
              new Cell(new Txt('Firma:').fontSize(7).alignment('center').end).end,
              new Cell(new Txt('usuario').fontSize(7).alignment('center').end).end,
            ],
            [
              new Cell(new Txt('Fecha:').fontSize(7).alignment('center').end).end,
              new Cell(new Txt('23/02/2024').fontSize(7).alignment('center').end).end,
              new Cell(new Txt('').fontSize(7).alignment('center').end).border([false]).fillColor('#FFFFFF').end,
              new Cell(new Txt('Fecha:').fontSize(7).alignment('center').end).end,
              new Cell(new Txt('23/02/2024').fontSize(7).alignment('center').end).end,
            ]
          ]).widths(['10.5%','38%','1%','10.5%','38%']).end
        ).alignment('center').border([false]).end
        ]
      ]).widths(['49.9%','0.1%','49.9%']).end
    )


    pdf.create().download(`test`)
  }
  GenerarCertificado()
  }

}