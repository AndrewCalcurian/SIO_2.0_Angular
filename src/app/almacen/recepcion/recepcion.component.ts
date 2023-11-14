import { Component } from '@angular/core';
import { Cell, Img, PdfMakeWrapper, Table, Txt } from 'pdfmake-wrapper';
import * as pdfFonts from "pdfmake/build/vfs_fonts";
import { RecepcionService } from 'src/app/services/recepcion.service';
import Swall from 'sweetalert2'
@Component({
  selector: 'app-recepcion',
  templateUrl: './recepcion.component.html',
  styleUrls: ['./recepcion.component.scss']
})
export class RecepcionComponent {
  public clicked: any;
  public detalle: boolean = false;
  public edicion: boolean = false;
  public nueva: boolean = false;
  public Material_selected!: any;
  public n_word!: any

  constructor(public api: RecepcionService) {

  }

  showInfo() {
    if (!this.clicked) {
      this.clicked = true;
    } else {
      this.clicked = false;
    }
  }

  mostrarDetalle() {
    this.detalle = true;
  }

  NuevaRecepcion() {
    this.nueva = true;
  }

  publicMaterial(x: number, y: number) {
    this.detalle = true;
    this.Material_selected = this.api.recepciones[x]
    this.n_word = y

    console.log(this.Material_selected)
  }

  EdicionDeMaterial(x: number, y: number) {
    this.edicion = true;
    this.Material_selected = this.api.recepciones[x]
    this.n_word = y

    console.log(this.Material_selected)
  }

  notificar(id: string) {
    this.api.NoticarRecepcion(id);
    setTimeout(() => {
      Swall.fire({
        text: this.api.mensaje.mensaje,
        icon: this.api.mensaje.icon,
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timerProgressBar: true,
        timer: 5000
      })
    }, 1000)
    console.log(id);
  }

  checkar(id: string) {
    console.log(id)
    this.api.checkearRecepcion(id);
  }

