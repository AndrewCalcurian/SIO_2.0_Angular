import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Producto } from 'src/app/compras/models/modelos-compra';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ClientesService } from 'src/app/services/clientes.service';
import { MaterialesService } from 'src/app/services/materiales.service';
import { MaquinasService } from 'src/app/services/maquinas.service';
import Swal from 'sweetalert2';
import { SubirArchivosService } from 'src/app/services/subir-archivos.service';
import { CategoriasService } from 'src/app/services/categorias.service';

@Component({
  selector: 'app-new-producto',
  templateUrl: './new-producto.component.html',
  styleUrls: ['./new-producto.component.scss']
})
export class NewProductoComponent {


  constructor(public clientes:ClientesService,
              public materiales:MaterialesService,
              public maquinas:MaquinasService,
              public categoria:CategoriasService,
              public uploadImage:SubirArchivosService){
                this.crearModelo()
  }

  secuencia = ['Amarillo', 'Azul', 'Rojo', 'Negro'];

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.secuencia, event.previousIndex, event.currentIndex);
  }


  @Input() nuevo:any;
  @Input() producto!:Producto
  @Output() onCloseModal = new EventEmitter()

  sustrato_selected = '';
  maquina_selected = '';
  troqueladora_selected = '';
  guillotina_selected = '';
  pegadora_selected = '';
  solucion_selected = '';
  caja_selected = ''; 
  tinta_selected = {
    tinta:'',
    cantidad:0
  }
  barniz_selected = {
    barniz:'',
    cantidad:0
  }
  pegamento_selected = {
    pega:'',
    cantidad:0
  }

  seleccion_tinta = false;

  sustratos_nombres:string[] = []
  tinta_nombres:string[]= []
  barniz_nombres:string[] = []
  impresoras_nombre:string[] = []
  fuentes_nombres:string[] = []
  troqueladora_nombres:string[] = []
  guillotina_nombres:string[] = []
  pegadora_nombres:string[] = []
  pega_nombres:string[] = []
  cajas_nombres:string[] = []
  caja_nombre = '';


  style: any = {};
  longitud = 0
  altura = 0
  ejemplares = 0
  margenTop = 0
  margenRight = 0
  margenBottom = 0
  margenLeft = 0

  B_style: any = {};
  B_longitud = 0
  B_altura = 0
  B_ejemplares = 0
  B_margenTop = 0
  B_margenRight = 0
  B_margenBottom = 0
  B_margenLeft = 0

  Producto_imag = 'no-image';
  Embalaje_Aereo = 'no-image';
  Embalaje_3d = 'no-image';
  paletizado = 'no-image';

  cards = [
    {title: 'Identificación del producto', content: 'Contenido 1'},
    {title: 'Dimensiones del producto', content: 'Contenido 1'},
    {title: 'Materia prima', content: 'Contenido 1'},
    {title: 'Pre-impresión', content: 'Contenido 1'},
    {title: 'Impresión', content: 'Contenido 1'},
    {title: 'Post-impresión', content: 'Contenido 1'},
    {title: 'Post-impresión', content: 'Contenido 1'},
    {title: 'Clasificación de defectos', content: 'Contenido 1'},
    // Agrega más tarjetas según sea necesario
  ];
  currentIndex = 0;

  detalle:boolean = false;

  detalles = {
    modal_sustrato:false,
    modal_tintas:false,
    modal_barniz:false,
    modal_impresora:false,
    modal_fuente:false,
    modal_troqueladora:false,
    modal_guillotina:false,
    modal_pegadora:false,
    modal_pega:false,
    modal_caja:false
  }

  cerrarDetalles(){
    this.detalle = false;
    this.detalles = {
      modal_sustrato:false,
      modal_tintas:false,
      modal_barniz:false,
      modal_impresora:false,
      modal_fuente:false,
      modal_troqueladora:false,
      modal_guillotina:false,
      modal_pegadora:false,
      modal_pega:false,
      modal_caja:false
    }
  }

  openImage(imageName,imageAlt){
    Swal.fire({
      showConfirmButton:false,
      imageUrl: `http://192.168.0.22/api/imagen/producto/${imageName}`,
      imageAlt: imageAlt
    });
  }

  
  subirImagen(e,n){
    let image = (e.target).files[0]
    let tipo = ''
    switch(n){
      case 0:
        tipo = 'PRODUCTO'
      break;
      case 1:
        tipo = 'EMBALAJE_AEREO'
      break;
      case 2:
        tipo = 'EMBALAJE_3D'
      break;
      case 3:
        tipo = 'PELETIZADO'
      break;
    }

    this.uploadImage.actualizarFoto(image, 'producto', tipo)
      .then(img =>{

          switch(n){
            case 0:
              this.Producto_imag = img;
            break;
            case 1:
              this.Embalaje_Aereo = img;
            break;
            case 2:
              this.Embalaje_3d = img;
            break;
            case 3:
              this.paletizado = img;
            break;
          }
      })
  }  

  showDetail(tipo){
    this.detalle = true;
    if(tipo in this.detalles){
      this.detalles[tipo] = true
      console.log(this.detalles)
    }
  }

  cerrar(){
    this.onCloseModal.emit()
  }

  crearModelo(){
    this.style = {
      'width': `200px`,
      'height': `130px`,
      'background': 'rgb(161, 242, 216);',
      'display': 'grid',
      'grid-template-columns': `repeat(${Math.sqrt(this.ejemplares)}, 1fr)`,
      'grid-template-rows': `repeat(${Math.sqrt(this.ejemplares)}, 1fr)`,
      'margin': `${this.margenTop * 2}px ${this.margenRight * 2}px ${this.margenBottom * 2}px ${this.margenLeft * 2}px`,
    }

    this.B_style = {
      'width': `200px`,
      'height': `130px`,
      'background': 'rgb(161, 242, 216);',
      'display': 'grid',
      'grid-template-columns': `repeat(${Math.sqrt(this.B_ejemplares)}, 1fr)`,
      'grid-template-rows': `repeat(${Math.sqrt(this.B_ejemplares)}, 1fr)`,
      'margin': `${this.B_margenTop * 2}px ${this.B_margenRight * 2}px ${this.B_margenBottom * 2}px ${this.B_margenLeft * 2}px`,
    }
  }

  previous() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }

  next() {
    if (this.currentIndex < this.cards.length - 1) {
      this.currentIndex++;
    }
  }

  notificar(){
    if(!this.seleccion_tinta){
      Swal.fire({
        icon:'info',
        title:'Cuidado con el orden',
        text:'El registro de la tintas se debe realizar en el orden en que fueron coodificadas las peliculas',
        confirmButtonText:'DE ACUERDO',
        confirmButtonColor:'#48c78e'
      })
      this.seleccion_tinta = true;
    }
  }

  add_sustrato(){
    let splited = this.sustrato_selected.split('&')

    // Verificar si el sustrato seleccionado no existe en el array antes de agregarlo
    if (!this.producto.sustrato.includes(splited[0])) {
        this.producto.sustrato.push(splited[0]);
        this.sustratos_nombres.push(splited[1])
    } else {
        // Si el sustrato ya existe, puedes mostrar un mensaje de error o simplemente no hacer nada
        console.log('El sustrato ya está en la lista.');
    }

    // Reiniciar la variable sustrato_selected
    this.sustrato_selected = '';
  }

  maquina_impresora(){
    let splited = this.maquina_selected.split('&')
    if (!this.producto.maquinas.includes(splited[0])) {
      this.producto.maquinas.push(splited[0]);
      this.impresoras_nombre.push(splited[1])
    }

    this.maquina_selected = ''
  }

  maquina_troqueladora(){
    let splited = this.troqueladora_selected.split('&')
    if (!this.producto.troqueladora.includes(splited[0])) {
      this.producto.troqueladora.push(splited[0]);
      this.troqueladora_nombres.push(splited[1])
    }

    this.troqueladora_selected = ''
  }

  maquina_guillotina(){
    let splited = this.guillotina_selected.split('&')
    if (!this.producto.guillotina.includes(splited[0])) {
      this.producto.guillotina.push(splited[0]);
      this.guillotina_nombres.push(splited[1])
    }

    this.guillotina_selected = ''
  }

  maquina_pegadora(){
    let splited = this.pegadora_selected.split('&')
    if (!this.producto.pegadora.includes(splited[0])) {
      this.producto.pegadora.push(splited[0]);
      this.pegadora_nombres.push(splited[1])
    }

    this.pegadora_selected = ''
  }

  Solucion_fuente(){
    let splited = this.solucion_selected.split('&')
    if (!this.producto.fuente.includes(splited[0])) {
      this.producto.fuente.push(splited[0]);
      this.fuentes_nombres.push(splited[1])
    }

    this.solucion_selected = ''
  }

  add_tinta(){
    let splited = this.tinta_selected.tinta.split('&')
    // Verificar si la tinta seleccionada no existe en el array antes de agregarla
    const tintaExistente = this.producto.tintas.find(tinta => tinta.tinta === splited[0]);

    if (!tintaExistente) {
        this.producto.tintas.push({ tinta: splited[0], cantidad: this.tinta_selected.cantidad });
        this.tinta_nombres.push(splited[1])
    } else {
        // Si la tinta ya existe, puedes mostrar un mensaje de error o simplemente no hacer nada
        console.log('La tinta ya está en la lista.');
  }

  // Reiniciar las propiedades de la variable tinta_selected
  this.tinta_selected.cantidad = 0;
  this.tinta_selected.tinta = '';
  }

  add_barniz(){
    let splited = this.barniz_selected.barniz.split('&');
    // Verificar si la tinta seleccionada no existe en el array antes de agregarla
    const barnizExistente = this.producto.barnices.find(barniz => barniz.barniz === splited[0]);

    if (!barnizExistente) {
        this.producto.barnices.push({ barniz: splited[0], cantidad: this.barniz_selected.cantidad });
        this.barniz_nombres.push(splited[1])
    } else {
        // Si la tinta ya existe, puedes mostrar un mensaje de error o simplemente no hacer nada
        console.log('El barniz ya está en la lista.');
  }
    // Reiniciar las propiedades de la variable tinta_selected
    this.barniz_selected.cantidad = 0;
    this.barniz_selected.barniz = '';
  }

  add_pegamento(){

    let splited = this.pegamento_selected.pega.split('&')
    // Verificar si la tinta seleccionada no existe en el array antes de agregarla
    const pegamentoExistente = this.producto.pegamento.find(pegamento => pegamento.pega === splited[0]);

    if (!pegamentoExistente) {
        this.producto.pegamento.push({ pega: splited[0], cantidad: this.pegamento_selected.cantidad });
        this.pega_nombres.push(splited[1])
    } else {
        // Si la tinta ya existe, puedes mostrar un mensaje de error o simplemente no hacer nada
        console.log('El pegamento ya está en la lista.');
  }
    // Reiniciar las propiedades de la variable tinta_selected
    this.pegamento_selected.cantidad = 0;
    this.pegamento_selected.pega = '';
  }

  add_caja(){
    let splited = this.caja_selected.split('&')
    this.producto.caja[0] = splited[0];
    this.caja_nombre = splited[1]
  }

  Impresion_(maquina, fase_) {
    let incluye = maquina.fases.some(fase => fase.nombre === fase_);
    return incluye;
  }

}
