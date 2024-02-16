import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Fabricante } from 'src/app/compras/models/modelos-compra';
import { FabricantesService } from 'src/app/services/fabricantes.service';
import { MaterialesService } from 'src/app/services/materiales.service';
import { ProveedoresService } from 'src/app/services/proveedores.service';
import { RecepcionService } from 'src/app/services/recepcion.service';
import { Cell, Img, PdfMakeWrapper, Table, Txt } from 'pdfmake-wrapper';
import * as pdfFonts from "pdfmake/build/vfs_fonts";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nueva-recepcion',
  templateUrl: './nueva-recepcion.component.html',
  styleUrls: ['./nueva-recepcion.component.scss']
})
export class NuevaRecepcionComponent {

  constructor(public proveedores:ProveedoresService,
              public fabricantes:FabricantesService,
              public materiales :MaterialesService,
              public api  :RecepcionService){}

  @Input() nueva!:boolean;
  @Output() onCloseModal = new EventEmitter();
  

  public documento!:string;
  public condicion:boolean = false;
  public OC!:string;
  public recepcion!:string;
  public transportista!:string
  public proveedor!:string
  public fabricante:any
  public material:any
  public fabricacion:any
  public es_sustrato = false;

  public documentoLleno:boolean = false;
  public OCLLeno:boolean = false;
  public recepcionLleno:boolean = false;
  public transportistaLleno:boolean = false;
  public ParaAlmacenar:any = []
  public listado:boolean = false;
  public netoEspecifico:any = {}
  public totalizacion:any = []
  public GrupoDeMateriales:any = []
  public choosen:any;
  public cantidades:number[] = []
  public fabricaciones:string[] = []
  public condiciones:any;

  material_selected!:any;
  cantidad!:number;
  presentacion!:string;
  neto!:number;
  lote!:string;
  ancho!:number;
  largo!:number;
  unidad:string = 'Und';

  currentDate = new Date();
  year = this.currentDate.getFullYear();
  month = String(this.currentDate.getMonth() + 1).padStart(2, '0');
  day = String(this.currentDate.getDate()).padStart(2, '0');
  Hoy = `${this.year}-${this.month}-${this.day}`;

  
  guardar = async () => {
    const { GrupoDeMateriales, cantidades, documento, OC, recepcion, transportista, proveedor, fabricacion, ParaAlmacenar } = this;
  
    const proveedorData = this.proveedores.proveedores[proveedor]._id;

    const materiales = GrupoDeMateriales.map((materiales:any)=>materiales.materiales)
    const condicion = GrupoDeMateriales.map((materiales:any)=>materiales.condicion)

  
    const data = {
      OC,
      condicion,
      recepcion,
      transportista,
      proveedor: proveedorData,
      documento,
      fabricacion:this.fabricaciones,
      materiales,
      cantidad:cantidades
    };

    this.OC = ''
    this.recepcion = '',
    this.transportista = '',
    this.proveedor = ''
    this.documento = '',
    this.fabricacion = ''
    this.GrupoDeMateriales = []
    this.cantidades = []
    this.fabricaciones = []


    await this.api.GuardarRecepcion(data)
    this.onCloseModal.emit();

    setTimeout(() => {
      Swal.fire({
        title: this.api.mensaje.mensaje,
        icon: this.api.mensaje.icon,
        timer: 5000,
        timerProgressBar: true,
        toast: true,
        position: 'top-end',
        showConfirmButton: false
      });
    }, 1000);
  }

  cerrar(){
    this.onCloseModal.emit();
  }

  MostrarListado(n:number){
    this.nueva = false;
    this.listado = true;
    this.choosen = n
  }

  EliminarListado(i:number){
    this.GrupoDeMateriales.splice(i, 1)
    this.cantidades.splice(i, 1)
    this.fabricaciones.splice(i, 1)
  }

  CerrarListado(){
    this.nueva = true;
    this.listado = false;
  }

  buscarFabricantes = async(e:any)=>{
    let fabricantes = this.proveedores.proveedores[e.value].fabricantes;
    fabricantes = fabricantes.map((fabricantes:any) => fabricantes._id)
    this.fabricante = this.fabricantes.buscarFabricantesPorId(fabricantes)
  }

  buscarmMateriales = async(e:any)=>{
    let grupos = this.fabricante[e.value].grupo.map((fabricante:any) => fabricante._id)
    this.material = this.materiales.filtrarPorGrupos(grupos)
  }

  //crea una funcion llamada crearLatas() que al ser ejecutada tome el valos de this.cantidad y agregue a un arreglo latas de this.neto sin sobrepasar a this.cantidad sino agregando una lata con un resto de ser necesario
  crearLatas() {
    this.ParaAlmacenar = []
    this.netoEspecifico = []
    this.totalizacion = []
    let resto = this.cantidad % this.neto;
    const cantidadLatas = Math.floor(this.cantidad / this.neto);
    if (resto > 0) {
      this.ParaAlmacenar.push({
        presentacion: this.presentacion, 
        neto: resto.toFixed(2), 
        lote: this.lote,
        ancho: this.ancho,
        largo: this.largo,
        unidad: this.unidad,
        material: this.material_selected,
        codigo:1
      });
    }
    for (let i = 0; i < cantidadLatas; i++) {
      const codigo = (resto > 0) ? i + 2 : i+1;
      this.ParaAlmacenar.push({
        presentacion: this.presentacion,
        neto: this.neto.toFixed(2),
        lote: this.lote,
        ancho: this.ancho,
        largo: this.largo,
        unidad: this.unidad,
        material: this.material_selected,
        fabricacion:this.fabricacion,
        codigo: codigo
      });
    }
    
    this.ParaAlmacenar.forEach((almacenado:any) => {
      if(this.netoEspecifico[`${almacenado.neto}`]){
        this.netoEspecifico[`${almacenado.neto}`]++;
      }else{
        this.netoEspecifico[`${almacenado.neto}`] = 1
      }
    });

    for (const [neto, cantidad] of Object.entries(this.netoEspecifico)) {
      this.totalizacion.push(`${cantidad} ${this.presentacion}(s) de ${neto}${this.unidad}`)
    }

    const materiales = this.ParaAlmacenar.map((material:any) => {
      return {
        ...material,
        material: material.material._id
      };
    });
    this.GrupoDeMateriales.push({materiales,
                                  nombre:this.ParaAlmacenar[0].material.nombre, 
                                  fabricante:this.ParaAlmacenar[0].material.fabricante.alias,
                                  resumen:this.totalizacion,
                                  check:false,
                                  condicion:{
                                    Certificado_de_calidad:false,
                                    Identificacion_del_lote:false,
                                    Cajas_en_buen_estado:false,
                                    Cajas_limpias:false,
                                    Envases_cerrado_hermeticamente:false
                                  }
                                });
    this.cantidades.push(this.cantidad)
    this.fabricaciones.push(this.fabricacion)
    this.lote = ''
    this.ancho = 0
    this.largo = 0
    this.presentacion = ''
    this.fabricacion = ''
    this.neto = 0
    this.unidad = ''
  }

  abrirCondicion(i:number){
    this.choosen = i
    this.condicion = true;
    this.nueva = false;
  }
  
  cerrarCondicion(){
    this.condicion = false;
    this.nueva = true
  }

  MaterialSeleccionado(e:any){
    this.material_selected = this.material[e.value];
    if(this.material_selected)
    console.log(this.material_selected)
  }

  todosLosChecksSonTrue(): boolean {
    return this.GrupoDeMateriales.map((item:any) => item.check).every((check:any) => check === true);
  }

  

}