  DescargarFormato(informacion:any){


    let condiciones = [{
      cajas_buen_estado: true,
      cajas_limpias:true,
      calidad: true,
      envases_cerrado: false,
      identificacion: true
    },
    {
      cajas_buen_estado: true,
      cajas_limpias:true,
      calidad: true,
      envases_cerrado: false,
      identificacion: false
    }]

    let date = informacion.recepcion.split('-');
    informacion.recepcion = `${date[2]}-${date[1]}-${date[0]}`
    let conditions: string[] = informacion.condicion.map((obj:any) => {
      return Object.entries(obj)
        .filter(([propiedad, valor]) => propiedad !== '_id')
        .map(([propiedad, valor]) => {
          propiedad = propiedad.replace(/_/g, ' '); // Remove underscores from property name
          return valor ? `(x) ${propiedad}` : `( ) ${propiedad}`;
        })
        .join(' ');
    });
    // let conditions:any = [];
    // for (let i = 0; i < informacion.condicion.length; i++) {
    //   for (let n = 0; n < Object.keys(informacion.condicion[i]).length; n++) {
        
    //     let propiedad = Object.keys(informacion.condicion[i])[n];
    //     let valor = informacion.condicion[i][propiedad];

    //     if(propiedad != '_id'){
    //       if(valor === false){
    //         if(conditions[i]){
    //           conditions[i] = `( ) ${propiedad} `;
    //         }else{
    //           conditions[i] = conditions[i] + `( ) ${propiedad} `;
    //         }
    //       }else{
    //         if(conditions[i]){
    //           conditions[i] = `(x) ${propiedad} `;
    //         }else{
    //           conditions[i] = conditions[i] + `(x) ${propiedad} `;
    //         }
    //       }
    //     }
    //   }
    // }
    const pdf = new PdfMakeWrapper();
    PdfMakeWrapper.setFonts(pdfFonts);
    pdf.pageOrientation('landscape');
    pdf.pageSize('A4');

    async function generarPDF(){
      pdf.add(
        new Table([
          [
            new Cell(await new Img('../../assets/poli_cintillo.png').width(60).margin([0, 5,0,0]).build()).alignment('center').rowSpan(4).end,
            new Cell(new Txt(`
            VERIFICACIÓN DE LAS CONDICIONES \n DEL MATERIAL RECIBIDO
            `).bold().end).alignment('center').fontSize(9).rowSpan(4).end,
            new Cell(new Txt('Código: FAL-002').end).fillColor('#dedede').fontSize(5).alignment('center').end,
          ],
          [
            new Cell(new Txt('').end).end,
            new Cell(new Txt('').end).end,
            new Cell(new Txt('N° de Revisión: 1').end).fillColor('#dedede').fontSize(5).alignment('center').end,
          ],
          [
            new Cell(new Txt('').end).end,
            new Cell(new Txt('').end).end,
            new Cell(new Txt('Fecha de Revisión: 03/08/2023').end).fillColor('#dedede').fontSize(5).alignment('center').end,
          ],
          [
            new Cell(new Txt('').end).end,
            new Cell(new Txt('').end).end,
            new Cell(new Txt('Página: 1 de 1').end).fillColor('#dedede').fontSize(5).alignment('center').end,
          ],
        ]).widths(['25%','50%','25%']).end
      )


      pdf.add(
        pdf.ln(1)
      )
      pdf.add(
        new Table([
          [
            new Cell(new Txt('DATOS DE RECEPCIÓN DE MATERIAL').end).alignment('center').color('#FFFFFF').fillColor('#000000').fontSize(8).end,
            new Cell(new Txt('').end).alignment('center').border([false]).color('#FFFFFF').fontSize(8).end,
            new Cell(new Txt('N° DE VERIFICACIÓN').end).alignment('center').color('#FFFFFF').fillColor('#000000').fontSize(8).end
          ]
        ]).widths(['80%','0.2%','19.8%']).end
      )

      pdf.add(
        new Table([
          [
            new Cell(new Txt('').end).end
          ]
        ]).layout('noBorders').widths(['100%']).end
      )

      pdf.add(
        new Table([
          [
            new Cell(new Txt('Nombre del proveedor').end).alignment('center').fillColor('#dddddd').fontSize(8).end,
            new Cell(new Txt('Nombre del transportista').end).alignment('center').fillColor('#dddddd').fontSize(8).end,
            new Cell(new Txt('Fecha de recepción').end).fontSize(8).alignment('center').fillColor('#dddddd').end,
            new Cell(new Txt('N° Factura/ Nota de entrega').end).alignment('center').fillColor('#dddddd').fontSize(8).end,
            new Cell(new Txt('N° Orden de compra').end).alignment('center').fillColor('#dddddd').fontSize(8).end,
            new Cell(new Txt('').end).border([false]).fontSize(8).end,
            new Cell(new Txt(`AL-MR-001`).bold().end).margin([0,5,0,0]).alignment('center').rowSpan(2).end,
          ],
          [
            new Cell(new Txt(informacion.proveedor.nombre).end).alignment('center').fontSize(8).end,
            new Cell(new Txt(informacion.transportista).end).alignment('center').fontSize(8).end,
            new Cell(new Txt(informacion.recepcion).end).alignment('center').fontSize(8).end,
            new Cell(new Txt(informacion.documento).end).alignment('center').fontSize(8).end,
            new Cell(new Txt(informacion.OC).end).alignment('center').fontSize(8).end,
            new Cell(new Txt('').end).border([false]).fontSize(8).end,
            new Cell(new Txt('').end).border([false]).fontSize(8).end,
          ]
        ]).widths(['15%','20%','15%','15%','14%','0.2%','21%']).end
      )

      pdf.add(
        pdf.ln(1)
      )

      pdf.add(
        new Table([
          [
            new Cell(new Txt('DATOS DEL MATERIAL').end).alignment('center').color('#FFFFFF').fillColor('#9c9c9c').fontSize(8).end
          ]
        ]).widths(['100%']).layout('noBorders').end
      )

      pdf.add(
        new Table([
          [
            new Cell(new Txt('').end).end
          ]
        ]).layout('noBorders').widths(['100%']).end
      )

      pdf.add(
        new Table([
          [
            new Cell(new Txt('Descripción').end).alignment('center').fillColor('#dddddd').fontSize(8).end,
            new Cell(new Txt('Grupo').end).alignment('center').fillColor('#dddddd').fontSize(8).end,
            new Cell(new Txt('N° de lote').end).alignment('center').fillColor('#dddddd').fontSize(8).end,
            new Cell(new Txt('Fecha de fabricación').end).alignment('center').fillColor('#dddddd').fontSize(8).end,
            new Cell(new Txt('Código').end).alignment('center').fillColor('#dddddd').fontSize(8).end,
            new Cell(new Txt('Presentación').end).alignment('center').fillColor('#dddddd').fontSize(8).end,
            new Cell(new Txt('Capacidad').end).alignment('center').fillColor('#dddddd').fontSize(8).end,
            new Cell(new Txt('Total de unidades').end).alignment('center').fillColor('#dddddd').fontSize(8).end,
            new Cell(new Txt('Total').end).alignment('center').fillColor('#dddddd').fontSize(8).end
          ]
        ]).widths(['17.5%','8%','10%','12.5%','10%','12.5%','10%','12.5%','7%']).end
      )

      for(let i=0;i<informacion.materiales.length;i++){
        pdf.add(
          new Table([
            [
              new Cell(new Txt(`${informacion.materiales[i][0].material.nombre} (${informacion.materiales[i][0].material.fabricante.alias})`).end).alignment('center').fontSize(8).border([true,false,true,true]).end,
              new Cell(new Txt(`${informacion.materiales[i][0].material.grupo.nombre}`).end).alignment('center').fontSize(8).border([true,false,true,true]).end,
              new Cell(new Txt(`${informacion.materiales[i][0].lote}`).end).alignment('center').fontSize(8).border([true,false,true,true]).end,
              new Cell(new Txt(`${informacion.materiales[i][0].material.fabricante.nombre}`).end).alignment('center').fontSize(8).border([true,false,true,true]).end,
              new Cell(new Txt('N/A').end).alignment('center').fontSize(8).border([true,false,true,true]).end,
              new Cell(new Txt(`${informacion.materiales[i][0].presentacion}`).end).alignment('center').fontSize(8).border([true,false,true,true]).end,
              new Cell(new Txt(`${informacion.materiales[i][1].neto} ${informacion.materiales[i][0].unidad}`).end).alignment('center').fontSize(8).border([true,false,true,true]).end,
              new Cell(new Txt(`${informacion.materiales.length}`).end).alignment('center').fontSize(8).border([true,false,true,true]).end,
              new Cell(new Txt(`${informacion.cantidad[i]} ${informacion.materiales[i][0].unidad}`).end).alignment('center').fontSize(8).border([true,false,true,true]).end,
            ],
            [
              new Cell(new Txt(`${conditions[i]}`).end).fillColor('#eeeeee').colSpan(9).fontSize(7).end,
              new Cell(new Txt('').end).fontSize(8).end,
              new Cell(new Txt('').end).fontSize(8).end,
              new Cell(new Txt('').end).fontSize(8).end,
              new Cell(new Txt('').end).fontSize(8).end,
              new Cell(new Txt('').end).fontSize(8).end,
              new Cell(new Txt('').end).fontSize(8).end,
              new Cell(new Txt('').end).fontSize(8).end,
              new Cell(new Txt('').end).fontSize(8).end
            ]
          ]).widths(['17.5%','8%','10%','12.5%','10%','12.5%','10%','12.5%','7%']).end
        )
      }
      pdf.add(
        new Table([
          [
            new Cell(new Txt('').end).end
          ]
        ]).layout('noBorders').widths(['100%']).end
      )

      pdf.add(
        new Table([
          [
            new Cell(
              new Table([
                [
                  new Cell(new Txt('Observación').end).alignment('center').color('#FFFFFF').fillColor('#000000').fontSize(9).end,
                ],
                [
                  new Cell(new Txt(`\n\n\n`).end).fontSize(8).end,

                ]
              ]).widths(['100%']).end
            ).fontSize(8).end,
            new Cell(
              new Table([
                [
                  new Cell(new Txt('Realizado por:').end).alignment('center').color('#FFFFFF').fillColor('#000000').fontSize(9).end,
                ],
                [
                  new Cell(new Txt(`Firma: Usuario\n\nFecha: 01-01-2020`).end).fontSize(8).end,

                ]
              ]).widths(['100%']).end
            ).fontSize(8).end,
            new Cell(new Table([
              [
                new Cell(new Txt('Validado por:').end).alignment('center').color('#FFFFFF').fillColor('#000000').fontSize(9).end,
              ],
              [
                new Cell(new Txt(`Firma: Usuario\n\nFecha:01-10-2020`).end).fontSize(8).end,

              ]
            ]).widths(['100%']).end).fontSize(8).end
          ]
        ]).widths(['50%','25%','25%']).layout('noBorders').end
      )
      pdf.create().download(`test`)
    }

    generarPDF()
  }

}
