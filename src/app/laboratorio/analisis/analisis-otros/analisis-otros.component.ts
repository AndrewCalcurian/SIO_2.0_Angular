import { Component, EventEmitter, Input, Output } from '@angular/core';
import * as moment from 'moment';
import { Cell, Img, PdfMakeWrapper, Stack, Table, Txt } from 'pdfmake-wrapper';
import * as pdfFonts from "pdfmake/build/vfs_fonts";
import { AnalisisService } from 'src/app/services/analisis.service';

@Component({
  selector: 'app-analisis-otros',
  templateUrl: './analisis-otros.component.html',
  styleUrls: ['./analisis-otros.component.scss']
})
export class AnalisisOtrosComponent {

  constructor(public api:AnalisisService){}
  
 @Input() otro:any;
 @Input() Materiales:any;
 @Input() Recepcion:any;
 @Input() analisis:any;
 @Input() Index:any;
 @Output() onCloseModal = new EventEmitter();
 @Output() onCloseMensaje = new EventEmitter();


 getThirdKeyValue(): { key: string, value: any } {
  const keys = Object.keys(this.Materiales[0].material.especificacion2.especificacion);
  const thirdKey = keys[3];
  const thirdValue = this.Materiales[0].material.especificacion2.especificacion[thirdKey];
  return { key: thirdKey, value: thirdValue };
}

cerrar(){
  this.onCloseModal.emit();
}

guardar(){
  this.analisis.resultado.guardado.fecha = moment().format('DD/MM/YYYY')
    this.api.EnviarAnalisisOtros(this.analisis, this.Recepcion, this.Index);
    this.onCloseMensaje.emit();
}


AnalisisCompletado(){
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
          FORMATO DE ANÁLISIS DE INSUMOS/OTROS
          `).bold().end).alignment('center').fontSize(9).rowSpan(4).end,
          new Cell(new Txt('Código: FLC-002').end).fillColor('#dedede').fontSize(5).alignment('center').end,
        ],
        [
          new Cell(new Txt('').end).end,
          new Cell(new Txt('').end).end,
          new Cell(new Txt('N° de Revisión: 0').end).fillColor('#dedede').fontSize(5).alignment('center').end,
        ],
        [
          new Cell(new Txt('').end).end,
          new Cell(new Txt('').end).end,
          new Cell(new Txt('Fecha de Revision: 01/08/2022').end).fillColor('#dedede').fontSize(5).alignment('center').end,
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
          new Cell(new Txt('INFORMACIÓN DEL INSUMO/OTRO').bold().end).fontSize(8).color('#ffffff').fillColor('#000000').decorationColor('#ffffff').alignment('center').end
        ]
      ]).widths(['100%']).end
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
          new Cell(new Txt('PRODUCTO').end).color('#ffffff').fillColor('#3b3b3b').alignment('center').fontSize(9).end,
          new Cell(new Txt('Ricolyne567').end).alignment('center').fontSize(9).end, 
        ],
        [
          new Cell(new Txt('PROVEEDOR').end).color('#ffffff').fillColor('#3b3b3b').alignment('center').fontSize(9).end,
          new Cell(new Txt('Representaciones Chinea, C.A.').end).alignment('center').fontSize(9).end, 
        ],
        [
          new Cell(new Txt('PRESENTACIÓN').end).color('#ffffff').fillColor('#3b3b3b').alignment('center').fontSize(9).end,
          new Cell(new Txt('4 ENVASES DE 20L').end).alignment('center').fontSize(9).end, 
        ],
        [
          new Cell(new Txt('CANTIDAD (kg)').end).color('#ffffff').fillColor('#3b3b3b').alignment('center').fontSize(9).end,
          new Cell(new Txt('80L').end).alignment('center').fontSize(9).end, 
        ],
        [
          new Cell(new Txt('FECHA DE FABRICACIÓN').end).color('#ffffff').fillColor('#3b3b3b').alignment('center').fontSize(9).end,
          new Cell(new Txt('N/D').end).alignment('center').fontSize(9).end, 
        ],
        [
          new Cell(new Txt('FECHA DE VENCIMIENTO').end).color('#ffffff').fillColor('#3b3b3b').alignment('center').fontSize(9).end,
          new Cell(new Txt('N/D').end).alignment('center').fontSize(9).end, 
        ],
        [
          new Cell(new Txt('FECHA DE RECEPCIÓN').end).color('#ffffff').fillColor('#3b3b3b').alignment('center').fontSize(9).end,
          new Cell(new Txt('7/11/2022').end).alignment('center').fontSize(9).end, 
        ],
        [
          new Cell(new Txt('Nº DE LOTE').end).color('#ffffff').fillColor('#3b3b3b').alignment('center').fontSize(9).end,
          new Cell(new Txt('N/D').end).alignment('center').fontSize(9).end, 
        ],
      ]).widths(['30%','70%']).end
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
          new Cell(new Txt('PROPIEDADES Y CARACTERÍSTICAS EVALUADAS').bold().end).fontSize(8).color('#ffffff').fillColor('#000000').decorationColor('#ffffff').alignment('center').end
        ]
      ]).widths(['100%']).end
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
          new Cell(new Txt('ANÁLISIS CUALITATIVO').bold().end).border([false]).fontSize(8).color('#ffffff').fillColor('#8b8b8b').decorationColor('#ffffff').alignment('center').end
        ]
      ]).widths(['100%']).end
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
          new Cell(new Txt('APARIENCIA').end).fillColor('#c4c4c4').fontSize(8).end,
          new Cell(new Txt('líquido color Verde conintenso olor avinagrado').end).fontSize(8).end,
          new Cell(new Txt('CUMPLE').end).fontSize(8).end,
        ]
      ]).widths(['15%','70%','15%']).end
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
          new Cell(new Txt('ANÁLISIS CUANTITATIVO').bold().end).border([false]).fontSize(8).color('#ffffff').fillColor('#8b8b8b').decorationColor('#ffffff').alignment('center').end
        ]
      ]).widths(['100%']).end
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
          new Cell(new Txt('pH').end).alignment('center').margin([0,5]).fillColor('#c4c4c4').rowSpan(2).fontSize(8).end,
          new Cell(new Txt('ESPECIFICACIÓN').end).alignment('center').fillColor('#c4c4c4').fontSize(8).end,
          new Cell(new Txt('RESULTADO').end).alignment('center').fillColor('#c4c4c4').fontSize(8).end,
        ],
        [
          new Cell(new Txt('').end).alignment('center').fontSize(8).end,
          new Cell(new Txt('4,0-5,0').end).alignment('center').fontSize(8).end,
          new Cell(new Txt('4,1').end).alignment('center').fontSize(8).end,
        ],
      ]).widths(['15%','35%','50%']).end
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
          new Cell(new Txt('PRUEBAS O ENSAYOS ADICIONALES').bold().end).fontSize(8).color('#ffffff').fillColor('#000000').decorationColor('#ffffff').alignment('center').end
        ]
      ]).widths(['100%']).end
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
          new Cell(new Txt('Conductividad').end).alignment('center').margin([0,5]).fillColor('#c4c4c4').rowSpan(2).fontSize(8).end,
          new Cell(new Txt('ESPECIFICACIÓN').end).alignment('center').fillColor('#c4c4c4').fontSize(8).end,
          new Cell(new Txt('RESULTADO').end).alignment('center').fillColor('#c4c4c4').fontSize(8).end,
        ],
        [
          new Cell(new Txt('').end).alignment('center').fontSize(8).end,
          new Cell(new Txt('').end).alignment('center').fontSize(8).end,
          new Cell(new Txt('2157 (Solución al 4%)').end).alignment('center').fontSize(8).end,
        ],
      ]).widths(['15%','35%','50%']).end
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
  this.api.EnviarAnalisisOtros(this.analisis, this.Recepcion, this.Index);
    this.onCloseMensaje.emit();
  }


}