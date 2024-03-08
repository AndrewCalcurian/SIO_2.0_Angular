import { Component, EventEmitter, Input, Output } from '@angular/core';
import * as moment from 'moment';
import { Cell, Img, PdfMakeWrapper, Stack, Table, Txt } from 'pdfmake-wrapper';
import * as pdfFonts from "pdfmake/build/vfs_fonts";
import { AnalisisService } from 'src/app/services/analisis.service';

@Component({
  selector: 'app-analisis-pads',
  templateUrl: './analisis-pads.component.html',
  styleUrls: ['./analisis-pads.component.scss']
})
export class AnalisisPadsComponent {

  constructor(public api:AnalisisService){}

  @Input() pads:any;
  @Input() Materiales:any;
  @Input() Recepcion:any;
  @Input() analisis:any;
  @Input() Index:any;
  @Output() onCloseModal = new EventEmitter();
  @Output() onCloseMensaje = new EventEmitter();

  public muestras = 10;

  desviacionEstandar(array, promedio) {
    let suma = 0;
    for (let i = 0; i < array.length; i++) {
      suma += Math.pow(array[i] - promedio, 2);
    }
    return Math.sqrt(suma / (array.length - 1));
  }


  largo(){
    console.log(this.analisis)
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

  guardar(){
    this.analisis.resultado.guardado.fecha = moment().format('DD/MM/YYYY')
      this.api.EnviarAnalisisPads(this.analisis, this.Recepcion, this.Index);
      this.onCloseMensaje.emit();
  }

  AnalisisCompletado(){

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
          FORMATO DE ANÁLISIS DE PADS DE CARTÓN CORRUGADAS
          `).bold().end).alignment('center').fontSize(9).rowSpan(4).end,
          new Cell(new Txt('Código: FLC-014').end).fillColor('#dedede').fontSize(5).alignment('center').end,
        ],
        [
          new Cell(new Txt('').end).end,
          new Cell(new Txt('').end).end,
          new Cell(new Txt('N° de Revisión: 0').end).fillColor('#dedede').fontSize(5).alignment('center').end,
        ],
        [
          new Cell(new Txt('').end).end,
          new Cell(new Txt('').end).end,
          new Cell(new Txt('Fecha de Revision: 09/06/2023').end).fillColor('#dedede').fontSize(5).alignment('center').end,
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
          new Cell(new Txt('Pads Nro 11').end).colSpan(3).fontSize(7).end,
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
          new Cell(new Txt('Muestra (cm)').end).fillColor('#9b9b9b').colSpan(2).fontSize(7).alignment('center').end,
          new Cell(new Txt('').end).fillColor('#9b9b9b').fontSize(7).alignment('center').end,
          new Cell(new Txt('Largo (cm)').end).fillColor('#9b9b9b').fontSize(7).alignment('center').end,
          new Cell(new Txt('Ancho (cm)').end).fillColor('#9b9b9b').fontSize(7).alignment('center').end,
          new Cell(new Txt('Distancia Signado (cm)').end).fillColor('#9b9b9b').fontSize(7).alignment('center').end,
          new Cell(new Txt('Espesor (mm)').end).fillColor('#9b9b9b').fontSize(7).alignment('center').end,
        ],
        [
          new Cell(new Stack(muestras).end).colSpan(2).fontSize(7).alignment('center').end,
          new Cell(new Txt('').end).fillColor('#9b9b9b').fontSize(7).alignment('center').end,
          new Cell(new Stack(muestras1).end).fontSize(7).alignment('center').end,
          new Cell(new Stack(muestras2).end).fontSize(7).alignment('center').end,
          new Cell(new Stack(muestras3).end).fontSize(7).alignment('center').end,
          new Cell(new Stack(muestras4).end).fontSize(7).alignment('center').end,
        ],
        [
          // new Cell(new Txt('X').bold().end).fillColor('#9b9b9b').colSpan(2).border([true,false]).fontSize(7).alignment('center').end,
          new Cell(await new Img('../../assets/promedio.gif').width(4).build()).alignment('center').fillColor('#9b9b9b').colSpan(2).border([true,false]).end,
          new Cell(new Txt('').end).fontSize(7).alignment('center').end,
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
          new Cell(new Stack(muestras44).end).border([true,false,true,false]).fillColor('#c8c8c8').fontSize(7).alignment('center').end,
        ],
        [
          new Cell(new Txt('ESP.').end).margin([0,6]).fillColor('#9b9b9b').fontSize(7).alignment('center').end,
          new Cell(new Stack(operaciones2).end).fillColor('#9b9b9b').fontSize(7).alignment('center').end,
          new Cell(new Stack(muestras111).end).fontSize(7).alignment('center').end,
          new Cell(new Stack(muestras222).end).fontSize(7).alignment('center').end,
          new Cell(new Stack(muestras333).end).fontSize(7).alignment('center').end,
          new Cell(new Stack(muestras444).end).fontSize(7).alignment('center').end,
        ]
      ]).widths(['10%','10%','20%','20%','20%','20%']).end
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
  this.api.EnviarAnalisisPads(this.analisis, this.Recepcion, this.Index);
      this.onCloseMensaje.emit();
  }

}
