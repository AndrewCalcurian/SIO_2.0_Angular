import { Component } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import { Cell, Columns, Img, Ol, PdfMakeWrapper, Stack, Table, Txt, Ul } from 'pdfmake-wrapper';
import { Producto, Producto_ } from 'src/app/compras/models/modelos-compra';
import { ClientesService } from 'src/app/services/clientes.service';
import { ProductosService } from 'src/app/services/productos.service';
import * as pdfFonts from "pdfmake/build/vfs_fonts";

// import { SwPush } from '@angular/service-worker';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent {

  readonly VAPID_PUBLIC_KEY = "YOUR_SERVER_PUBLIC_KEY";

  constructor(public clientes:ClientesService,
              public productos_:ProductosService
  ) {
  }

  public nuevo;
  public cliente;
  public editar = false;
  public productos:any = []
  public id_selected = ''

  public data = {
    nombre:'',
    rif:'',
    codigo:'',
    direccion:'',
    contactos:[
    ],
    almacenes:[
    ]
  }

  public producto:Producto = {
    cliente:'',
    producto:'',
    codigo:'',
    tamano_desplegado:[],
    tamano_cerrado:[],
    diseno:'',
    sustrato:[],
    tintas:[],
    barnices:[],
    archivo_diseno:'',
    archivo_montaje:[],
    tipo_plancha:'',
    tiempo_exposicion:'',
    maquinas:[],
    tamano_sustrato_imprimir:[],
    area_efectiva:[],
    fuente:[],
    troqueladora:[],
    guillotina:[],
    pegadora:[],
    pegamento:[],
    embalaje:'',
    caja:[],
    unidades_por_caja:0,
    cantidad_por_paquetes:0,
    vista_aerea:'',
    vista_3d:'',
    tipo_paleta:'',
    tamano_paleta:'',
    cantidad_estibas:0,
    peso_cajas:'',
    paletizado:''
    
  }


  Producto:Producto_ = {
    identificacion:{
      cliente  :'',
      categoria:'',
      producto :'',
      codigo   :'',
      version  :'',
    },
    dimensiones:{
      desplegado:{
        ancho     :'',
        largo     :'',
        tolerancia: '',
      },
      cerrado:{
        ancho     :'',
        largo     :'',
        alto      :'',
        tolerancia:''
      },
      diseno:''
    },
    materia_prima:{
      sustrato:[],
      tintas:[],
      barnices:[],
    },
    pre_impresion:{
      diseno:'',
      montajes:'',
      nombre_montajes:[],
      tamano_sustrato:{
        montajes:[{ancho:'', largo:'', ejemplares:''},{ancho:'', largo:'', ejemplares:''}],
        margenes:[{inferior:'0', superior:'0',izquierdo:'0',derecho:'0'},{inferior:'0', superior:'0',izquierdo:'0',derecho:'0'}]
      },
      plancha:{
        tipo:'',
        marca:'',
        tiempo_exposicion:''
      }
    },
    impresion:{
      impresoras:[],
      secuencia:[[]],
      pinzas:[[]],
      fuentes:[]
    },
    post_impresion:{
      troqueladora:[],
      henidura:{alto:'', ancho:''},
      guillotina:[],
      pegadora:[],
      pegamento:[],
      caja:{
        nombre:'',
        cabida:[]
      }
    }
  }


  BuscarProductos(clienteID){
    this.productos = this.productos_.buscarPorClientes(clienteID);
    this.id_selected = clienteID
  }
  

  nuevoProducto(){
    this.nuevo = true;
  }

  nuevoCliente(){
    this.cliente = true;
  }

  cerrar(){
    this.nuevo = false;
    this.cliente = false;
    this.editar = false;
    this.Producto = {
      identificacion:{
        cliente  :'',
        categoria:'',
        producto :'',
        codigo   :'',
        version  :'',
      },
      dimensiones:{
        desplegado:{
          ancho     :'',
          largo     :'',
          tolerancia: '',
        },
        cerrado:{
          ancho     :'',
          largo     :'',
          alto      :'',
          tolerancia:''
        },
        diseno:''
      },
      materia_prima:{
        sustrato:[],
        tintas:[],
        barnices:[],
      },
      pre_impresion:{
        diseno:'',
        montajes:'',
        nombre_montajes:[],
        tamano_sustrato:{
          montajes:[{ancho:'', largo:'', ejemplares:''}],
          margenes:[{inferior:'', superior:'',izquierdo:'',derecho:''}]
        },
        plancha:{
          tipo:'',
          marca:'',
          tiempo_exposicion:''
        }
      },
      impresion:{
        impresoras:[],
        secuencia:[[]],
        pinzas:[[]],
        fuentes:[]
      },
      post_impresion:{
        troqueladora:[],
        henidura:{alto:'', ancho:''},
        guillotina:[],
        pegadora:[],
        pegamento:[],
        caja:{
          nombre:'',
          cabida:[]
        }
      }
    }
    this.BuscarProductos(this.id_selected)
  }

  GuardarCiente(){
    this.data = {
      nombre:'',
      rif:'',
      codigo:'',
      direccion:'',
      contactos:[
      ],
      almacenes:[
      ]
    }
    this.nuevo = false;
    this.cliente = false;
    this.editar = false;

  }

  filas(){
    return Math.ceil(this.clientes.clientes.length / 5);
  }

  EditarCliente(cliente){
    this.data = cliente
    this.editar = true;
  }


  DescargarPDF(producto:any){
    async function generarEspecificacion(){
      const pdf = new PdfMakeWrapper();
      PdfMakeWrapper.setFonts(pdfFonts);
      pdf.pageOrientation('portrait');
      pdf.pageSize('A4');

      let Sustratos:any = [];
      let barnices:any = []
      let colores:any = []
      for(let i=0;i<1;i++){
        Sustratos.push(`${producto.materia_prima.sustrato[i].nombre} ${producto.materia_prima.sustrato[i].gramaje}g ${producto.materia_prima.sustrato[i].calibre}pt`)
      }
      for(let i=0;i<producto.materia_prima.barnices.length;i++){
        barnices.push(`${producto.materia_prima.barnices[i].barniz.nombre} - ${producto.materia_prima.barnices[i].cantidad}kg.`)
      }

      let peliculas:any = []
      let peliculasB:any = []

for (let i = 0; i < producto.materia_prima.tintas.length; i++) {
    let color = producto.materia_prima.tintas[i].tinta.color;
    
    switch (color) {
        case 'A':
            color = 'Amarillo';
            break;
        case 'C':
            color = 'Cyan';
            break;
        case 'M':
            color = 'Magenta';
            break;
        case 'K':
            color = 'Negro';
            break;
        default:
            color = producto.materia_prima.tintas[i].tinta.codigo;
    }

    let existe = colores.findIndex(x => x.color === color);
    
    if (existe === -1) {
        colores.push({ color, tintas: [{tinta:producto.materia_prima.tintas[i].tinta, cantidad:producto.materia_prima.tintas[i].cantidad}] });
    } else {
        colores[existe].tintas.push({tinta:producto.materia_prima.tintas[i].tinta, cantidad:producto.materia_prima.tintas[i].cantidad});
    }
    
    console.log(colores);
}

const colorNumero = {
  'Negro': 1,
  'Cyan': 2,
  'Magenta': 3,
  'Amarillo': 4
};

let numero = 5; // Número inicial para colores no especificados

colores.forEach((color, index) => {
  if (colorNumero[color.color]) {
      peliculas.push(`Pelicula Nº${index+1}: ${color.color}:${producto.identificacion.cliente.codigo}-${producto.identificacion.codigo}-${producto.identificacion.version}-A-${colorNumero[color.color]}`)
      if(producto.pre_impresion.montajes > 1){
      peliculasB.push(`Pelicula Nº${index+1}: ${color.color}:${producto.identificacion.cliente.codigo}-${producto.identificacion.codigo}-${producto.identificacion.version}-B-${colorNumero[color.color]}`)

      }
    } else {
    peliculas.push(`Pelicula Nº${index+1}: ${color.color}:${producto.identificacion.cliente.codigo}-${producto.identificacion.codigo}-${producto.identificacion.version}-A-${numero}`)
    if(producto.pre_impresion.montajes > 1){
    peliculasB.push(`Pelicula Nº${index+1}: ${color.color}:${producto.identificacion.cliente.codigo}-${producto.identificacion.codigo}-${producto.identificacion.version}-B-${numero}`)
      }
      numero++;
  }
});


let area_efectiva:any
let area_efectivaB:any

let areaTotal = Number(producto.pre_impresion.tamano_sustrato.montajes[0].ancho) * Number(producto.pre_impresion.tamano_sustrato.montajes[0].largo)
let AnchoEfectivo = Number(producto.pre_impresion.tamano_sustrato.montajes[0].ancho) - (Number(producto.pre_impresion.tamano_sustrato.margenes[0].superior) + Number(producto.pre_impresion.tamano_sustrato.margenes[0].inferior))
let AltoEfectivo = Number(producto.pre_impresion.tamano_sustrato.montajes[0].largo) - (Number(producto.pre_impresion.tamano_sustrato.margenes[0].izquierdo) + Number(producto.pre_impresion.tamano_sustrato.margenes[0].derecho))
area_efectiva = AnchoEfectivo * AltoEfectivo;
let area_Desperdicio = areaTotal - area_efectiva
const porcentajePerdida = (area_Desperdicio / areaTotal) * 100;

let areaTotalB = Number(producto.pre_impresion.tamano_sustrato.montajes[1].ancho) * Number(producto.pre_impresion.tamano_sustrato.montajes[1].largo)
let AnchoEfectivoB = Number(producto.pre_impresion.tamano_sustrato.montajes[1].ancho) - (Number(producto.pre_impresion.tamano_sustrato.margenes[1].superior) + Number(producto.pre_impresion.tamano_sustrato.margenes[1].inferior))
let AltoEfectivoB = Number(producto.pre_impresion.tamano_sustrato.montajes[1].largo) - (Number(producto.pre_impresion.tamano_sustrato.margenes[1].izquierdo) + Number(producto.pre_impresion.tamano_sustrato.margenes[1].derecho))
area_efectivaB = AnchoEfectivoB * AltoEfectivoB;
let area_DesperdicioB = areaTotalB - area_efectivaB;
const porcentajePerdidaB = (area_DesperdicioB / areaTotalB) * 100;


let impresoras:any = []
let troqueladoras:any = []
let guillotinas:any = []
let pegadoras:any = []

for(let i=0; i<producto.impresion.impresoras.length;i++){
  impresoras.push(producto.impresion.impresoras[i].nombre)
  console.log(producto.impresion.impresoras[i].nombre)
}
for(let i=0; i<producto.post_impresion.troqueladora.length;i++){
  troqueladoras.push(producto.post_impresion.troqueladora[i].nombre)
}
for(let i=0; i<producto.post_impresion.guillotina.length;i++){
  guillotinas.push(producto.post_impresion.guillotina[i].nombre)
}
for(let i=0; i<producto.post_impresion.pegadora.length;i++){
  pegadoras.push(producto.post_impresion.pegadora[i].nombre)
}

      pdf.add(
        new Table([
          [
            new Cell(await new Img('../../assets/poli_cintillo.png').width(85).margin([0, 10,0,0]).build()).alignment('center').rowSpan(4).end,
            new Cell(new Txt(`FORMATO 
            ESPECIFICACIÓN DE 
            PRODUCTO`).bold().end).alignment('center').margin([0, 10,0,0]).fontSize(13).rowSpan(4).end,
            new Cell(new Txt('Código: FRP-007').end).fillColor('#dedede').fontSize(9).alignment('center').end,
          ],
          [
            new Cell(new Txt('').end).end,
            new Cell(new Txt('').end).end,
            new Cell(new Txt('N° de Revisión: 1').end).fillColor('#dedede').fontSize(9).alignment('center').end,
          ],
          [
            new Cell(new Txt('').end).end,
            new Cell(new Txt('').end).end,
            new Cell(new Txt('Fecha: 20/06/2023').end).fillColor('#dedede').fontSize(9).alignment('center').end,
          ],
          [
            new Cell(new Txt('').end).end,
            new Cell(new Txt('').end).end,
            new Cell(new Txt('Página: 2 de 2').end).fillColor('#dedede').fontSize(9).alignment('center').end,
          ],
        ]).widths(['25%','50%','25%']).end
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
            new Cell(new Txt('').end).border([false]).end,
            new Cell(new Txt('Código de especificación').bold().end).fillColor('#000000').color('#FFFFFF').alignment('center').end,
          ],
          [
            new Cell(new Txt('').end).border([false]).end,
            new Cell(new Txt(`E-${producto.identificacion.cliente.codigo}-${producto.identificacion.codigo}-${producto.identificacion.version}`).bold().end).fontSize(15).alignment('center').end,
          ],
        ]).widths(['70%','30%']).end
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
            new Cell(new Txt('1. Identificación del producto').bold().end).bold().color('#FFFFFF').fillColor('#000000').colSpan(2).end,
            new Cell(new Txt('').end).end,
          ],
          [
            new Cell(new Txt(' ').end).border([false]).fontSize(1).end,
            new Cell(new Txt(' ').end).border([false]).fontSize(1).end
          ],
          [
            new Cell(new Txt('1.1 Cliente').end).fillColor('#dedede').bold().border([false]).end,
            new Cell(new Txt(`${producto.identificacion.cliente.nombre}`).end).border([false]).end,
          ],
          [
            new Cell(new Txt('1.2 Producto').end).fillColor('#dedede').bold().border([false]).end,
            new Cell(new Txt(`${producto.identificacion.producto}`).end).border([false]).end,
          ],
          [
            new Cell(new Txt('1.3 Código del producto').end).fillColor('#dedede').bold().border([false]).end,
            new Cell(new Txt(`${producto.identificacion.cliente.codigo}-${producto.identificacion.codigo}-${producto.identificacion.version}`).end).border([false]).end,
          ]
        ]).widths(['30%','70%']).end
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
            new Cell(new Txt('2. Dimensiones del producto').bold().end).bold().color('#FFFFFF').fillColor('#000000').colSpan(2).end,
            new Cell(new Txt('').end).end,
          ],
          [
            new Cell(new Txt(' ').end).border([false]).fontSize(1).end,
            new Cell(new Txt(' ').end).border([false]).fontSize(1).end
          ],
          [
            new Cell(new Txt('2.1 Tamaño del producto desplegado (mm)').end).fillColor('#dedede').bold().border([false]).end,
            new Cell(new Txt(`${producto.dimensiones.desplegado.ancho} x ${producto.dimensiones.desplegado.largo} ± ${producto.dimensiones.desplegado.tolerancia}`).end).border([false]).end,
          ],
          [
            new Cell(new Txt('2.1 Tamaño del producto cerrado (mm)').end).fillColor('#dedede').bold().border([false]).end,
            new Cell(new Txt(`${producto.dimensiones.cerrado.ancho} x ${producto.dimensiones.cerrado.largo} x ${producto.dimensiones.cerrado.alto} ± ${producto.dimensiones.cerrado.tolerancia}`).end).border([false]).end,
          ]
        ]).widths(['55%','45%']).end
      )

      pdf.add(
        new Table([
          [
            new Cell(new Txt('2.3 Diseño del producto').end).fillColor('#dedede').bold().border([false]).end,
  
          ],
          [
            new Cell(await new Img('http://192.168.0.22/api/imagen/producto/PRODUCTO_2_4_2024_15_42_39_494.png').width(450).margin([0, 15]).build()).alignment('center').border([false]).pageBreak('after').end,
          ]
        ]).widths(['100%']).end
      )

      pdf.add(
        new Table([
          [
            new Cell(await new Img('../../assets/poli_cintillo.png').width(85).margin([0, 10,0,0]).build()).alignment('center').rowSpan(4).end,
            new Cell(new Txt(`FORMATO 
            ESPECIFICACIÓN DE 
            PRODUCTO`).bold().end).alignment('center').margin([0, 10,0,0]).fontSize(13).rowSpan(4).end,
            new Cell(new Txt('Código: FRP-007').end).fillColor('#dedede').fontSize(9).alignment('center').end,
          ],
          [
            new Cell(new Txt('').end).end,
            new Cell(new Txt('').end).end,
            new Cell(new Txt('N° de Revisión: 1').end).fillColor('#dedede').fontSize(9).alignment('center').end,
          ],
          [
            new Cell(new Txt('').end).end,
            new Cell(new Txt('').end).end,
            new Cell(new Txt('Fecha: 20/06/2023').end).fillColor('#dedede').fontSize(9).alignment('center').end,
          ],
          [
            new Cell(new Txt('').end).end,
            new Cell(new Txt('').end).end,
            new Cell(new Txt('Página: 2 de 2').end).fillColor('#dedede').fontSize(9).alignment('center').end,
          ],
        ]).widths(['25%','50%','25%']).end
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
            new Cell(new Txt('3. Materia prima').bold().end).bold().color('#FFFFFF').fillColor('#000000').end,
          ],
          [
            new Cell(new Txt(' ').end).border([false]).fontSize(1).end,
          ],
          [
            new Cell(new Txt('3.1 Tipo de sustrato a utilizar').end).fillColor('#dedede').bold().border([false]).end,
          ],
          [
            new Cell(new Stack(Sustratos).end).border([false]).end,
          ],
          [
            new Cell(new Txt('3.2 Propiedades').end).fillColor('#dedede').bold().border([false]).end,
          ],
          [
            new Cell(
              new Table([
                [
                  new Cell(new Txt('Marca').end).alignment('center').fillColor('#f1f1f1').rowSpan(2).margin([0,10,0,0]).bold().border([false]).end,
                  new Cell(new Txt('Ubicación').end).alignment('center').fillColor('#f1f1f1').rowSpan(2).margin([0,10,0,0]).bold().border([false]).end,
                  new Cell(new Txt('Calibre (pt)').end).alignment('center').fillColor('#f1f1f1').bold().border([false]).end,
                  new Cell(new Txt('Gramaje (g/m²)').end).alignment('center').fillColor('#f1f1f1').bold().border([false]).end,
                ],
                [
                  new Cell(new Txt('').end).fillColor('#f1f1f1').bold().border([false]).end,
                  new Cell(new Txt('').end).fillColor('#f1f1f1').bold().border([false]).end,
                  new Cell(new Table([
                    [
                      new Cell(new Txt('Mín.').end).alignment('center').border([false]).end,
                      new Cell(new Txt('Nóm.').end).alignment('center').border([false]).end,
                      new Cell(new Txt('Máx.').end).alignment('center').border([false]).end
                    ]
                  ]).widths(['33.3%','33.3%','33.3%']).end).fillColor('#c9c9c9').bold().border([false]).end,
                  new Cell(new Table([
                    [
                      new Cell(new Txt('Mín.').end).alignment('center').border([false]).end,
                      new Cell(new Txt('Nóm.').end).alignment('center').border([false]).end,
                      new Cell(new Txt('Máx.').end).alignment('center').border([false]).end
                    ]
                  ]).widths(['33.3%','33.3%','33.3%']).end).fillColor('#c9c9c9').bold().border([false]).end,
                ]
              ]).widths(['20%','20%','30%','30%']).end
            ).border([false]).end
          ],
        ]).widths(['100%']).end
      )

      for(let i=0;i<producto.materia_prima.sustrato.length;i++){

        pdf.add(
          new Table([
            [
              new Cell(new Txt(producto.materia_prima.sustrato[i].fabricante.alias).end).bold().border([false]).alignment('center').end,
              new Cell(new Txt(producto.materia_prima.sustrato[i].origen).end).fontSize(8).bold().border([false]).alignment('center').end,
              new Cell(
                new Table([
                  [
                    new Cell(new Txt(producto.materia_prima.sustrato[i].especificacion.calibre.pt.min).end).border([false]).alignment('center').end,
                    new Cell(new Txt(producto.materia_prima.sustrato[i].especificacion.calibre.pt.nom).end).border([false]).alignment('center').end,
                    new Cell(new Txt(producto.materia_prima.sustrato[i].especificacion.calibre.pt.max).end).border([false]).alignment('center').end
                  ]
                ]).widths(['33.3%','33.3%','33.3%']).end
                ).bold().border([false]).end,
              new Cell(
                new Table([
                  [
                    new Cell(new Txt(producto.materia_prima.sustrato[i].especificacion.gramaje.min).end).border([false]).alignment('center').end,
                    new Cell(new Txt(producto.materia_prima.sustrato[i].especificacion.gramaje.nom).end).border([false]).alignment('center').end,
                    new Cell(new Txt(producto.materia_prima.sustrato[i].especificacion.gramaje.max).end).border([false]).alignment('center').end
                  ]
                ]).widths(['33.3%','33.3%','33.3%']).end
              ).bold().border([false]).end,
            ]
          ]).widths(['20%','19%','30%','30%']).margin([5,0,0,0]).end
        )

      }

      // PAGINA 3 ***************************************
      pdf.add(
        new Table([
          [
            new Cell(await new Img('../../assets/poli_cintillo.png').width(85).margin([0, 10,0,0]).build()).alignment('center').rowSpan(4).end,
            new Cell(new Txt(`FORMATO 
            ESPECIFICACIÓN DE 
            PRODUCTO`).bold().end).alignment('center').margin([0, 10,0,0]).fontSize(13).rowSpan(4).end,
            new Cell(new Txt('Código: FRP-007').end).fillColor('#dedede').fontSize(9).alignment('center').end,
          ],
          [
            new Cell(new Txt('').end).end,
            new Cell(new Txt('').end).end,
            new Cell(new Txt('N° de Revisión: 1').end).fillColor('#dedede').fontSize(9).alignment('center').end,
          ],
          [
            new Cell(new Txt('').end).end,
            new Cell(new Txt('').end).end,
            new Cell(new Txt('Fecha: 20/06/2023').end).fillColor('#dedede').fontSize(9).alignment('center').end,
          ],
          [
            new Cell(new Txt('').end).end,
            new Cell(new Txt('').end).end,
            new Cell(new Txt('Página: 2 de 2').end).fillColor('#dedede').fontSize(9).alignment('center').end,
          ],
        ]).widths(['25%','50%','25%']).pageBreak('before').end
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
            new Cell(new Txt('3.4 Tintas aprobadas').end).colSpan(5).fillColor('#dedede').bold().border([false,false,false,false]).end,
            new Cell(new Txt('Color').end).fillColor('#c9c9c9').border([false]).end,
            new Cell(new Txt('Color').end).fillColor('#c9c9c9').border([false]).end,
            new Cell(new Txt('Color').end).fillColor('#c9c9c9').border([false]).end,
            new Cell(new Txt('Color').end).fillColor('#c9c9c9').border([false]).end,
          ],
        ]).widths(['20%','20%','20%','20%','20%']).end
      )

      pdf.add('\n')


      for(let i=0;i<colores.length;i++){
        if(colores[i].color != 'Amarillo' && colores[i].color != 'Cyan' && colores[i].color != 'Magenta' && colores[i].color != 'Negro'){
          pdf.add(
            new Table([
              [
                new Cell(new Txt(colores[i].color).end).decoration('underline').decorationStyle('dotted').linkToPage(9).bold().fillColor('#c9c9c9').border([false]).end,
              ]
            ]).widths(['100%']).end
          )
        }else{
          pdf.add(
            new Table([
              [
                new Cell(new Txt(colores[i].color).end).bold().fillColor('#c9c9c9').border([false]).end,
              ]
            ]).widths(['100%']).end
          )
        }
      for(let n=0;n<colores[i].tintas.length;n++){
        if(n === 0){
          pdf.add(
            new Table([
              [
                new Cell(new Txt('Nombre').end).bold().fillColor('#f1f1f1').border([false]).end,
                new Cell(new Txt('Serie').end).bold().fillColor('#f1f1f1').border([false]).end,
                new Cell(new Txt('Marca').end).bold().fillColor('#f1f1f1').border([false]).end,
                new Cell(new Txt('Consumo (kg)').end).bold().fillColor('#f1f1f1').border([false]).end
              ],
            ]).widths(['25%','25%','25%','25%']).end
          )
        }
        pdf.add(
          new Table([
            [
              new Cell(new Txt(colores[i].tintas[n].tinta.nombre).end).border([false]).end,
              new Cell(new Txt(colores[i].tintas[n].tinta.serie).end).border([false]).end,
              new Cell(new Txt(colores[i].tintas[n].tinta.fabricante.alias).end).border([false]).end,
              new Cell(new Txt(colores[i].tintas[n].cantidad).end).border([false]).end,
            ]
          ]).widths(['25%','25%','25%','25%']).end
        )
      }
    }
      // PAGINA 4 ******************************
      pdf.add(
        new Table([
          [
            new Cell(await new Img('../../assets/poli_cintillo.png').width(85).margin([0, 10,0,0]).build()).alignment('center').rowSpan(4).end,
            new Cell(new Txt(`FORMATO 
            ESPECIFICACIÓN DE 
            PRODUCTO`).bold().end).alignment('center').margin([0, 10,0,0]).fontSize(13).rowSpan(4).end,
            new Cell(new Txt('Código: FRP-007').end).fillColor('#dedede').fontSize(9).alignment('center').end,
          ],
          [
            new Cell(new Txt('').end).end,
            new Cell(new Txt('').end).end,
            new Cell(new Txt('N° de Revisión: 1').end).fillColor('#dedede').fontSize(9).alignment('center').end,
          ],
          [
            new Cell(new Txt('').end).end,
            new Cell(new Txt('').end).end,
            new Cell(new Txt('Fecha: 20/06/2023').end).fillColor('#dedede').fontSize(9).alignment('center').end,
          ],
          [
            new Cell(new Txt('').end).end,
            new Cell(new Txt('').end).end,
            new Cell(new Txt('Página: 2 de 2').end).fillColor('#dedede').fontSize(9).alignment('center').end,
          ],
        ]).widths(['25%','50%','25%']).pageBreak('before').end
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
            new Cell(new Txt('3.5 Barnices aprobados').end).colSpan(5).fillColor('#dedede').bold().border([false,false,false,false]).end,
            new Cell(new Txt('Color').end).fillColor('#c9c9c9').border([false]).end,
            new Cell(new Txt('Color').end).fillColor('#c9c9c9').border([false]).end,
            new Cell(new Txt('Color').end).fillColor('#c9c9c9').border([false]).end,
            new Cell(new Txt('Color').end).fillColor('#c9c9c9').border([false]).end,
          ],
        ]).widths(['20%','20%','20%','20%','20%']).end
      )

      pdf.add(
        new Ul(barnices).end
      )

      pdf.add(
        new Table([
          [
            new Cell(new Txt(' ').end).border([false]).fontSize(1).end,
          ],
          [
            new Cell(new Txt('4. Pre-impresión').bold().end).bold().color('#FFFFFF').fillColor('#000000').end,
          ],
          [
            new Cell(new Txt(' ').end).border([false]).fontSize(1).end,
          ],
          [
            new Cell(new Txt('4.1 Nombre del archivo del diseño del producto').end).fillColor('#dedede').bold().border([false,false,false,false]).end,
          ],
          [
            new Cell(new Txt(producto.pre_impresion.diseno).end).border([false]).end
          ],
          [
            new Cell(new Txt('4.2 Código del montaje').end).fillColor('#dedede').bold().border([false,false,false,false]).end,
          ],
          [
            new Cell(
              new Columns(
                [
                  new Txt('Montaje A').bold().end,
                  new Txt('Montaje B').bold().end
                ]
              ).end
            ).border([false]).end
          ],
          [
            new Cell(
              new Columns(
                [
                  new Txt(`M-${producto.identificacion.cliente.codigo}-${producto.identificacion.codigo}-${producto.identificacion.version}-A`).end,
                  new Txt('').end,
                ]
              ).end
            ).border([false]).end
          ],
          [
            new Cell(new Txt('4.3 Nombre del archivo del montaje del producto').end).fillColor('#dedede').bold().border([false,false,false,false]).end,
          ],
          [
            new Cell(
              new Columns(
                [
                  new Txt(producto.pre_impresion.nombre_montajes[0]).end,
                  new Txt(producto.pre_impresion.nombre_montajes[1]).end,
                ]
              ).end
            ).border([false]).end
          ],
          [
            new Cell(new Txt('4.4 Código de películas').end).fillColor('#dedede').bold().border([false,false,false,false]).end,
          ],
          [
            new Cell(
              new Columns(
                [
                  new Ul(peliculas).end,
                  new Ul(peliculasB).end
                ]
              ).end
            ).border([false]).end
          ],
          
          [
            new Cell(new Txt('4.5 Tamaño de sustrato a imprimir / Cantidad de ejemplares').end).fillColor('#dedede').bold().border([false,false,false,false]).end,
          ],
          [
            new Cell(
              new Columns(
                [
                  new Txt(`${producto.pre_impresion.tamano_sustrato.montajes[0].ancho} x ${producto.pre_impresion.tamano_sustrato.montajes[0].largo} cm`).end,
                  new Txt(`${producto.pre_impresion.tamano_sustrato.montajes[1].ancho} x ${producto.pre_impresion.tamano_sustrato.montajes[1].largo} cm`).end
                ]
              ).end
            ).border([false]).end
          ],
          [
            new Cell(
              new Columns(
                [
                  new Txt(`${producto.pre_impresion.tamano_sustrato.montajes[0].ejemplares} Ejemplares`).end,
                  new Txt(`${producto.pre_impresion.tamano_sustrato.montajes[1].ejemplares} Ejemplares`).end,
                ]
              ).end
            ).border([false]).end
          ],
          [
            new Cell(new Txt('4.6 Márgenes (Inf. Sup. Der. Izq.)').end).fillColor('#dedede').bold().border([false,false,false,false]).end,
          ],
          [
            new Cell(
              new Columns(
                [
                  new Txt(`${producto.pre_impresion.tamano_sustrato.margenes[0].inferior} x ${producto.pre_impresion.tamano_sustrato.margenes[0].superior} x ${producto.pre_impresion.tamano_sustrato.margenes[0].derecho} x ${producto.pre_impresion.tamano_sustrato.margenes[0].izquierdo}`).end,
                  new Txt(`${producto.pre_impresion.tamano_sustrato.margenes[1].inferior} x ${producto.pre_impresion.tamano_sustrato.margenes[1].superior} x ${producto.pre_impresion.tamano_sustrato.margenes[1].derecho} x ${producto.pre_impresion.tamano_sustrato.margenes[1].izquierdo}`).end,
                ]
              ).end
            ).border([false]).end
          ],
          [
            new Cell(new Txt('4.7 Área efectiva de impresión (cm²):').end).fillColor('#dedede').bold().border([false,false,false,false]).end,
          ],
          [
            new Cell(
              new Columns(
                [
                  new Txt(area_efectiva).end,
                  new Txt(area_efectivaB).end
                ]
              ).end
            ).border([false]).end
          ],
          [
            new Cell(new Txt('4.8 Porcentaje de desperdicio (%):').end).fillColor('#dedede').bold().border([false,false,false,false]).end,
          ],
          [
            new Cell(
              new Columns(
                [
                  new Txt((porcentajePerdida.toFixed(2)).toString()).end,
                  new Txt((porcentajePerdidaB.toFixed(2)).toString()).end
                ]
              ).end
            ).border([false]).end
          ],
          [
            new Cell(new Txt('4.9 Plancha').end).fillColor('#dedede').bold().border([false,false,false,false]).end,
          ],
          [
            new Cell(
              new Table([
                [
                  new Cell(new Txt('Tipo').bold().end).fillColor('#f1f1f1').border([false]).end,
                  new Cell(new Txt('Marca').bold().end).fillColor('#f1f1f1').border([false]).end,
                  new Cell(new Txt('Tiempo de exposición (s)').bold().end).fillColor('#f1f1f1').border([false]).end
                ],
                [
                  new Cell(new Txt(producto.pre_impresion.plancha.tipo).end).border([false]).end,
                  new Cell(new Txt(producto.pre_impresion.plancha.marca).end).border([false]).end,
                  new Cell(new Txt(producto.pre_impresion.plancha.tiempo_exposicion).end).border([false]).end
                ]
              ]).widths(['45%','25%','30%']).end
            ).border([false]).end
          ]

        ]).widths(['100%']).end
      )


      pdf.add(
        new Table([
          [
            new Cell(await new Img('../../assets/poli_cintillo.png').width(85).margin([0, 10,0,0]).build()).alignment('center').rowSpan(4).end,
            new Cell(new Txt(`FORMATO 
            ESPECIFICACIÓN DE 
            PRODUCTO`).bold().end).alignment('center').margin([0, 10,0,0]).fontSize(13).rowSpan(4).end,
            new Cell(new Txt('Código: FRP-007').end).fillColor('#dedede').fontSize(9).alignment('center').end,
          ],
          [
            new Cell(new Txt('').end).end,
            new Cell(new Txt('').end).end,
            new Cell(new Txt('N° de Revisión: 1').end).fillColor('#dedede').fontSize(9).alignment('center').end,
          ],
          [
            new Cell(new Txt('').end).end,
            new Cell(new Txt('').end).end,
            new Cell(new Txt('Fecha: 20/06/2023').end).fillColor('#dedede').fontSize(9).alignment('center').end,
          ],
          [
            new Cell(new Txt('').end).end,
            new Cell(new Txt('').end).end,
            new Cell(new Txt('Página: 2 de 2').end).fillColor('#dedede').fontSize(9).alignment('center').end,
          ],
        ]).widths(['25%','50%','25%']).pageBreak('before').end
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
            new Cell(new Txt('5. Impresión').bold().end).bold().color('#FFFFFF').fillColor('#000000').end,
          ],
          [
            new Cell(new Txt(' ').end).border([false]).fontSize(1).end,
          ],
          [
            new Cell(new Txt('5.1 Impresora(s) aprobada(s) - (tamaño de pinza de impresión (mm))').end).fillColor('#dedede').bold().border([false,false,false,false]).end,
          ],
          [
            new Cell(new Ul(impresoras).end).border([false]).end
          ],
          [
            new Cell(new Txt('5.2 Secuencia de colores en máquina').end).fillColor('#dedede').bold().border([false,false,false,false]).end,
          ],
          [
            new Cell(
              new Columns(
                [
                  new Txt('').end,
                  new Txt('').end
                ],
              ).end
            ).border([false]).end
          ],
          [
            new Cell(
              new Columns(
                [
                  new Ol(['negro','cyan','magenta','amarillo']).end,
                  new Ol(['negro','magenta','cyan','amarillo']).end
                ],
              ).end
            ).border([false]).end
          ],
          [
            new Cell(new Txt('5.3 Solución de fuentes').end).fillColor('#dedede').bold().border([false,false,false,false]).end,
          ],
          [
            new Cell(
              new Table([
                [
                  new Cell(new Txt('Fabricante').bold().end).fillColor('#f1f1f1').border([false]).end,
                  new Cell(new Txt('Descripción').bold().end).fillColor('#f1f1f1').border([false]).end,
                  new Cell(new Txt('Especificación').bold().end).fillColor('#f1f1f1').border([false]).end
                ],
                [
                  new Cell(new Txt('Sun Chemical').end).border([false]).end,
                  new Cell(new Txt('Rycoline 567').end).border([false]).end,
                  new Cell(new Ul(['pH: 4,4 - 5,5', 'Conductividad: 1.500 - 3.500 μS/cm']).end).border([false]).end
                ]
              ]).widths(['33%','33%','34%']).end
            ).border([false]).end
          ],
          [
            new Cell(new Txt('6. Post-impresión').bold().end).bold().color('#FFFFFF').fillColor('#000000').end,
          ],
          [
            new Cell(new Txt(' ').end).border([false]).fontSize(1).end,
          ],
          [
            new Cell(new Txt('6.1 Troqueladora(s) aprobada(s)').end).fillColor('#dedede').bold().border([false,false,false,false]).end,
          ],
          [
            new Cell(new Ul(troqueladoras).end).border([false]).end,
          ],
          [
            new Cell(new Txt('6.2 Canal de hendidura').end).fillColor('#dedede').bold().border([false,false,false,false]).end,
          ],
          [
            new Cell(new Txt(`${producto.post_impresion.henidura.alto} x ${producto.post_impresion.henidura.ancho} mm`).end).border([false]).end,
          ],
          [
            new Cell(new Txt('6.3 Guillotina(s) aprobada(s)').end).fillColor('#dedede').bold().border([false,false,false,false]).end,
          ],
          [
            new Cell(new Ul(guillotinas).end).border([false]).end,
          ],
          [
            new Cell(new Txt('6.4 Pegadora(s) aprobada(s)').end).fillColor('#dedede').bold().border([false,false,false,false]).end,
          ],
          [
            new Cell(new Ul(pegadoras).end).border([false]).end,
          ],
          [
            new Cell(new Txt('6.5 Pegamento(s) aprobado(s)').end).fillColor('#dedede').bold().border([false,false,false,false]).end,
          ],
          [
            new Cell(new Ul(['Pega Alta Viscocidad 104 HV 15P', 'Pega Alta Viscocidad 104 HV 15P']).end).border([false]).end,
          ]
        ]).widths(['100%']).end
      )

      pdf.create().download()
    }
    generarEspecificacion()
  }
}
