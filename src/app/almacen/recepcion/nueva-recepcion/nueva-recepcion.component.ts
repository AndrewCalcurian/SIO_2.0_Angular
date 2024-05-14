import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Fabricante } from 'src/app/compras/models/modelos-compra';
import { FabricantesService } from 'src/app/services/fabricantes.service';
import { MaterialesService } from 'src/app/services/materiales.service';
import { ProveedoresService } from 'src/app/services/proveedores.service';
import { RecepcionService } from 'src/app/services/recepcion.service';
import { Cell, Img, PdfMakeWrapper, Table, Txt } from 'pdfmake-wrapper';
import * as pdfFonts from "pdfmake/build/vfs_fonts";
import Swal from 'sweetalert2';
import { OpoligraficaService } from 'src/app/services/opoligrafica.service';

@Component({
  selector: 'app-nueva-recepcion',
  templateUrl: './nueva-recepcion.component.html',
  styleUrls: ['./nueva-recepcion.component.scss']
})
export class NuevaRecepcionComponent {

  constructor(public proveedores:ProveedoresService,
              public fabricantes:FabricantesService,
              public materiales :MaterialesService,
              public OC_Poligrafica:OpoligraficaService,
              public api  :RecepcionService){}

  @Input() nueva!:boolean;
  @Output() onCloseModal = new EventEmitter();


  public Poligrafica_OC;
  public material_selected_in_OC;
  public materiales_recibidos;
  public control = '';
  public proveedor_ = ''
  public OC__
  public inputValue: string = '0,00';
  public textoSinFormato = '';
  public cantidad_ = 0;
  public neto_ = 0;
  public presentacion_
  public documento_
  public f_recepcion
  public transportista_
  public lote_
  public done = false;
  today = new Date().toISOString().split('T')[0]; // Obtiene la fecha actual en formato YYYY-MM-DD

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


  seleccionarOC(e){
    this.Poligrafica_OC = this.OC_Poligrafica.filtrarPorProveedor(this.proveedor_)[e.value]
  }


  addMaterial(){
    let leyenda = ''
    let sobrante = ''
    let resultado = this.calcularLatasYSobrante(this.cantidad_, this.neto_)
    if(resultado.sobrante > 0){
      sobrante = `1 ${this.presentacion_} de ${resultado.sobrante.toFixed(2)} ${this.Poligrafica_OC.pedido[this.material_selected_in_OC].unidad}`
      leyenda = `${resultado.latas.length - 1} ${this.presentacion_}(s) de ${this.neto_} ${this.Poligrafica_OC.pedido[this.material_selected_in_OC].unidad}`
    }else{
      leyenda = `${resultado.latas.length} ${this.presentacion_}(s) de ${this.neto_} ${this.Poligrafica_OC.pedido[this.material_selected_in_OC].unidad}`
    }

    // Update the 'info' span element with the 'leyenda' text 
    const infoElement = document.getElementById('info');
    if (infoElement) {
      infoElement.textContent = leyenda;
    } else {
      console.error('Element with ID "info" not found.');
    }

    const sobrante__ = document.getElementById('sobrante');
    if (sobrante__) {
      sobrante__.textContent = sobrante;
    } else {
      console.error('Element with ID "sobrante" not found.');
    }
    this.done = true;
  }

  generarNumeroDeControl(){
    let nuevoValor = this.control.replace(/[^0-9]/g, ''); // Elimina caracteres no numéricos
      if (nuevoValor.length <= 2) {
        // Si hay 2 o menos dígitos, no hace nada
        return;
      } else if (nuevoValor.length >= 1 && nuevoValor.length <= 10) {
        // Si hay más de 2 dígitos, agrega el guion después de los primeros dos
        nuevoValor = `${nuevoValor.slice(0, 2)}-${nuevoValor.slice(2)}`;
      } else {
        // Si hay más de 10 dígitos, limita el valor a los primeros 10 y agrega el guion
        nuevoValor = `${nuevoValor.slice(0, 2)}-${nuevoValor.slice(2, 10)}`;
      }
      this.control = nuevoValor;
  }


  keyDownEvent(e: KeyboardEvent): boolean {
    // Permitir la tecla para borrar
    if (e.key === 'Backspace') return true;
    // Permitir flecha izquierda
    if (e.key === 'ArrowLeft') return true;
    // Permitir flecha derecha
    if (e.key === 'ArrowRight') return true;
    // Bloquear tecla de espacio
    if (e.key === ' ') return false;
    // Bloquear tecla si no es un número o una coma
    if (isNaN(Number(e.key))) return false;
    return true;
}

keyUpEvent(numeros: HTMLInputElement): void {
    numeros.value = numeros.value
        // Borrar todos los espacios en blanco
        .replace(/\s/g, '');
    // Guardar el texto sin formato en la variable textoSinFormato
    this.textoSinFormato = numeros.value;
    numeros.value = numeros.value
        // Agregar un espacio cada dos números
        .replace(/\D/g, '')
        .replace(/\B(?=(\d{3})+(?!\d))/g, '.')
        // Borrar espacio al final
        .trim();
}
  

onInputChange(event: any) {
  let newValue = event.target.value.replace(/\D/g, ''); // Eliminar caracteres no numéricos
  if (newValue.charAt(0) === '0' && newValue.charAt(1) !== '.') {
    newValue = newValue.slice(1);
  }
  if (newValue.length > 2) {
    let format = newValue.slice('0', -2)
    format = format.replace(/\D/g, '')
    format = format.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    console.log(format)
    newValue = format + ',' + newValue.slice(-2); // Agregar el punto decimal
  } else if (newValue.length === 2) {
    newValue = '0,' + newValue; // Agregar el punto decimal al inicio si solo hay 2 dígitos
  } else {
    newValue = '0,0' + newValue; // Agregar ceros adicionales si solo hay 1 dígito
  }
  this.inputValue = newValue;
}

calcularLatasYSobrante(cantidadTotal: number, pesoNetoPorLata: number){
  // Calcular la cantidad de latas y el sobrante
  const cantidadLatas = Math.floor(cantidadTotal / pesoNetoPorLata);
  const sobrante = cantidadTotal % pesoNetoPorLata;

  // Inicializar el arreglo de latas
  const datosLatas:any = [];

  // Agregar la lata con sobrante (si existe)
  if (sobrante > 0) {
    datosLatas.push({
      material:this.Poligrafica_OC.pedido[this.material_selected_in_OC].material._id,
      presentacion:this.presentacion_,
      codigo: 1,
      cantidad: sobrante,
      unidad:this.Poligrafica_OC.pedido[this.material_selected_in_OC].unidad
    });
  }

  // Agregar las latas restantes
  for (let i = 1; i <= cantidadLatas; i++) {
    datosLatas.push({
      material:this.Poligrafica_OC.pedido[this.material_selected_in_OC].material._id,
      presentacion:this.presentacion_,
      codigo: i + datosLatas.length, // Ajustar el número para la lata con sobrante
      cantidad: pesoNetoPorLata,
      unidad:this.Poligrafica_OC.pedido[this.material_selected_in_OC].unidad
    });
  }

  // Retornar el resultado
  return {
    sobrante,
    latas: datosLatas,
  };
}

calcularRecepcion(){

}

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
